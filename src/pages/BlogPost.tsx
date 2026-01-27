import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BlogPost as BlogPostType } from "@/types/blog";
import { useSanityPost, useRelatedPosts } from "@/hooks/useSanityPosts";
import { PortableText } from "@/components/PortableText";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

interface RelatedPostCardProps {
  post: BlogPostType;
}

const RelatedPostCard = ({ post }: RelatedPostCardProps) => {
  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
            {post.category}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h4>
        </div>
      </motion.article>
    </Link>
  );
};

interface ShareButtonProps {
  platform: "facebook" | "twitter" | "linkedin" | "copy";
  url: string;
  title: string;
}

const ShareButton = ({ platform, url, title }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      copy: url,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const icons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    copy: copied ? Check : LinkIcon,
  };

  const Icon = icons[platform];

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleShare}
      className="border-border hover:bg-secondary hover:text-primary transition-colors"
      title={platform === "copy" ? (copied ? "Copiado!" : "Copiar link") : `Compartilhar no ${platform}`}
    >
      <Icon className="w-4 h-4" />
    </Button>
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Usa o hook do Sanity para buscar o post
  const { data: post, isLoading } = useSanityPost(slug || '');
  
  // Busca posts relacionados
  const { data: relatedPosts = [] } = useRelatedPosts(post || { id: '', category: '' } as BlogPostType, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground">Carregando artigo...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-8">O artigo que você está procurando não existe.</p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para o Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-hero-gradient pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Breadcrumb */}
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-white/70 hover:text-white transition-colors">
                        Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-white/50" />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/blog" className="text-white/70 hover:text-white transition-colors">
                        Blog
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-white/50" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white truncate max-w-[200px]">
                      {post.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Category */}
              <span className="inline-block px-3 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-full mb-4">
                {post.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de leitura
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="lg:col-span-8"
              >
                {/* Featured Image */}
                {post.imageUrl && (
                  <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Article Content */}
                {post.content && Array.isArray(post.content) ? (
                  <PortableText content={post.content} />
                ) : (
                  <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-primary">
                    {typeof post.content === 'string' && post.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('## ')) {
                        return <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                      }
                      if (paragraph.startsWith('### ')) {
                        return <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                      }
                      if (paragraph.trim()) {
                        return <p key={index} className="text-muted-foreground mb-4 leading-relaxed">{paragraph}</p>;
                      }
                      return null;
                    })}
                  </div>
                )}

                {/* Share Section */}
                <div className="border-t border-border mt-12 pt-8">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <Share2 className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground font-medium">Compartilhar:</span>
                      <div className="flex gap-2">
                        <ShareButton platform="facebook" url={currentUrl} title={post.title} />
                        <ShareButton platform="twitter" url={currentUrl} title={post.title} />
                        <ShareButton platform="linkedin" url={currentUrl} title={post.title} />
                        <ShareButton platform="copy" url={currentUrl} title={post.title} />
                      </div>
                    </div>

                    <Link to="/blog">
                      <Button variant="outline" className="border-border hover:bg-secondary">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para o Blog
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="sticky top-24"
                >
                  {/* Author Card */}
                  <div className="bg-card border border-border/50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Sobre o Autor</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{post.author}</p>
                        <p className="text-sm text-muted-foreground">Especialistas em soluções financeiras</p>
                      </div>
                    </div>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-card border border-border/50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Artigos Relacionados</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Quer saber mais sobre nossas soluções?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Entre em contato com nossos especialistas e descubra como podemos ajudar você a alcançar seus objetivos financeiros.
              </p>
              <Link to="/#contato">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Falar com Especialista
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
