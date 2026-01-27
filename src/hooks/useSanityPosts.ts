import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/sanity';
import { BlogPost } from '@/types/blog';

function transformSanityPost(post: any): BlogPost {
  const categoryTitle = post.categories && post.categories.length > 0
    ? post.categories[0]?.title || post.categories[0]
    : post.category?.title || post.category || 'Geral';

  return {
    id: post._id || post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.body || post.content,
    slug: post.slug,
    author: post.author?.name || post.author || 'Equipe Atos Hub',
    publishedAt: post.publishedAt || new Date().toISOString(),
    readTime: post.readTime || '5 min',
    category: categoryTitle,
    imageUrl: post.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  };
}

export function useSanityPosts() {
  return useQuery({
    queryKey: ['sanity-posts'],
    queryFn: async () => {
      try {
        const posts = await getAllPosts();
        if (!posts || posts.length === 0) return [];
        return posts.map(transformSanityPost);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useSanityPost(slug: string) {
  return useQuery({
    queryKey: ['sanity-post', slug],
    queryFn: async () => {
      try {
        const post = await getPostBySlug(slug);
        if (!post) return null;
        return transformSanityPost(post);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        return null;
      }
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRelatedPosts(currentPost: BlogPost, limit: number = 3) {
  return useQuery({
    queryKey: ['related-posts', currentPost.id, currentPost.category],
    queryFn: async () => {
      try {
        const raw = await getRelatedPosts(currentPost.category, currentPost.id, limit);
        return (raw || []).map(transformSanityPost);
      } catch (error) {
        console.error('Erro ao buscar posts relacionados:', error);
        return [];
      }
    },
    enabled: !!currentPost?.id,
    staleTime: 1000 * 60 * 5,
  });
}
