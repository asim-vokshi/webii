import { useSeo } from "@/hooks/useSeo";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Star, Users, BookOpen, Globe, TrendingUp, Sparkles, Compass, Award, ShieldAlert, Heart, Calendar } from "lucide-react";
import { getNewsList } from "@/content/site-content";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";
import { useMagnetic } from "@/hooks/use-magnetic";
import { TiltCard } from "@/components/tilt-card";
import confetti from "canvas-confetti";
import { SCHOOL_IMAGES } from "@/lib/assets";

function StatCounter({ value, suffix = "", label, icon: Icon }: { value: number; suffix?: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(ease * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-8 relative group overflow-hidden h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-black/20 group-hover:border-crimson/30 group-hover:bg-crimson/5 transition-all duration-500">
        <Icon size={24} className="text-amber-400 group-hover:text-crimson transition-colors duration-500" />
      </div>
      <div className="text-4xl lg:text-5xl font-bold text-white tabular-nums tracking-tight mt-4">
        {count}{suffix}
      </div>
      <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] text-center font-bold group-hover:text-white/60 transition-colors duration-500 mt-2">{label}</div>
    </div>
  );
}

function NewsCard({ item }: { item: { id: number; title: string; excerpt: string; category: string; imageUrl?: string | null; publishedAt: string } }) {
  return (
    <Link href={`/lajme/${item.id}`} data-testid={`card-news-${item.id}`}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group bg-[#07111F]/50 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-crimson/30 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-500 cursor-pointer flex flex-col h-full"
      >
        {item.imageUrl && (
          <div className="overflow-hidden h-48 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] to-transparent opacity-60 z-10" />
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <span className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-crimson text-white text-[10px] font-bold rounded-lg uppercase tracking-widest border border-crimson/20 shadow-lg shadow-crimson/20">
              {item.category}
            </span>
          </div>
        )}
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <div className="text-white/30 text-xs font-medium mb-3">
              {new Date(item.publishedAt).toLocaleDateString("sq-AL", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <h3 className="font-bold text-white text-lg leading-snug mb-3 group-hover:text-amber-300 transition-colors line-clamp-2">
              {item.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">{item.excerpt}</p>
          </div>
          <div className="flex items-center gap-1 text-crimson text-sm font-semibold group-hover:text-amber-400 transition-colors mt-auto">
            <span>Lexo më shumë</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Home() {
  useSeo({
    title: "Shkollë e Mesme Gjuhësore në Tiranë",
    description: "Faqja zyrtare e Shkollës 'Asim Vokshi' — shkollë e mesme me orientim gjuhësor në Tiranë, themeluar në 1965. Seksione dygjuhëshe në italisht, frengjisht, gjermanisht, spanjisht dhe anglisht.",
    path: "/",
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax values
  const bgY = useTransform(scrollY, [0, 800], [0, 160]);
  const bgSpringY = useSpring(bgY, { stiffness: 100, damping: 30 });
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, -60]);

  const newsData = getNewsList({ page: 1, limit: 3 });
  const newsItems = newsData.items;
  const newsLoading = false;
  const languages = ["Anglisht", "Frëngjisht", "Italisht", "Gjermanisht", "Spanjisht", "Rusisht", "Turqisht"];

  // Magnetic refs for CTAs
  const exploreBtnRef = useMagnetic(0.2);
  const contactBtnRef = useMagnetic(0.15);
  const ctaBtnRef = useMagnetic(0.2);

  // Confetti trigger
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#C8102E", "#D4AF37", "#07111F"],
    });
  };

  return (
    <PageTransition>
      {/* HERO SECTION WITH ACTUAL SCHOOL PHOTO BACKGROUND */}
      <section ref={heroRef} className="relative h-screen min-h-[750px] flex items-center overflow-hidden bg-[#04090F]">
        {/* Parallax background image (Actual front of school) */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgSpringY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${SCHOOL_IMAGES.building_front}')`,
              transform: "scale(1.1)",
              opacity: 0.35,
            }}
          />
        </motion.div>

        {/* Cinematic gradients & overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090F] via-[#04090F]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-transparent to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(200,16,46,0.2) 0%, transparent 70%)" }} />

        {/* Ambient Glows */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-crimson/20 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Elegant badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 bg-white/5 border border-white/10 backdrop-blur-md">
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-amber-400"
              />
              <span className="text-white/90 text-xs font-semibold uppercase tracking-wider">Arsim me Standarde Europiane</span>
            </div>

            {/* Sub-tagline */}
            <p className="text-amber-400 text-xs sm:text-sm uppercase tracking-[0.25em] mb-4 font-bold">
              Shkollë me Orientim Gjuhësor · Tiranë · Themeluar 1965
            </p>

            {/* Typography Reveal */}
            <h1 className="font-bold text-white mb-6 leading-none tracking-tight" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}>
              Asim Vokshi
            </h1>

            {/* Premium Divider */}
            <div className="flex items-center gap-4 mb-8 max-w-lg">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-crimson to-amber-500" />
              <span className="text-white/80 text-xs uppercase tracking-[0.2em] font-bold">Ekselencë Gjuhësore</span>
              <div className="h-[2px] flex-1 bg-gradient-to-l from-crimson to-amber-500" />
            </div>

            {/* Languages List */}
            <div className="flex flex-wrap gap-2.5 mb-8 max-w-2xl">
              {languages.map((lang, i) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="px-4 py-1.5 bg-white/5 hover:bg-crimson/10 text-white/80 hover:text-white text-xs font-semibold rounded-xl border border-white/10 hover:border-crimson/30 transition-all cursor-pointer"
                >
                  {lang}
                </motion.span>
              ))}
            </div>

            {/* Description text */}
            <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
              Gjimnazi me Orientim Gjuhësor formon breza me kompetenca të shkëlqyera në 7 gjuhë të huaja dhe arsim cilësor që nga viti <span className="text-amber-400 font-bold">1965</span>.
            </p>

            {/* Interactive CTAs with Magnetic effects */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/rreth-nesh">
                <button
                  ref={exploreBtnRef as React.RefObject<HTMLButtonElement>}
                  className="px-8 py-4 bg-crimson hover:bg-crimson/90 text-white font-bold rounded-xl flex items-center gap-2 shadow-xl shadow-crimson/20 hover:shadow-crimson/40 border border-crimson/20 cursor-pointer transition-all duration-300 ease-out"
                  data-testid="button-explore-school"
                >
                  Zbulo Shkollën
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/kontakt">
                <button
                  ref={contactBtnRef as React.RefObject<HTMLButtonElement>}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all duration-300 ease-out cursor-pointer"
                  data-testid="button-contact"
                >
                  Na Kontaktoni
                </button>
              </Link>
            </div>

            {/* Accredited stamp */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-9 h-9 rounded-xl bg-gradient-to-br from-crimson to-amber-500 border-2 border-[#04090F] flex items-center justify-center shadow-lg">
                    <Users size={12} className="text-white" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="stroke-none" />)}
              </div>
              <span className="text-white/50 text-xs sm:text-sm font-medium">Institucion Kombëtar i Akredituar</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Shpalos</span>
          <ChevronDown size={16} className="text-amber-400" />
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="relative z-20 -mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#07111F]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 divide-y lg:divide-y-0 overflow-hidden"
          >
            <StatCounter value={1965} label="Themelimi" icon={Award} />
            <StatCounter value={54} label="Staf Akademik" icon={Users} />
            <StatCounter value={7} label="Gjuhë të Huaja" icon={Globe} />
            <StatCounter value={2} label="Seksione Dygjuhëshe" icon={TrendingUp} />
          </motion.div>
        </div>
      </section>

      {/* PARTNERS & SPONSORS INFINITE SCROLLING MARQUEE */}
      <section className="py-12 bg-[#04090F] relative overflow-hidden border-t border-b border-white/5 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="text-center">
            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">Partnerët & Bashkëpunëtorët Tanë Strategjikë</span>
          </div>
        </div>
        <div className="relative w-full flex items-center overflow-hidden py-4 select-none">
          {/* Left & Right Glass Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#04090F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#04090F] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex flex-row flex-nowrap items-center gap-16 shrink-0">
            {/* First Set of Items */}
            {[
              "EU4Schools", "RYCO Western Balkans", "IDMC", "Ambasada Franceze", 
              "Ambasada Italiane", "Ambasada Gjermane", "Ambasada Spanjolle", 
              "Ambasada Turke", "BE ",  "UNDP"
            ].map((partner, index) => (
              <div key={`p1-${index}`} className="flex items-center gap-3 whitespace-nowrap shrink-0">
                <div className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_10px_#FF3B5C] shrink-0" />
                <span className="text-white font-extrabold text-sm sm:text-base tracking-wider uppercase opacity-85 hover:opacity-100 transition-opacity duration-300 shrink-0">
                  {partner}
                </span>
              </div>
            ))}
            {/* Second Set of Items for Seamless Infinite Loop */}
            {[
             "EU4Schools", "RYCO Western Balkans", "IDMC", "Ambasada Franceze", 
              "Ambasada Italiane", "Ambasada Gjermane", "Ambasada Spanjolle", 
              "Ambasada Turke", "BE ",  "UNDP"
            ].map((partner, index) => (
              <div key={`p2-${index}`} className="flex items-center gap-3 whitespace-nowrap shrink-0">
                <div className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_10px_#FF3B5C] shrink-0" />
                <span className="text-white font-extrabold text-sm sm:text-base tracking-wider uppercase opacity-85 hover:opacity-100 transition-opacity duration-300 shrink-0">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM BENTO GRID WITH ACTUAL SCHOOL PHOTOS */}
      <section className="py-32 bg-[#04090F] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/3 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="text-center mb-20">
              <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Mundësitë Tona</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Zbulo Shkollën</h2>
              <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Gjithçka që duhet të dini për shkollen tonë, mjediset bashkëkohore dhe programet akademike.
              </p>
            </div>
          </AnimateOnView>

          {/* Premium Bento Grid Layout using TiltCard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Large About Us (With Actual Ceremony Photo) */}
            <AnimateOnView className="md:col-span-2" delay={0.05}>
              <Link href="/rreth-nesh">
                <TiltCard maxTilt={6} className="h-[380px] border border-white/10 shadow-2xl rounded-3xl overflow-hidden group">
                  <div className="relative w-full h-full p-8 md:p-10 flex flex-col justify-between cursor-pointer text-white">
                    {/* Actual School Photo Background with higher opacity and dark premium glass overlay */}
                    <div className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" style={{ backgroundImage: `url('${SCHOOL_IMAGES.ceremony}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/70 to-[#04090F]/40 transition-colors duration-500 group-hover:via-[#04090F]/60" />
                    
                    {/* Neon hover border glow effect */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-crimson/30 rounded-3xl transition-all duration-500 pointer-events-none z-20" />
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-crimson/15 rounded-full blur-3xl group-hover:bg-crimson/35 transition-colors duration-500" />
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:border-crimson/40 transition-colors duration-500">
                        <Compass size={22} className="text-amber-400 group-hover:text-crimson transition-colors duration-500" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-crimson/30 text-white px-3 py-1 rounded-lg border border-crimson/50 shadow-[0_0_15px_rgba(200,16,46,0.3)]">Historia & Misioni</span>
                    </div>

                    <div className="max-w-xl space-y-4 relative z-10">
                      <h3 className="font-bold text-3xl tracking-wide group-hover:text-amber-300 transition-colors duration-300">Rreth Nesh</h3>
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
                        Historia, misioni dhe arritjet tona që nga viti 1965. Formojmë breza me kompetenca të larta gjuhësore europiane.
                      </p>
                      <div className="flex items-center gap-1 text-white/90 group-hover:text-amber-300 text-xs font-bold transition-colors pt-2">
                        <span>Shiko më shumë</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </AnimateOnView>

            {/* Bento Card 2: Infrastructure (With Actual Interactive Class Photo) */}
            <AnimateOnView delay={0.1}>
              <Link href="/infrastruktura">
                <TiltCard maxTilt={8} className="h-[380px] border border-white/10 shadow-2xl rounded-3xl overflow-hidden group">
                  <div className="relative w-full h-full p-8 flex flex-col justify-between cursor-pointer text-white">
                    {/* Actual School Photo Background */}
                    <div className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" style={{ backgroundImage: `url('${SCHOOL_IMAGES.class_interactive}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/75 to-[#04090F]/45 transition-colors duration-500 group-hover:via-[#04090F]/65" />
                    
                    {/* Neon hover border glow effect */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-amber-500/30 rounded-3xl transition-all duration-500 pointer-events-none z-20" />
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/25 transition-colors duration-500" />

                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md relative z-10 group-hover:border-amber-400/40 transition-colors duration-500">
                      <Globe size={22} className="text-amber-400" />
                    </div>

                    <div className="space-y-3 relative z-10">
                      <h3 className="font-bold text-2xl tracking-wide group-hover:text-amber-300 transition-colors duration-300">Infrastruktura</h3>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                        Mjedise moderne, kabinete gjuhësh të pajisura me tabela interaktive dhe laboratorë shkencorë të rikonstruktuar.
                      </p>
                      <div className="flex items-center gap-1 text-white/90 group-hover:text-amber-300 text-xs font-bold transition-colors pt-2">
                        <span>Shiko më shumë</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </AnimateOnView>

            {/* Bento Card 3: Projects (With Actual Activity Hall Photo) */}
            <AnimateOnView delay={0.15}>
              <Link href="/projektet">
                <TiltCard maxTilt={8} className="h-[380px] border border-white/10 shadow-2xl rounded-3xl overflow-hidden group">
                  <div className="relative w-full h-full p-8 flex flex-col justify-between cursor-pointer text-white">
                    {/* Actual School Photo Background */}
                    <div className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" style={{ backgroundImage: `url('${SCHOOL_IMAGES.activity_hall}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/75 to-[#04090F]/45 transition-colors duration-500 group-hover:via-[#04090F]/65" />
                    
                    {/* Neon hover border glow effect */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/30 rounded-3xl transition-all duration-500 pointer-events-none z-20" />
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/25 transition-colors duration-500" />

                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md relative z-10 group-hover:border-blue-400/40 transition-colors duration-500">
                      <Sparkles size={22} className="text-blue-400" />
                    </div>

                    <div className="space-y-3 relative z-10">
                      <h3 className="font-bold text-2xl tracking-wide group-hover:text-amber-300 transition-colors duration-300">Projektet</h3>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                        Partneritete strategjike me EU4Schools, UNDP dhe organizata europiane për integrimin ndërkombëtar të nxënësve.
                      </p>
                      <div className="flex items-center gap-1 text-white/90 group-hover:text-amber-300 text-xs font-bold transition-colors pt-2">
                        <span>Shiko më shumë</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </AnimateOnView>

            {/* Bento Card 4: Large Student Life (With Actual Group Photo) */}
            <AnimateOnView className="md:col-span-2" delay={0.2}>
              <Link href="/jeta-studentore">
                <TiltCard maxTilt={6} className="h-[380px] border border-white/10 shadow-2xl rounded-3xl overflow-hidden group">
                  <div className="relative w-full h-full p-8 md:p-10 flex flex-col justify-between cursor-pointer text-white">
                    {/* Actual School Photo Background */}
                    <div className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" style={{ backgroundImage: `url('${SCHOOL_IMAGES.students_group2}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04090F] via-[#04090F]/70 to-[#04090F]/40 transition-colors duration-500 group-hover:via-[#04090F]/60" />
                    
                    {/* Neon hover border glow effect */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/30 rounded-3xl transition-all duration-500 pointer-events-none z-20" />
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl group-hover:bg-purple-500/35 transition-colors duration-500" />

                    <div className="flex items-center justify-between relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:border-purple-400/40 transition-colors duration-500">
                        <Award size={22} className="text-purple-400 group-hover:text-purple-300 transition-colors duration-500" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-purple-500/30 text-white px-3 py-1 rounded-lg border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]">Komuniteti Shkollor</span>
                    </div>

                    <div className="max-w-xl space-y-4 relative z-10">
                      <h3 className="font-bold text-3xl tracking-wide group-hover:text-amber-300 transition-colors duration-300">Jeta Studentore</h3>
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
                        Aktivitete kulturore, sporte, klube artistike dhe arritje të jashtëzakonshme të nxënësve tanë në nivel kombëtar dhe rajonal.
                      </p>
                      <div className="flex items-center gap-1 text-white/90 group-hover:text-amber-300 text-xs font-bold transition-colors pt-2">
                        <span>Shiko më shumë</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </AnimateOnView>
          </div>
        </div>
      </section>

      

      {/* NEWS PREVIEW */}
      <section className="py-32 bg-[#07111F]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnView>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Njoftimet më të Fundit</span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">Lajme & Njoftime</h2>
                <p className="text-white/50 text-sm sm:text-base">Ngjarjet, sukseset dhe aktivitetet më të fundit në shkollën tonë.</p>
              </div>
              <Link href="/lajme">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="hidden sm:flex items-center gap-2 px-5 py-3 border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold text-white/80 hover:text-white transition-colors cursor-pointer bg-white/5"
                  data-testid="button-all-news"
                >
                  Të gjitha lajmet
                  <ArrowRight size={14} />
                </motion.button>
              </Link>
            </div>
          </AnimateOnView>

          {newsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-[#07111F]/50 border border-white/5 rounded-2xl overflow-hidden shadow-md animate-pulse">
                  <div className="h-48 bg-white/5" />
                  <div className="p-6 space-y-4">
                    <div className="h-3 bg-white/10 rounded w-1/3" />
                    <div className="h-5 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : newsItems.length === 0 ? (
            <p className="text-center text-white/40 py-12">Nuk ka lajme.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item, i) => (
                <AnimateOnView key={item.id} delay={i * 0.1}>
                  <NewsCard item={item} />
                </AnimateOnView>
              ))}
            </div>
          )}

          <div className="text-center mt-12 sm:hidden">
            <Link href="/lajme">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white"
                data-testid="button-all-news-bottom"
              >
                Të gjitha lajmet
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 bg-[#04090F] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(200,16,46,0.08) 0%, transparent 60%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 80% 50%, rgba(245,158,11,0.06) 0%, transparent 60%)" }} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnView>
            <span className="text-amber-400 text-xs uppercase tracking-widest font-bold mb-4 inline-block">Regjistrohu Sot</span>
            <h2 className="font-bold text-white text-4xl sm:text-5xl mb-6 tracking-tight">E ardhmja fillon këtu.</h2>
            <p className="text-white/60 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Bashkohuni me gjimnazin tonë të akredituar dhe zhvilloni kompetencat tuaja gjuhësore me standardet më të larta europiane.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/kontakt">
                <button
                  ref={ctaBtnRef as React.RefObject<HTMLButtonElement>}
                  className="px-8 py-4 bg-crimson hover:bg-crimson/90 text-white font-bold rounded-xl shadow-xl shadow-crimson/20 hover:shadow-crimson/40 border border-crimson/20 cursor-pointer transition-all duration-300 ease-out"
                  data-testid="button-apliko"
                >
                  KONTAKTO
                </button>
              </Link>
              <Link href="/departamente">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all cursor-pointer"
                  data-testid="button-curriculum"
                >
                  Shihni Kurrikulën
                </motion.button>
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </section>
    </PageTransition>
  );
}
