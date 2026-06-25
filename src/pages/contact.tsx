import { useSeo } from "@/hooks/useSeo";
import { MapPin, Mail, Clock, User, Phone } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { AnimateOnView } from "@/components/animate-on-view";
import { motion } from "framer-motion";
import { MapView } from "@/components/Map";

const contacts = [
  { name: "Marsida Jarani", role: "Drejtore", icon: User, email: "jarani@shavokshi.edu.al" },
  { name: "Sekretaria", role: "E Hënë–E Premte 08:00–17:00", icon: Phone, email: "shavokshi@yahoo.com" },
  { name: "Jorida Braushi", role: "Psikologe Shkollore", icon: User, email: "braushi@shavokshi.edu.al" },
  { name: "Olta Barbullushi", role: "Koordinatore e Karrierës", icon: User, email: "barbullushi@shavokshi.edu.al" },
];

export default function Contact() {
  useSeo({
    title: "Kontakt — Na Kontaktoni",
    description: "Kontaktoni Shkollën Asim Vokshi në Tiranë. Adresa: Rruga Elbasanit, Tiranë. Telefon, email dhe hartë e vendndodhjes.",
    path: "/kontakt",
  });
  // Google Map Center for Rruga Elbasanit, Tiranë (approx location of Asim Vokshi)
  const mapCenter = { lat: 41.3211, lng: 19.8322 };

  const handleMapReady = (map: google.maps.Map) => {
    // Create a custom dark mode style for the map
    const darkMapStyle = [
      { elementType: "geometry", stylers: [{ color: "#04090f" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#04090f" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }, { opacity: 0.6 }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f59e0b" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }, { opacity: 0.4 }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#07111f" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#0d1b2a" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1b263b" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }, { opacity: 0.5 }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#c8102e" }, { opacity: 0.2 }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000814" }],
      },
    ];

    map.setOptions({ styles: darkMapStyle });

    // Add a custom glowing marker for the school
    new window.google.maps.Marker({
      position: mapCenter,
      map: map,
      title: "Shkolla e Mesme me Orientim Gjuhësor 'Asim Vokshi'",
      animation: window.google.maps.Animation.DROP,
    });
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative bg-[#04090F] pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/images/building_front.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04090F]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(200,16,46,0.08) 0%, transparent 60%)" }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimateOnView>
            <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-3 inline-block">Na Kontaktoni</span>
            <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-4">Kontakt</h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
              Këtu mund të gjeni të gjitha detajet e kontaktit të zyrave tona kryesore dhe vendndodhjen gjeografike të shkollës.
            </p>
          </AnimateOnView>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#04090F]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* Left Column: Contact Info Details */}
          <div className="space-y-12 flex flex-col justify-between">
            {/* Quick Contacts Grid */}
            <AnimateOnView className="w-full">
              <div className="space-y-6">
                <div>
                  <span className="text-crimson text-xs uppercase tracking-widest font-bold mb-2 inline-block">Komunikim i Shpejtë</span>
                  <h2 className="text-2xl font-serif font-bold text-white">Zyrat Kryesore</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contacts.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-[#07111F]/40 backdrop-blur-md rounded-2xl p-5 border border-white/5 hover:border-crimson/20 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                        <c.icon size={18} className="text-amber-400" />
                      </div>
                      <h4 className="font-serif font-bold text-white text-sm">{c.name}</h4>
                      <p className="text-white/40 text-xs mt-1 leading-relaxed">{c.role}</p>
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="mt-3 text-xs text-crimson hover:text-amber-400 transition-colors block truncate font-semibold">
                          {c.email}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimateOnView>

            {/* Address, Email, Hours */}
            <AnimateOnView className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-3 p-5 bg-[#07111F]/40 backdrop-blur-md rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-crimson">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-white text-sm mb-1">Adresa</p>
                    <p className="text-white/50 text-xs leading-relaxed">Rruga "Elbasanit", Njësia 2, Tiranë, Shqipëri</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 p-5 bg-[#07111F]/40 backdrop-blur-md rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-crimson">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-white text-sm mb-1">Email Zyrtar</p>
                    <a href="mailto:shavokshi@yahoo.com" className="text-crimson hover:text-amber-400 text-xs font-semibold transition-colors truncate block">
                      shavokshi@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-5 bg-[#07111F]/40 backdrop-blur-md rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-crimson">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-white text-sm mb-1">Orari i Punës</p>
                    <p className="text-white/50 text-xs leading-relaxed">Hënë – Premte: 08:00 – 17:00</p>
                  </div>
                </div>
              </div>
            </AnimateOnView>
          </div>

          {/* Right Column: Interactive Google Map via Proxy */}
          <AnimateOnView direction="left" className="h-full">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 h-[450px] lg:h-full min-h-[400px] relative group">
              <MapView
                className="w-full h-full"
                initialCenter={mapCenter}
                initialZoom={15}
                onMapReady={handleMapReady}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#04090F] to-transparent h-20 pointer-events-none opacity-50" />
            </div>
          </AnimateOnView>
        </div>
      </div>
    </PageTransition>
  );
}
