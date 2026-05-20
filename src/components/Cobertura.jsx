import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { fadeInUp, stagger } from '../utils/motion';
import MapaCobertura from './MapaCobertura';

const Cobertura = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gray-50 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0, 0.1)}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4"
          >
            Cafanet • Cobertura nacional
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 text-shimmer">
              Nuestras Oficinas
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Encuentra la oficina Cafanet más cercana a tu localidad. Estamos presentes en toda la provincia de Los Ríos, desde Ventanas hasta Babahoyo.
          </motion.p>
        </motion.div>

        {/* Mapa de cobertura reutilizable */}
        <MapaCobertura />

        {/* Volver */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver atrás
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cobertura;
