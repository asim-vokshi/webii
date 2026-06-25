import { useSeo } from "@/hooks/useSeo";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Mail, Award, BookOpen, Shield, GraduationCap, Compass, Users } from "lucide-react";
import { getStaffList } from "@/content/site-content";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";

function StaffCard({ member }: { member: { id: number; name: string; role: string; department: string; bio: string; email?: string | null; yearsExperience?: number | null } }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const deptColors: Record<string, string> = {
    "Drejtori": "bg-crimson/10 text-crimson border-crimson/20",
    "Gjuhë e Huaj": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Gjuhë Shqipe": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Matematikë": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Shkenca": "bg-teal-500/10 text-teal-400 border-teal-500/20",
    "Histori-Gjeografi": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Informatikë": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    "Arte": "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "Edukim Fizik": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "Shërbime Mbështetese": "bg-white/5 text-white/50 border-white/10",
  };
  const badgeClass = deptColors[member.department] ?? "bg-white/5 text-white/50 border-white/10";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#07111F]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-crimson/30 hover:shadow-2xl hover:shadow-crimson/5 transition-all duration-300 flex flex-col justify-between h-full"
      data-testid={`card-staff-${member.id}`}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-crimson to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-crimson/10">
            <span className="text-white font-serif font-bold text-lg">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-white text-base leading-tight truncate">{member.name}</h3>
            <p className="text-amber-400 text-xs font-bold mt-1 uppercase tracking-wider">{member.role}</p>
            <span className={`inline-block mt-2 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${badgeClass}`}>
              {member.department}
            </span>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-4">{member.bio}</p>
      </div>
      <div className="flex items-center gap-4 pt-4 mt-4 border-t border-white/5">
        {member.yearsExperience && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Award size={14} className="text-amber-400" />
            <span className="font-medium">{member.yearsExperience} vite përvojë</span>
          </div>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-xs text-crimson hover:text-amber-400 transition-colors ml-auto font-semibold">
            <Mail size={14} />
            <span className="truncate max-w-[140px]">{member.email}</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Staff() {
  useSeo({
    title: "Stafi Akademik",
    description: "Njihuni me mësuesit dhe administratën e Shkollës Asim Vokshi — profesionistë të kualifikuar me përvojë në arsimin gjuhësor.",
    path: "/stafi",
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const data = getStaffList({
    search: debouncedSearch || undefined,
    department: department || undefined,
  });

  const isLoading = false;
  const isError = false;
  const members = data.items;
  const departments = data.departments;

  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/building_front.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(200,16,46,0.08) 0%, transparent 60%)" }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Komuniteti Akademik</span>
            <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-4">Stafi Akademik</h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
              51 mësues dhe administratorë të kualifikuar të përkushtuar ndaj ekselencës akademike dhe arsimit gjuhësor.
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
                placeholder="Kërko staf sipas emrit ose rolit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-crimson/50 focus:ring-1 focus:ring-crimson/50 bg-white/5 text-white placeholder-white/30"
                data-testid="input-staff-search"
              />
            </div>
            
            {/* Department Filters */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-white/40 text-xs font-bold uppercase tracking-wider mr-2">
                <Filter size={14} />
                <span>Departamenti:</span>
              </div>
              <button
                onClick={() => setDepartment("")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  department === "" 
                    ? "bg-crimson text-white border-crimson/20 shadow-lg shadow-crimson/10" 
                    : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                Të gjitha
              </button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDepartment(dept)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    department === dept 
                      ? "bg-crimson text-white border-crimson/20 shadow-lg shadow-crimson/10" 
                      : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                  data-testid={`filter-dept-${dept}`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#04090F]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-[#07111F]/50 border border-white/5 rounded-2xl p-6 animate-pulse space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-xl bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-3 bg-white/10 rounded" />
                  <div className="h-3 bg-white/10 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-center text-crimson font-bold py-12">Gabim gjatë ngarkimit të stafi.</p>
        ) : members.length === 0 ? (
          <div className="text-center py-24 bg-[#07111F]/20 rounded-2xl border border-white/5">
            <p className="text-white/40 text-lg">Nuk u gjet asnjë anëtar stafi për kriteret e kërkimit.</p>
            <button onClick={() => { setSearch(""); setDepartment(""); }} className="mt-4 text-crimson hover:text-amber-400 text-sm font-bold uppercase tracking-wider underline">
              Pastro filtrat
            </button>
          </div>
        ) : (
          <>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">{members.length} anëtarë stafi të gjetur</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member, i) => (
                <AnimateOnView key={member.id} delay={(i % 3) * 0.05}>
                  <StaffCard member={member} />
                </AnimateOnView>
              ))}
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
}
