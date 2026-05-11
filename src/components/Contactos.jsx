import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

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
          // Limpiar los campos del formulario
          setFormData({
            user_name: '',
            user_email: '',
            message: ''
          });
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
        {/* Sección de redes sociales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center transform hover:-translate-y-1">
            <a href="https://wa.me/593986819378" target="_blank" rel="noopener noreferrer" className="block">
              <div className="bg-green-100 p-3 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
              <p className="text-gray-600">+593 98 681 9378</p>
              <p className="text-blue-600 font-medium mt-2">Chat directo</p>
            </a>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center transform hover:-translate-y-1">
            <div className="bg-blue-100 p-3 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Correo Electrónico</h3>
            <p className="text-gray-600">info@cafanet.com</p>
            <p className="text-blue-600 font-medium mt-2">Respuesta en 24h</p>
          </div>

          {/* Dirección */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center transform hover:-translate-y-1">
            <div className="bg-purple-100 p-3 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Visítanos</h3>
            <p className="text-gray-600">Av. Principal 123</p>
            <p className="text-blue-600 font-medium mt-2">San Juan, Ecuador</p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Contáctanos</h2>
            <p className="mb-6 text-gray-300 text-lg">
              ¿Tienes alguna pregunta o necesitas asistencia? Nuestro equipo está listo para ayudarte.
              Completa el formulario o contáctanos directamente a través de los medios proporcionados.
            </p>

            {/* Imagen añadida aquí */}
            <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Equipo de soporte"
                className="w-full h-auto object-cover"
              />
              <div className="bg-blue-600 text-white p-4 text-center">
                <p className="font-medium">Horario de atención: Lunes a Viernes 8:00 - 17:00</p>
              </div>
            </div>

            <div className="bg-gray-700 bg-opacity-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">¿Por qué elegirnos?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Soporte técnico 24/7</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Respuesta rápida</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Soluciones personalizadas</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
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
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-4 rounded-lg font-semibold transition duration-300 flex justify-center items-center shadow-md hover:shadow-lg`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>

              {/* Mensajes de éxito/error */}
              {successMessage && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center animate-fade-in">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center animate-fade-in">
                  {errorMessage}
                </div>
              )}

              {/* Nueva sección descriptiva */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">¿Qué pasa después de enviar tu mensaje?</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Recibirás un correo de confirmación automático</li>
                  <li>Nuestro equipo revisará tu solicitud en menos de 24 horas</li>
                  <li>Te contactaremos por el medio que nos hayas indicado</li>
                </ol>
                <p className="mt-3 text-sm text-gray-500">
                  Todos tus datos están protegidos bajo nuestra política de privacidad.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactos;