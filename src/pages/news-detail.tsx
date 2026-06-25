import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, BookOpen, Compass, Shield } from "lucide-react";
import { getNewsById } from "@/content/site-content";
import { PageTransition } from "@/components/page-transition";

export default function NewsDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const item = getNewsById(id);
  const isLoading = false;
  const isError = false;

  if (isLoading) {
    return (
      <PageTransition>
        <div className="bg-[#04090F] min-h-screen pt-32 max-w-3xl mx-auto px-4 pb-24">
          <div className="animate-pulse space-y-6">
            <div className="h-3 bg-white/10 rounded w-1/4" />
            <div className="h-10 bg-white/10 rounded w-3/4" />
            <div className="h-64 bg-white/5 rounded-2xl border border-white/5" />
            <div className="space-y-3 pt-4">
              {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-white/10 rounded" />)}
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (isError || !item) {
    return (
      <PageTransition>
        <div className="bg-[#04090F] min-h-screen pt-32 max-w-3xl mx-auto px-4 pb-24 text-center flex flex-col justify-center items-center space-y-6">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Artikulli nuk u gjet.</h1>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed">Artikulli që po kërkoni mund të jetë fshirë ose nuk ekziston më në sistemin tonë.</p>
          <Link href="/lajme">
            <button className="px-5 py-2.5 bg-crimson hover:bg-crimson/90 text-white text-xs font-bold uppercase tracking-widest rounded-xl border border-crimson/20 cursor-pointer">
              Kthehu tek lajmet
            </button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const date = new Date(item.publishedAt).toLocaleDateString("sq-AL", { year: "numeric", month: "long", day: "numeric" });

  return (
    <PageTransition>
      <div className="bg-[#04090F] min-h-screen pb-32">
        {/* Hero Image Section */}
        {item.imageUrl && (
          <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden border-b border-white/5">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/50 to-transparent" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-8 border-b border-white/5 mb-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
              <Link href="/" className="hover:text-white transition-colors">Kryefaqja</Link>
              <span>/</span>
              <Link href="/lajme" className="hover:text-white transition-colors">Lajme</Link>
              <span>/</span>
              <span className="text-amber-400 truncate max-w-[180px]">{item.title}</span>
            </div>
            
            <Link href="/lajme">
              <motion.div
                whileHover={{ x: -4 }}
                className="inline-flex items-center gap-2 text-crimson hover:text-amber-400 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
                data-testid="link-back-to-news"
              >
                <ArrowLeft size={14} />
                Kthehu tek lajmet
              </motion.div>
            </Link>
          </div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Meta Tags */}
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-crimson text-white text-[10px] font-bold uppercase tracking-widest rounded-lg border border-crimson/20">
                <Tag size={10} />
                {item.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/40 text-xs font-semibold">
                <Calendar size={12} />
                {date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {item.title}
            </h1>

            {/* Paragraphs */}
            <div className="text-white/70 text-base sm:text-lg leading-relaxed space-y-6 pt-4 border-t border-white/5">
              {item.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="font-medium text-white/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
