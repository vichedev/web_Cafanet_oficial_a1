import { FaNetworkWired, FaHistory, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'motion/react';
import { fadeInUp, stagger, slideInLeft, slideInRight, VIEWPORT, SOFT_EASE } from '../utils/motion';

const stats = [
  {
    title: '2000s',
    description: 'Iniciamos en Ventanas con visión de conectar hogares ecuatorianos.',
    icon: <FaNetworkWired className="w-8 h-8" />,
    color: 'text-blue-500'
  },
  {
    title: '20+ años',
    description: 'De experiencia brindando conectividad confiable y entretenimiento.',
    icon: <FaHistory className="w-8 h-8" />,
    color: 'text-purple-500'
  },
  {
    title: '3 Provincias',
    description: 'Presencia en Los Ríos, Cotopaxi y Guayas con cobertura en múltiples cantones.',
    icon: <FaMapMarkedAlt className="w-8 h-8" />,
    color: 'text-green-500'
  },
  {
    title: 'Fibra Óptica',
    description: 'Conectividad, estabilidad y tecnología de última generación al alcance de tu hogar.',
    icon: <FaShieldAlt className="w-8 h-8" />,
    color: 'text-orange-500'
  }
];

const Nosotros = () => {
  return (
    <section className="relative bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0, 0.1)}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            <span className="block">Más que un proveedor,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-shimmer">
              somos tu aliado tecnológico
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Con más de 20 años de trayectoria, en Cafanet transformamos la conectividad de hogares y empresas en Ecuador con tecnología de fibra óptica, atención cercana y soluciones innovadoras.
          </motion.p>
        </motion.div>

        {/* Grid de stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.1, 0.12)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map(({ title, description, icon, color }, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ duration: 0.4, ease: SOFT_EASE }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-200/30 group"
            >
              <div className={`${color} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                {icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Historia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideInLeft}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="/img/nosotros/nosotros.jpg"
              alt="Equipo Cafanet"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-blue-600/20"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.1, 0.1)}
          >
            <motion.h3 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Nuestra historia
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-gray-600 mb-4">
              Iniciamos en Ventanas y hoy, tras más de 20 años, llegamos a múltiples cantones de Los Ríos, Cotopaxi y Guayas. Con tecnología de fibra óptica, en <strong>CAFANET</strong> seguimos conectando hogares ecuatorianos con entretenimiento y conectividad confiable.
            </motion.p>
            <motion.div variants={fadeInUp} className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Innovación constante</h4>
                  <p className="text-gray-600 text-sm">
                    Invertimos continuamente en tecnología e infraestructura para asegurar un servicio estable y moderno.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Documento de historia */}
            <motion.a
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: SOFT_EASE }}
              href="/Docu_Historia/HISTORIA CAFANET.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/30"
            >
              <div className="flex-shrink-0 bg-white/15 backdrop-blur-sm border border-white/20 p-2 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-white/70">Documento oficial</span>
                <span className="block">Conoce la historia de Cafanet</span>
              </div>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Misión y Visión */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0, 0.15)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20"
        >
          <motion.div
            variants={slideInLeft}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: SOFT_EASE }}
            className="group relative bg-white shadow-md rounded-2xl p-8 border border-blue-100 hover:border-blue-300 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-12 translate-x-12 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2.5 rounded-lg mr-3 shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-blue-700">Misión</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Proporcionar un servicio de internet garantizando una conexión de alta velocidad y máxima estabilidad, permitiendo a nuestros clientes una navegación sin límites para el trabajo, estudio y el entretenimiento digital. Nos comprometemos a innovar constantemente expandiendo nuestra cobertura con la mejor tecnología y una atención personalizada.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={slideInRight}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: SOFT_EASE }}
            className="group relative bg-white shadow-md rounded-2xl p-8 border border-blue-100 hover:border-blue-300 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-12 translate-x-12 opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2.5 rounded-lg mr-3 shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-blue-700">Visión</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ser el proveedor de servicios de internet más confiable, veloz y accesible, ofreciendo una ventana al mundo digital, que permita a las personas, empresas y comunidades comunicarse, crecer e innovar sin límites; facilitando el acceso a un futuro interconectado, donde la tecnología sea una herramienta clave para el progreso de las familias ecuatorianas.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            ¿Listo para transformar tu conectividad?
          </h3>
          <motion.a
            href="https://wa.me/593990392423"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: SOFT_EASE }}
            className="group relative px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 inline-flex items-center overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Habla con un especialista
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Nosotros;
