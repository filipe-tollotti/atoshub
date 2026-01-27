import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ===============================
// Configuração do cliente Sanity
// ===============================
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '8sg3qh88';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false, // false = sempre dados atualizados (true em produção se quiser cache)
});

// ===============================
// Builder para imagens
// ===============================
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// ===============================
// GROQ QUERIES (SEM DRAFTS)
// ===============================

// 🔹 Buscar TODOS os posts publicados
export const allPostsQuery = `
*[_type == "post" && !(_id in path("drafts.**"))]
| order(publishedAt desc) {
  _id,
  title,
  excerpt,
  "slug": slug.current,
  author->{ name },
  publishedAt,
  readTime,
  categories[]->{ title },
  "imageUrl": mainImage.asset->url,
  body
}
`;

// 🔹 Buscar UM post pelo slug
export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  title,
  excerpt,
  "slug": slug.current,
  author->{ name },
  publishedAt,
  readTime,
  categories[]->{ title },
  "imageUrl": mainImage.asset->url,
  body
}
`;

// 🔹 Buscar posts relacionados (por categoria)
export const relatedPostsQuery = `
*[
  _type == "post"
  && !(_id in path("drafts.**"))
  && count((categories[]->{title})[title == $categoryTitle]) > 0
  && _id != $currentId
]
| order(publishedAt desc)[0...$limit] {
  _id,
  title,
  excerpt,
  "slug": slug.current,
  author->{ name },
  publishedAt,
  readTime,
  categories[]->{ title },
  "imageUrl": mainImage.asset->url
}
`;

// ===============================
// FUNÇÕES DE ACESSO
// ===============================

// 🔹 Buscar todos os posts
export async function getAllPosts() {
  try {
    if (!projectId) return [];
    const posts = await sanityClient.fetch(allPostsQuery);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error('[Sanity getAllPosts]', error);
    return [];
  }
}

// 🔹 Buscar post por slug
export async function getPostBySlug(slug: string) {
  try {
    if (!projectId || !slug) return null;
    const post = await sanityClient.fetch(postBySlugQuery, { slug });
    return post || null;
  } catch (error) {
    console.error('[Sanity getPostBySlug]', error);
    return null;
  }
}

// 🔹 Buscar posts relacionados
export async function getRelatedPosts(
  categoryTitle: string,
  currentId: string,
  limit: number = 3
) {
  try {
    if (!projectId || !categoryTitle) return [];
    const posts = await sanityClient.fetch(relatedPostsQuery, {
      categoryTitle,
      currentId,
      limit,
    });
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error('[Sanity getRelatedPosts]', error);
    return [];
  }
}
