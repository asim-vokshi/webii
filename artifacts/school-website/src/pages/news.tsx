import { useSeo } from "@/hooks/useSeo";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, ArrowRight, Filter, Calendar, BookOpen } from "lucide-react";
import { getNewsList, type NewsItem } from "@/content/site-content";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";

export default function News() {
  useSeo({
    title: "Lajme dhe Njoftime",
    description: "Lajmet dhe njoftimet më të fundit nga Shkolla Asim Vokshi — aktivitete, arritje studentore dhe njoftime zyrtare.",
    path: "/lajme",
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [apiNews, setApiNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then(data => setApiNews(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const staticData = getNewsList({
    search: debouncedSearch || undefined,
    category: category || undefined,
    page,
    limit: 12,
  });

  const overriddenSlugs = new Set(apiNews.map(a => a.slug).filter(Boolean));

  const allItems: NewsItem[] = [
    ...apiNews.filter(a =>
      (!debouncedSearch || a.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || a.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase())) &&
      (!category || a.category === category)
    ),
    ...staticData.items.filter(s => !overriddenSlugs.has(s.slug)),
  ];

  const isLoading = false;
  const isError = false;
  const items = allItems;
  const categories = [...new Set([...apiNews.map(i => i.category), ...staticData.categories])];
  const total = staticData.total + apiNews.length;
  const hasMore = page * 12 < staticData.total;

  const featured = !debouncedSearch && !category && page === 1 ? items[0] : null;
  const rest = featured ? items.slice(1) : items;

  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/building_front.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(200,16,46,0.06) 0%, transparent 60%)" }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Shkolla Asim Vokshi</span>
            <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-4">Lajme & Njoftime</h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
              Ngjarjet, arritjet, sukseset dhe njoftimet e fundit nga komuniteti ynë dinamik shkollor.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-16 z-40 bg-[#04090F]/90 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Kërko artikuj..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/50 bg-white/5 text-white placeholder-white/30"
                data-testid="input-news-search"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-white/40 text-xs font-bold uppercase tracking-wider mr-2">
                <Filter size={14} />
                <span>Kategoria:</span>
              </div>
              <button
                onClick={() => { setCategory(""); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  category === "" 
                    ? "bg-crimson text-white border-crimson/20 shadow-lg shadow-crimson/10" 
                    : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                Të gjitha
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    category === cat 
                      ? "bg-crimson text-white border-crimson/20 shadow-lg shadow-crimson/10" 
                      : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                  data-testid={`filter-category-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#04090F]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#07111F]/50 border border-white/5 rounded-2xl overflow-hidden animate-pulse space-y-4">
                <div className="h-48 bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-white/10 rounded w-1/4" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-crimson font-bold py-12">Gabim gjatë ngarkimit të lajmeve. Provoni përsëri.</p>
        ) : items.length === 0 ? (
          <div className="text-center py-24 bg-[#07111F]/20 rounded-2xl border border-white/5">
            <p className="text-white/40 text-lg">Nuk u gjet asnjë artikull për kriteret e kërkimit.</p>
            <button onClick={() => { setSearch(""); setCategory(""); }} className="mt-4 text-crimson hover:text-amber-400 text-sm font-bold uppercase tracking-wider underline">
              Pastro filtrat
            </button>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <AnimateOnView className="mb-12">
                <Link href={`/lajme/${featured.id}`} data-testid={`card-news-featured-${featured.id}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group bg-[#07111F]/50 backdrop-blur-md rounded-3xl border border-white/5 hover:border-crimson/30 overflow-hidden cursor-pointer flex flex-col lg:flex-row shadow-2xl shadow-black/30"
                  >
                    {featured.imageUrl && (
                      <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden relative">
                        <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07111F]/50 hidden lg:block" />
                      </div>
                    )}
                    <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center space-y-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-crimson text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-crimson/20 mb-3">
                          {featured.category}
                        </span>
                        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white group-hover:text-amber-300 transition-colors leading-tight">
                          {featured.title}
                        </h2>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-2 text-crimson group-hover:text-amber-400 font-bold uppercase tracking-widest text-xs pt-2 transition-colors">
                        <span>Lexo artikullin e plotë</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </AnimateOnView>
            )}

            {/* Rest of the News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((item, i) => (
                <AnimateOnView key={item.id} delay={i * 0.05}>
                  <Link href={`/lajme/${item.id}`} data-testid={`card-news-${item.id}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="group bg-[#07111F]/50 backdrop-blur-md rounded-2xl border border-white/5 hover:border-crimson/30 overflow-hidden cursor-pointer flex flex-col justify-between h-full shadow-lg hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300"
                    >
                      <div>
                        {item.imageUrl && (
                          <div className="overflow-hidden h-48 relative">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#04090F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        <div className="p-6 space-y-3">
                          <span className="inline-block px-2.5 py-1 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/10">
                            {item.category}
                          </span>
                          <h3 className="font-serif font-bold text-white text-base leading-snug group-hover:text-amber-300 transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{item.excerpt}</p>
                        </div>
                      </div>
                      
                      <div className="px-6 pb-6 pt-2">
                        <div className="flex items-center gap-1.5 text-crimson group-hover:text-amber-400 font-bold uppercase tracking-widest text-[10px] transition-colors">
                          <span>Lexo artikullin</span>
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </AnimateOnView>
              ))}
            </div>

            {/* Pagination Button */}
            {hasMore && (
              <div className="text-center mt-16">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6 py-3.5 bg-crimson hover:bg-crimson/90 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-crimson/20 hover:shadow-crimson/40 border border-crimson/20 cursor-pointer transition-all"
                  data-testid="button-load-more"
                >
                  Ngarko më shumë lajme
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
}
