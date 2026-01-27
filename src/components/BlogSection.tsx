import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/blog";
import { useSanityPosts } from "@/hooks/useSanityPosts";

// Re-export BlogPost type for backwards compatibility
export type { BlogPost };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`}>
        <motion.article
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r" />
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                {post.category}
              </span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="text-primary group-hover:text-primary/80 flex items-center text-sm font-medium">
                  Ler artigo
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <motion.article
        variants={itemVariants}
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative h-48 shrink-0 overflow-hidden">
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
        <div className="p-5 flex flex-col flex-1 min-h-[160px]">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <span className="text-primary group-hover:text-primary/80 flex items-center text-sm font-medium mt-auto">
            Ler artigo
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
};

interface BlogSectionProps {
  posts?: BlogPost[];
}

export const BlogSection = ({ posts }: BlogSectionProps) => {
  // Usa o hook do Sanity se não houver posts passados como prop
  const { data: sanityPosts = [], isLoading } = useSanityPosts();
  const displayPosts = posts || sanityPosts.slice(0, 4);
  const [featuredPost, ...otherPosts] = displayPosts;

  if (isLoading && !posts) {
    return (
      <section id="blog" className="section-padding bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Carregando posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent-foreground bg-accent/20 rounded-full">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Insights e{" "}
            <span className="text-gradient-gold">Conhecimento</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artigos, guias e análises para ajudar você a tomar as melhores
            decisões financeiras.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {/* Featured Post */}
          {featuredPost && <BlogCard post={featuredPost} featured />}

          {/* Other Posts Grid */}
          {otherPosts.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA to see all posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/blog">
            <Button
              size="lg"
              variant="outline"
              className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Ver todos os artigos
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
