import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { fadeInUp, fadeInUpSmall, stagger, SOFT_EASE } from '../utils/motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/fondo3.jpg"
          alt="Fondo Cafanet"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:px-10 lg:px-10 flex flex-col lg:flex-row items-center gap-10">

        {/* Texto */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.15, 0.12)}
          className="text-white max-w-2xl flex flex-col gap-6"
        >
          <motion.span
            variants={fadeInUpSmall}
            className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full w-fit"
          >
            Cafanet • Una ventana al mundo
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-2 drop-shadow-lg"
          >
            <span className="block">Conectividad</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-blue-400 text-shimmer">
              Empresarial Inteligente
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl sm:text-2xl text-white/90 mb-4 max-w-lg">
            Cafanet redefine la experiencia digital con soluciones de red adaptativas, seguridad proactiva y ancho de banda escalable para el crecimiento de tu negocio.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={() => navigate('/planes-cafanet')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: SOFT_EASE }}
              className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg shadow-xl flex items-center justify-center overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Planes de Internet
                <span className="ml-2 transition-transform duration-500 group-hover:translate-x-1.5">→</span>
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
            </motion.button>
            <motion.button
              onClick={() => navigate('/tips')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: SOFT_EASE }}
              className="group px-8 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white font-semibold text-lg shadow-xl flex items-center justify-center"
            >
              Tips & Consejos
              <svg className="w-5 h-5 ml-2 transition-transform duration-500 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Badges */}
          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3, ease: SOFT_EASE }}
              className="flex items-center bg-white/90 px-4 py-2 rounded-full shadow-md backdrop-blur-sm hover:shadow-xl hover:shadow-green-200/40"
            >
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-800">Servicio de calidad</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3, ease: SOFT_EASE }}
              className="flex items-center bg-white/90 px-4 py-2 rounded-full shadow-md backdrop-blur-sm hover:shadow-xl hover:shadow-blue-200/40"
            >
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-800">Seguridad garantizada</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Logo destacado + cartas */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.4, 0.1)}
          className="relative w-full max-w-lg"
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl p-6 hover:bg-white/15 transition-all duration-500"
          >
            <img
              src="/img/cafanet.png"
              alt="Cafanet Logo"
              className="w-full h-auto object-contain scale-125"
            />
          </motion.div>

          {/* Cartas en modo desktop */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-8 hidden">
            {[
              { icon: '⚡',   label: 'Alta Velocidad' },
              { icon: '🛡️', label: 'Firewall Avanzado' },
              { icon: '📶',  label: 'Cobertura Total' },
              { icon: '🌐',  label: 'Red Inteligente' },
              { icon: '💵',  label: 'Precios Cómodos' },
              { icon: '📡',  label: 'Señal Estable' }
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4, ease: SOFT_EASE }}
                className="bg-white/90 text-gray-800 rounded-xl shadow-md p-4 text-center flex flex-col items-center justify-center text-sm font-semibold hover:shadow-xl hover:shadow-blue-200/40"
              >
                <div className="text-2xl mb-2">{card.icon}</div>
                {card.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
