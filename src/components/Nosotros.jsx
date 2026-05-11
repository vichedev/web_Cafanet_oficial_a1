import { FaNetworkWired, FaHistory, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa';

const Nosotros = () => {
  return (
    <section className="relative bg-white py-16 sm:py-24 lg:py-32">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="block">Más que un proveedor,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              somos tu aliado tecnológico
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Con más de 20 años de trayectoria, en Cafanet y Smarnet360 transformamos la conectividad de hogares y empresas en Ecuador con tecnología de fibra óptica, atención cercana y soluciones innovadoras.
          </p>
        </div>

        {/* Grid de características con react-icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
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
              title: '2 Marcas',
              description: 'CAFANET y SMARNET360: conectividad, estabilidad y tecnología al alcance.',
              icon: <FaShieldAlt className="w-8 h-8" />,
              color: 'text-orange-500'
            },
          ].map(({ title, description, icon, color }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl group hover:transform hover:-translate-y-1"
            >
              <div className={`${color} mb-4 group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{description}</p>
            </div>
          ))}
        </div>


        {/* Historia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/img/nosotros/nosotros.jpg"
              alt="Equipo Cafanet"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-blue-600/20"></div>
          </div>

          {/* Texto */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Nuestra historia</h3>
            <p className="text-gray-600 mb-4">
              Iniciamos en Ventanas y hoy, tras más de 20 años, llegamos a múltiples cantones de Los Ríos, Cotopaxi y Guayas. Con tecnología de fibra óptica y nuestras marcas <strong>CAFANET</strong> y <strong>SMARNET360</strong>, seguimos conectando hogares ecuatorianos con entretenimiento y conectividad confiable.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
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
            </div>
          </div>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
          <div className="bg-white shadow-md rounded-2xl p-8 border border-blue-100">
            <h4 className="text-xl font-bold text-blue-700 mb-4">Misión</h4>
            <p className="text-gray-700">
              Brindar servicios de televisión e internet de alta calidad, a través de tecnología de fibra óptica, con una señal estable, imagen nítida, sonido envolvente y conexión veloz, pensados para el entretenimiento, trabajo y estudio de todos nuestros clientes. Nos esforzamos por innovar continuamente y ofrecer una atención cercana y personalizada.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-2xl p-8 border border-blue-100">
            <h4 className="text-xl font-bold text-blue-700 mb-4">Visión</h4>
            <p className="text-gray-700">
              Ser líderes en servicios de telecomunicaciones, conectando cada vez más hogares con televisión e internet confiables, accesibles y de calidad. Queremos ser la ventana al mundo digital y de entretenimiento para las familias ecuatorianas, aportando al desarrollo y bienestar de nuestras comunidades.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            ¿Listo para transformar tu conectividad?
          </h3>
          <a
            href="https://wa.me/593986819378"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Habla con un especialista
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Nosotros;
