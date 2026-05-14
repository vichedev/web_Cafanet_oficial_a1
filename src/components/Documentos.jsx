import { motion } from 'motion/react';
import documentosData from '../data/documents';
import { fadeInUp, stagger, VIEWPORT, SOFT_EASE } from '../utils/motion';

// Mapeo estático de tonos por categoría (Tailwind necesita clases literales)
const toneMap = {
  blue:   { badge: 'bg-blue-100 text-blue-700',     ring: 'hover:border-blue-300',   glow: 'hover:shadow-blue-500/20'  },
  green:  { badge: 'bg-green-100 text-green-700',   ring: 'hover:border-green-300',  glow: 'hover:shadow-green-500/20' },
  amber:  { badge: 'bg-amber-100 text-amber-700',   ring: 'hover:border-amber-300',  glow: 'hover:shadow-amber-500/20' },
  purple: { badge: 'bg-purple-100 text-purple-700', ring: 'hover:border-purple-300', glow: 'hover:shadow-purple-500/20' },
  red:    { badge: 'bg-red-100 text-red-700',       ring: 'hover:border-red-300',    glow: 'hover:shadow-red-500/20'   }
};

function Documentos() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800 flex flex-col items-center py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0, 0.1)}
        className="text-center mb-12"
      >
        <motion.span
          variants={fadeInUp}
          className="inline-block bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4"
        >
          Cafanet • Documentación oficial
        </motion.span>
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-3"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200 text-shimmer">
            Documentos
          </span>
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4">
          Aquí encontrarás todos los documentos legales, operativos y políticos de Cafanet. Haz clic en cualquiera para verlo o descargarlo.
        </motion.p>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.1, 0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {documentosData.map(doc => {
            const t = toneMap[doc.tone] || toneMap.blue;
            return (
              <motion.div
                key={doc.id}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4, ease: SOFT_EASE }}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent ${t.ring} hover:shadow-2xl ${t.glow} flex flex-col`}
              >
                <div className="relative bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden">
                  <img
                    src={doc.imageUrl}
                    alt={doc.title}
                    loading="lazy"
                    className="w-full h-44 object-contain p-4 transition-transform duration-500 hover:scale-110"
                  />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${t.badge}`}>
                    {doc.category}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-gray-400">
                    #{String(doc.id).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 leading-tight line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm flex-grow line-clamp-3">
                    {doc.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.3, ease: SOFT_EASE }}
                      href={doc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow-md text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.3, ease: SOFT_EASE }}
                      href={doc.pdfUrl}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-sm hover:shadow-md text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Descargar
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default Documentos;
