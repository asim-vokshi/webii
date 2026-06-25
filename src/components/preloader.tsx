import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSET_LOGO } from "@/lib/assets";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // 1.8s loading
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      
      // Custom easing for progress
      const ease = 1 - Math.pow(1 - t, 4);
      setProgress(Math.round(ease * 100));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLoading(false), 300);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 bg-[#04090F] z-[9999] flex flex-col items-center justify-center select-none"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          
          <div className="relative flex flex-col items-center text-center max-w-md px-6">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-24 h-24 mb-8 relative"
            >
              <div className="absolute inset-0 bg-crimson/10 rounded-full blur-xl animate-pulse" />
              <img src={ASSET_LOGO} alt="Logo" className="w-full h-full object-contain relative z-10" />
            </motion.div>

            {/* School Name Reveal */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="font-serif font-bold text-2xl text-white tracking-wide mb-2"
            >
              Asim Vokshi
            </motion.h2>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 0.5 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="text-white text-xs uppercase tracking-[0.25em] mb-12 font-semibold"
            >
              Ekselencë Gjuhësore që nga viti 1965
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative mb-4">
              <motion.div 
                className="h-full bg-gradient-to-r from-crimson to-amber-400"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="text-white/40 text-sm font-bold tracking-widest tabular-nums">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
