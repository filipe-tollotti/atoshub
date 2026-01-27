export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string | any[]; // Suporta string ou array (Portable Text)
  slug: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  imageUrl: string;
}
