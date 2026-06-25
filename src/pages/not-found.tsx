import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-9xl font-serif font-bold text-gray-100 mb-4 select-none leading-none">404</div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Faqja nuk u gjet</h1>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
            Faqja që kërkuat nuk ekziston ose është zhvendosur.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.04 }}
                className="flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors"
              >
                <Home size={16} />
                Kryefaqja
              </motion.button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:border-gray-400 transition-colors"
            >
              <ArrowLeft size={16} />
              Mbrapa
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
