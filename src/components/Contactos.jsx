import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { motion } from 'motion/react';
import { fadeInUp, slideInLeft, slideInRight, stagger, VIEWPORT, SOFT_EASE } from '../utils/motion';

const Contactos = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    emailjs
      .sendForm('service_k7p7i7o', 'template_imqyz6g', form.current, {
        publicKey: 'rSi0tSHMA4K-IaCA8',
      })
      .then(
        () => {
          setLoading(false);
          setSuccessMessage('¡Tu mensaje ha sido enviado correctamente!');
          setFormData({ user_name: '', user_email: '', message: '' });
        },
        (error) => {
          setLoading(false);
          setErrorMessage('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
          console.error('Error al enviar:', error);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0, 0.1)}
          className="text-center mb-10"
        >
          <motion.span variants={fadeInUp} className="inline-block bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
            Cafanet • Una ventana al mundo
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-3">Contáctanos</motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-300 max-w-2xl mx-auto">
            Atención al cliente solo por WhatsApp. Resolvemos tus dudas, te asesoramos en planes y soporte técnico de tu conexión.
          </motion.p>
        </motion.div>

        {/* Tarjetas de contacto rápido */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.1, 0.12)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* WhatsApp */}
          <motion.a
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.4, ease: SOFT_EASE }}
            href="https://wa.me/593990392423?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20Cafanet"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-green-500/20 text-center border border-transparent hover:border-green-200"
          >
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16 2.933C8.805 2.933 2.933 8.805 2.933 16c0 2.537.653 5.013 1.888 7.188L2 30l7.042-2.792A13.002 13.002 0 0016 29.067C23.195 29.067 29.067 23.195 29.067 16S23.195 2.933 16 2.933zm0 24a10.922 10.922 0 01-5.832-1.66l-.417-.25-4.167 1.646 1.563-4.042-.271-.438a10.913 10.913 0 01-1.708-5.729c0-6.012 4.887-10.9 10.9-10.9 6.012 0 10.9 4.888 10.9 10.9s-4.888 10.9-10.9 10.9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Servicio al Cliente</h3>
            <p className="text-gray-600 font-medium">+593 99 039 2423</p>
            <p className="text-green-600 font-semibold mt-2 inline-flex items-center gap-1">
              Chat por WhatsApp
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </p>
            <p className="text-xs text-gray-400 mt-2 italic">Solo atención por WhatsApp</p>
          </motion.a>

          {/* Llamar */}
          <motion.a
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.4, ease: SOFT_EASE }}
            href="tel:+593990392423"
            className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 text-center border border-transparent hover:border-blue-200"
          >
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Llamada Directa</h3>
            <p className="text-gray-600 font-medium">0990392423</p>
            <p className="text-blue-600 font-semibold mt-2 inline-flex items-center gap-1">
              Tocar para llamar
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </p>
            <p className="text-xs text-gray-400 mt-2 italic">Dentro del horario de atención</p>
          </motion.a>

          {/* Oficinas */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.4, ease: SOFT_EASE }}
          >
          <Link
            to="/cobertura"
            className="group block bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 text-center border border-transparent hover:border-purple-200"
          >
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Nuestras Oficinas</h3>
            <p className="text-gray-600 font-medium">8 puntos en Los Ríos</p>
            <p className="text-purple-600 font-semibold mt-2 inline-flex items-center gap-1">
              Ver mapa de cobertura
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </p>
            <p className="text-xs text-gray-400 mt-2 italic">Ventanas, Babahoyo, San Juan…</p>
          </Link>
          </motion.div>

          {/* Correo electrónico */}
          <motion.a
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.4, ease: SOFT_EASE }}
            href="mailto:info@cafanet.com"
            className="group bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 text-center border border-transparent hover:border-amber-200"
          >
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-3 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Correo Electrónico</h3>
            <p className="text-gray-600 font-medium break-all">info@cafanet.com</p>
            <p className="text-amber-600 font-semibold mt-2 inline-flex items-center gap-1">
              Escríbenos un email
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </p>
            <p className="text-xs text-gray-400 mt-2 italic">Respuesta en menos de 24 h</p>
          </motion.a>
        </motion.div>

        {/* Llamada directa por oficina */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0.05, 0.08)}
          className="mb-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-2xl shadow-lg flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Opción · Llamada directa</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Llama a tu oficina más cercana</h2>
              <p className="text-gray-300 text-sm mt-1">Atención directa por línea telefónica en cada localidad.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { oficina: 'San Juan',     telefono: '0982500314' },
              { oficina: 'Pueblo Viejo', telefono: '0989801497' },
              { oficina: 'La Unión',     telefono: '0983165577' },
              { oficina: 'Babahoyo',     telefono: '0959515466' },
              { oficina: 'Baba',         telefono: '0939377791' },
              { oficina: 'Urdaneta',     telefono: '0994893578' }
            ].map((item, i) => (
              <motion.a
                key={item.oficina}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3, ease: SOFT_EASE }}
                href={`tel:+593${item.telefono.replace(/^0/, '')}`}
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-blue-400/40 rounded-2xl px-4 py-3.5 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-blue-200/80 font-semibold">Oficina {String(i + 1).padStart(2, '0')}</p>
                  <p className="font-bold text-white truncate">{item.oficina}</p>
                  <p className="text-sm text-gray-300 font-mono tracking-wider">{item.telefono}</p>
                </div>
                <svg className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideInLeft}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                Estamos para ayudarte
              </span>
            </h2>
            <p className="mb-6 text-gray-300 text-lg">
              ¿Tienes alguna pregunta o necesitas asistencia? Nuestro equipo de servicio al cliente atiende por WhatsApp en el siguiente horario.
            </p>

            {/* Horario */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-7 border border-blue-500/30 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex items-center mb-5">
                  <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Horario de atención</h3>
                    <p className="text-white/70 text-sm">Servicio al cliente — Cafanet</p>
                  </div>
                </div>
                <ul className="text-white/95 space-y-2.5">
                  <li className="flex justify-between items-center bg-white/10 rounded-lg px-3 py-2.5 hover:bg-white/15 transition">
                    <span className="font-medium">Lunes a Viernes</span>
                    <span className="font-bold bg-white/20 px-3 py-1 rounded-full text-sm">8:00 – 18:00</span>
                  </li>
                  <li className="flex justify-between items-center bg-white/10 rounded-lg px-3 py-2.5 hover:bg-white/15 transition">
                    <span className="font-medium">Domingo</span>
                    <span className="font-bold bg-white/20 px-3 py-1 rounded-full text-sm">8:30 – 12:30</span>
                  </li>
                </ul>
                <div className="mt-4 flex items-start gap-2 bg-white/5 rounded-lg p-3 border border-white/10">
                  <svg className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-white/80">
                    Atención exclusiva por WhatsApp al <span className="font-bold text-white">0990392423</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Beneficios */}
            <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl border border-white/5">
              <h3 className="text-xl font-semibold mb-3">¿Por qué elegirnos?</h3>
              <ul className="space-y-2">
                {[
                  'Soporte técnico especializado',
                  'Respuesta rápida por WhatsApp',
                  'Soluciones personalizadas',
                  '8 oficinas en Los Ríos'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={slideInRight}
            className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Envíanos un mensaje</h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              <div>
                <label htmlFor="user_name" className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]'} text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex justify-center items-center shadow-md hover:shadow-lg active:scale-[0.99]`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>

              {successMessage && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center animate-fade-in-up">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center animate-fade-in-up">
                  {errorMessage}
                </div>
              )}

              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ¿Qué pasa después de enviar tu mensaje?
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Recibirás un correo de confirmación automático</li>
                  <li>Nuestro equipo revisará tu solicitud en menos de 24 horas</li>
                  <li>Te contactaremos por el medio que nos hayas indicado</li>
                </ol>
                <p className="mt-3 text-sm text-gray-500">
                  ¿Prefieres una respuesta inmediata? Escríbenos al WhatsApp <span className="font-semibold text-blue-700">0990392423</span>.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contactos;
