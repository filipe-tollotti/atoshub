import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, User, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPost as BlogPostType } from "@/types/blog";
import { useSanityPosts } from "@/hooks/useSanityPosts";

const POSTS_PER_PAGE = 6;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const BlogCard = ({ post }: { post: BlogPostType }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
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
          <div className="flex items-center justify-between mt-auto">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="text-primary group-hover:text-primary/80 flex items-center text-sm font-medium">
              Ler
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Categorias do filtro (as 3 definidas no Sanity Studio)
  const filterCategories = ["Crédito Responsável", "Planejamento Financeiro", "Mercado Imobiliário"];
  const categories = ["Todos", ...filterCategories];

  const { data: posts = [], isLoading } = useSanityPosts();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Blog <span className="text-gradient-gold">Atos Hub</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Insights, guias e análises sobre o mercado financeiro para ajudar você a tomar as melhores decisões.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b border-border bg-card sticky top-16 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                    className={
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "border-border hover:bg-secondary"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="section-padding">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedPosts.length > 0 ? (
              <>
                <motion.div
                  layout
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-2 mt-12"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="border-border"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "border-border hover:bg-secondary"
                        }
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="border-border"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-lg text-muted-foreground mb-4">
                  Nenhum artigo encontrado para sua busca.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Todos");
                  }}
                >
                  Limpar filtros
                </Button>
              </motion.div>
            )}

            {/* Results count */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Mostrando {paginatedPosts.length} de {filteredPosts.length} artigos
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
