import { motion } from 'motion/react';
import { fadeInUp, fadeInScale, stagger, VIEWPORT, SOFT_EASE } from '../utils/motion';

const TipCard = ({ icon, title, description, index, accent = 'red' }) => {
  const accentClasses = {
    red: 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-200',
    purple: 'bg-gradient-to-br from-purple-600 to-purple-700 shadow-purple-200',
    blue: 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-blue-200'
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.4, ease: SOFT_EASE }}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl hover:shadow-blue-200/40 overflow-hidden border border-gray-100 hover:border-blue-200"
    >
      <div className="flex items-start gap-4 p-6">
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${accentClasses[accent]} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1.5 group-hover:text-blue-700 transition-colors duration-500">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      <span className="absolute top-3 right-3 text-xs font-bold text-gray-300 group-hover:text-blue-300 transition-colors duration-500">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></div>
    </motion.div>
  );
};

const SectionHeader = ({ eyebrow, title, subtitle, icon }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT}
    variants={fadeInUp}
    className="flex items-center gap-4 mb-8"
  >
    <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-2xl shadow-lg">
      {icon}
    </div>
    <div>
      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{eyebrow}</span>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600 text-sm md:text-base">{subtitle}</p>
    </div>
  </motion.div>
);

const Tips = () => {
  // Tips para mantener la red estable
  const tipsRed = [
    {
      title: 'No tocar el botón Reset/WPS/WiFi',
      description:
        'Se eliminan las configuraciones como nombre de red, contraseñas, WiFi y todas las seguridades del equipo.',
      accent: 'red',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'No manipular el software del equipo',
      description:
        'Es ilegal, recae en piratería. Implica violación de los acuerdos de licencia; evita problemas legales.',
      accent: 'purple',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: 'Reinicia semanalmente tu equipo',
      description:
        'Desenchúfalo y espera de 50 a 60 segundos. Enchúfalo nuevamente y espera unos minutos hasta que la luz verde se estabilice.',
      accent: 'red',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Usa repetidores de señal',
      description:
        'Para cubrir áreas con señal débil dentro de tu hogar o negocio, los repetidores extienden el alcance de la red.',
      accent: 'purple',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
      )
    },
    {
      title: 'Adapta un Set-Top-Box',
      description:
        'Para disfrutar del internet en un televisor que no es Android, un Set-Top-Box convierte cualquier TV en Smart.',
      accent: 'red',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      )
    }
  ];

  // 6 Tips para cuidar el equipo
  const tipsEquipo = [
    {
      title: 'Aleja el equipo de electrodomésticos',
      description: 'Mantenlo alejado de microondas, teléfonos inalámbricos y otros aparatos para evitar interferencias.',
      accent: 'purple',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      )
    },
    {
      title: 'Ubícalo en una superficie ventilada',
      description: 'En lugar plano, alto, central y ventilado para evitar sobrecalentamiento y mejorar la cobertura WiFi.',
      accent: 'red',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 01-2 2M5 12a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    {
      title: 'Conexión directa al tomacorriente',
      description: 'Conecta el equipo directo al tomacorriente o a un UPS. No uses regletas, pueden generar picos.',
      accent: 'purple',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Reinicio semanal del equipo',
      description: 'Una vez por semana desconecta el equipo, espera 50–60 segundos y vuelve a conectar hasta que la luz verde sea constante.',
      accent: 'red',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: 'Cambia la contraseña periódicamente',
      description: 'Cuando hayas tenido muchas visitas. Mínimo 8 caracteres combinando mayúsculas, minúsculas, números y símbolos.',
      accent: 'purple',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: 'Limpia las rejillas del equipo',
      description: 'Ocasionalmente, con un cepillo pequeño y un paño suave. Evita tocar las instalaciones internas del equipo.',
      accent: 'red',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-blue-50 min-h-screen py-16 md:py-24 overflow-hidden">
      {/* Blobs decorativos */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0, 0.1)}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4"
          >
            Cafanet • Una ventana al mundo
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 text-shimmer">
              Tips & Consejos
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende a sacar el máximo provecho de tu conexión Cafanet, mantén tu red estable y cuida tu equipo para evitar pérdida de señal.
          </motion.p>
        </motion.div>

        {/* Sección 1: Red estable */}
        <SectionHeader
          eyebrow="Red estable"
          title="Tips para mantener la red estable"
          subtitle="Buenas prácticas para que tu internet funcione siempre al 100%."
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
            </svg>
          }
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.1, 0.12)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20"
        >
          {tipsRed.map((tip, i) => (
            <TipCard key={i} {...tip} index={i} />
          ))}
        </motion.div>

        {/* Sección 2: Cuidar tu equipo */}
        <SectionHeader
          eyebrow="Cuida tu equipo"
          title="6 Tips para evitar pérdida de señal"
          subtitle="Cuida tu router y prolonga su vida útil con estos hábitos sencillos."
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {tipsEquipo.map((tip, i) => (
            <TipCard key={i} {...tip} index={i} />
          ))}
        </motion.div>

        {/* CTA Soporte */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInScale}
          className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"></div>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Soporte 24/7
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                ¿Sigues teniendo problemas?
              </h3>
              <p className="text-white/90 text-lg max-w-2xl">
                Si experimentas problemas persistentes, contáctanos al
                <span className="font-bold text-white"> 099 039 2423 </span>
                y solicita diagnóstico y solución del problema.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="https://wa.me/593990392423?text=Hola%2C%20necesito%20soporte%20t%C3%A9cnico%20con%20mi%20internet%20Cafanet"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: SOFT_EASE }}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-2xl"
              >
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 2.933C8.805 2.933 2.933 8.805 2.933 16c0 2.537.653 5.013 1.888 7.188L2 30l7.042-2.792A13.002 13.002 0 0016 29.067C23.195 29.067 29.067 23.195 29.067 16S23.195 2.933 16 2.933z" />
                </svg>
                Escribir por WhatsApp
              </motion.a>
              <motion.a
                href="tel:+593990392423"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: SOFT_EASE }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar ahora
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tips;
