import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, PhoneCall } from "lucide-react";
import { ASSET_LOGO } from "@/lib/assets";

const navLinks = {
  shkolla: [
    { href: "/rreth-nesh", label: "Rreth Nesh", desc: "Historia, misioni dhe vlerat tona" },
    { href: "/stafi", label: "Stafi Akademik", desc: "Mësuesit dhe administratat" },
    { href: "/departamente", label: "Departamentet", desc: "6 departamentet tona akademike" },
    { href: "/infrastruktura", label: "Infrastruktura", desc: "Kabinete, laboratorë dhe mjedise" },
    { href: "/rregullore", label: "Rregullorja", desc: "Rregullat dhe kodet e mirësjelljes" },
  ],
  studentet: [
    { href: "/orari", label: "Orari i Orëve", desc: "Orari i mësimeve për çdo klasë" },
    { href: "/jeta-studentore", label: "Jeta Studentore", desc: "Aktivitetet, arritjet dhe partnerët" },
    { href: "/klube", label: "Klube", desc: "Aktivitetet jashtëkurrikulare" },
    { href: "/projektet", label: "Projektet", desc: "Projektet tona ndërkombëtare" },
    { href: "/karriera", label: "Karriera", desc: "Këshillim karriere & rrugëtimi" },
    { href: "/kalendar", label: "Kalendari", desc: "Kalendari i vitit akademik" },
  ],
};

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      if (isHome) {
        setScrollProgress(Math.min(100, (y / (document.documentElement.scrollHeight - window.innerHeight)) * 100));
      } else {
        setScrollProgress(100);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, location]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "glass-frosted py-3 shadow-2xl shadow-black/30"
          : "bg-transparent py-5"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-crimson via-amber-400 to-crimson" 
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo Brand */}
          <Link href="/">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center p-1.5 group-hover:glow-red-intense transition-all duration-300 relative overflow-hidden"
                whileHover={{ boxShadow: "0 0 30px rgba(200, 16, 46, 0.4)" }}
              >
                <div className="absolute inset-0 bg-crimson/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img src={ASSET_LOGO} alt="Asim Vokshi Logo" className="w-full h-full object-contain relative z-10" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base text-white tracking-wide leading-tight group-hover:text-amber-300 transition-colors duration-300">Asim Vokshi</span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold leading-none">Gjuhësor • Tiranë</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <motion.div 
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide cursor-pointer transition-all duration-300 ${
                  location === "/" 
                    ? "bg-white/10 text-amber-400 glow-gold-intense" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >Homepage</motion.div>
            </Link>

            {/* Dropdown 1: Shkolla */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("shkolla")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.button 
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1.5 cursor-pointer transition-all duration-300 ${
                  activeDropdown === "shkolla" 
                    ? "text-white bg-white/10" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Shkolla</span>
                <motion.div
                  animate={{ rotate: activeDropdown === "shkolla" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={12} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeDropdown === "shkolla" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.92 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl glass-frosted p-3 shadow-2xl shadow-black/50 grid gap-1 z-50"
                  >
                    {navLinks.shkolla.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <motion.div 
                          className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                            location === link.href 
                              ? "bg-white/10 text-amber-400 glow-gold" 
                              : "hover:bg-white/5 text-white/70 hover:text-white"
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 group-hover:glow-gold-intense transition-all">
                            <span className="text-sm">→</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold">{link.label}</span>
                            <span className="text-[10px] text-white/40 font-medium leading-normal">{link.desc}</span>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 2: Studentet */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("studentet")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.button 
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1.5 cursor-pointer transition-all duration-300 ${
                  activeDropdown === "studentet" 
                    ? "text-white bg-white/10" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Nxënësit</span>
                <motion.div
                  animate={{ rotate: activeDropdown === "studentet" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={12} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeDropdown === "studentet" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.92 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl glass-frosted p-3 shadow-2xl shadow-black/50 grid gap-1 z-50"
                  >
                    {navLinks.studentet.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <motion.div 
                          className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                            location === link.href 
                              ? "bg-white/10 text-amber-400 glow-gold" 
                              : "hover:bg-white/5 text-white/70 hover:text-white"
                          }`}
                          whileHover={{ x: 4 }}
                        >
                          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400">
                            <span className="text-sm">→</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold">{link.label}</span>
                            <span className="text-[10px] text-white/40 font-medium leading-normal">{link.desc}</span>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/lajme">
              <motion.div 
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide cursor-pointer transition-all duration-300 ${
                  location.startsWith("/lajme") 
                    ? "bg-white/10 text-amber-400 glow-gold-intense" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lajme
              </motion.div>
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/kontakt">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(200, 16, 46, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl bg-crimson text-white text-xs font-bold tracking-wide shadow-lg shadow-crimson/20 hover:bg-crimson/90 flex items-center gap-2 cursor-pointer border border-crimson/30 transition-all duration-300 glow-red-intense"
              >
                <PhoneCall size={14} />
                <span>Kontakto</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-xl glass-premium text-white cursor-pointer min-h-11 min-w-11 flex items-center justify-center"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass-frosted border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile: Shkolla Links */}
                <div className="space-y-2">
                  <h4 className="text-[10px] text-white/30 uppercase tracking-widest font-bold px-3">Shkolla</h4>
                  {navLinks.shkolla.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <motion.div 
                        className={`px-4 py-3 rounded-xl text-sm font-bold cursor-pointer transition-colors min-h-11 flex items-center ${
                          location === link.href 
                            ? "bg-crimson/10 text-amber-400" 
                            : "text-white/60 hover:text-white"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Mobile: Nxenesit Links */}
                <div className="space-y-2">
                  <h4 className="text-[10px] text-white/30 uppercase tracking-widest font-bold px-3">Nxënësit</h4>
                  {navLinks.studentet.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <motion.div 
                        className={`px-4 py-3 rounded-xl text-sm font-bold cursor-pointer transition-colors min-h-11 flex items-center ${
                          location === link.href 
                            ? "bg-crimson/10 text-amber-400" 
                            : "text-white/60 hover:text-white"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                <Link href="/lajme">
                  <motion.div 
                    className={`px-4 py-3 rounded-xl text-sm font-bold cursor-pointer transition-colors min-h-11 flex items-center ${
                      location.startsWith("/lajme") 
                        ? "bg-crimson/10 text-amber-400" 
                        : "text-white/60 hover:text-white"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    Lajme
                  </motion.div>
                </Link>
                <Link href="/kontakt">
                  <motion.button 
                    className="w-full py-3.5 rounded-xl bg-crimson text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer border border-crimson/30 glow-red-intense min-h-12"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PhoneCall size={14} />
                    <span>Kontakto</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
