import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { fadeInUp, fadeInScale, stagger, VIEWPORT, SOFT_EASE } from '../utils/motion';

const PaginaDocumento = ({
  eyebrow,
  title,
  description,
  documentoUrl = null,
  highlights = []
}) => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16 md:py-24 overflow-hidden">
      {/* Blobs decorativos */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="mb-8 text-sm text-gray-500 flex items-center gap-2"
        >
          <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium">{title}</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.1, 0.1)}
          className="text-center mb-12"
        >
          {eyebrow && (
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 text-shimmer">
              {title}
            </span>
          </motion.h1>
          {description && (
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* Card principal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInScale}
          className="relative bg-white rounded-3xl shadow-2xl shadow-blue-200/30 border border-blue-100 overflow-hidden"
        >
          {documentoUrl ? (
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-lg shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="font-semibold text-gray-800">{title}</h2>
                </div>
                <div className="flex gap-2">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, ease: SOFT_EASE }}
                    href={documentoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Abrir
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, ease: SOFT_EASE }}
                    href={documentoUrl}
                    download
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar
                  </motion.a>
                </div>
              </div>
              <iframe
                src={documentoUrl}
                title={title}
                className="w-full h-[70vh] bg-gray-50"
              ></iframe>
            </div>
          ) : (
            <div className="p-10 md:p-16 text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                className="relative inline-block mb-6"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="absolute -top-2 -right-2 inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-amber-200">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  En proceso
                </span>
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Documento próximamente disponible
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto mb-8">
                Estamos preparando este documento para que esté disponible en el menor tiempo posible. Mientras tanto, si necesitas la información puedes contactarnos directamente.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: SOFT_EASE }}
                  href="https://wa.me/593990392423?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20Cafanet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M16 2.933C8.805 2.933 2.933 8.805 2.933 16c0 2.537.653 5.013 1.888 7.188L2 30l7.042-2.792A13.002 13.002 0 0016 29.067C23.195 29.067 29.067 23.195 29.067 16S23.195 2.933 16 2.933z" />
                  </svg>
                  Solicitar por WhatsApp
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3, ease: SOFT_EASE }}>
                  <Link
                    to="/contactos"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 font-semibold px-6 py-3 rounded-xl"
                  >
                    Ir a Contacto
                    <span>→</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.1, 0.08)}
            className="mt-12"
          >
            <motion.h3 variants={fadeInUp} className="text-xl font-bold text-gray-900 mb-4 text-center">
              ¿Qué encontrarás en este documento?
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: SOFT_EASE }}
                  className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-200/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed pt-1">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Volver */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: SOFT_EASE }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver atrás
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default PaginaDocumento;
