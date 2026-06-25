import { Link } from "wouter";
import { Mail, MapPin, Phone, Globe, Compass, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ASSET_LOGO } from "@/lib/assets";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#04090F] text-white overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-crimson/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-amber-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg p-1">
                <img src={ASSET_LOGO} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-serif font-bold tracking-wide group-hover:text-amber-300 transition-colors leading-none">Asim Vokshi</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Ekselencë Gjuhësore</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Shkolla e Mesme me Orientim Gjuhësor — themeluar më 15 shtator 1965. Institucioni kryesor i arsimit gjuhësor të mesëm në zemër të Tiranës.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/p/Gjimnazi-me-orientim-gjuh%C3%ABsor-Asim-Vokshi-Faqja-zyrtare-100079922222899/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white text-xs font-medium border border-white/5 transition-all duration-300 cursor-pointer"
              >
                Facebook
              </a>
              <a 
                href="https://www.instagram.com/gjuhet_e_huaja_asim_vokshi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white text-xs font-medium border border-white/5 transition-all duration-300 cursor-pointer"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-6">Shkolla</h4>
            <ul className="space-y-3">
              {[
                { href: "/rreth-nesh", label: "Rreth Nesh" },
                { href: "/stafi", label: "Stafi Akademik" },
                { href: "/departamente", label: "Departamentet" },
                { href: "/infrastruktura", label: "Infrastruktura" },
                { href: "/rregullore", label: "Rregullorja" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className="group flex items-center gap-1 text-white/60 hover:text-white text-sm transition-all duration-300 cursor-pointer">
                      <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-crimson" />
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-6">Studentët</h4>
            <ul className="space-y-3">
              {[
                { href: "/jeta-studentore", label: "Jeta Studentore" },
                { href: "/klube", label: "Klube" },
                { href: "/projektet", label: "Projektet" },
                { href: "/karriera", label: "Karriera" },
                { href: "/kalendar", label: "Kalendari" },
                { href: "/lajme", label: "Lajme & Njoftime" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className="group flex items-center gap-1 text-white/60 hover:text-white text-sm transition-all duration-300 cursor-pointer">
                      <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-crimson" />
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <div className="p-2 rounded-lg bg-white/5 text-crimson border border-white/5 shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <span className="leading-relaxed">Rruga "Elbasanit", Njësia Bashkiake Nr. 2, Tiranë, Shqipëri</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <div className="p-2 rounded-lg bg-white/5 text-crimson border border-white/5 shrink-0">
                  <Mail size={14} />
                </div>
                <a href="mailto:shavokshi@yahoo.com" className="hover:text-white transition-colors">shavokshi@yahoo.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <div className="p-2 rounded-lg bg-white/5 text-crimson border border-white/5 shrink-0">
                  <Phone size={14} />
                </div>
                <span>E Hënë–E Premte 08:00–17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-white/40 text-xs">
            © {year} SMOGJ "Asim Vokshi". Ndërtuar me pasion nga <a href="https://www.instagram.com/benardd.exe/" target="_blank" rel="noopener noreferrer" className="text-crimson hover:text-amber-400 font-semibold transition-colors duration-300">Benard Pernezha</a>.
          </p>
          <div className="flex items-center gap-3 text-white/30 text-xs">
            <span>ZVA Tiranë</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>DRAP Tiranë</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>Shqipëri</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
