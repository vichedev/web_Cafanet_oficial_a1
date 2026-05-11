import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleCafanetClick = () => {
    navigate('/planes-cafanet');
  };

  const handleTvCafaClick = () => {
    navigate('/tv-cafa');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/fondo3.jpg"
          alt="Fondo Cafanet"
          className="w-full h-full object-cover brightness-75"
        />
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:px-10 lg:px-10 flex flex-col lg:flex-row items-center gap-10">

        {/* Contenedor de texto a la izquierda */}
        <div className="text-white max-w-2xl flex flex-col gap-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            <span className="block">Conectividad</span>
            <span className="block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              Empresarial Inteligente
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-lg">
            Cafanet redefine la experiencia digital con soluciones de red adaptativas, seguridad proactiva y ancho de banda escalable para el crecimiento de tu negocio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCafanetClick}
              className="px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Planes de Internet Cafanet →
            </button>
            <button
              onClick={handleTvCafaClick}
              className="relative px-8 py-3.5 rounded-lg border-2 font-semibold text-lg 
            bg-white text-gray-800 border-x-4 border-t-4 border-b-8
            border-t-red-500 border-b-blue-500 border-l-red-500 border-r-blue-500
            hover:bg-gray-100 hover:shadow-xl transition-all duration-300 
            transform hover:scale-105 shadow-xl group overflow-visible"
            >
              {/* Texto del botón */}
              TVCAFA

              {/* Burbuja de diálogo creativa */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                 opacity-0 group-hover:opacity-100 transition-all duration-300 
                 pointer-events-none w-max max-w-xs">
                <div className="relative bg-white border-2 border-blue-400 rounded-lg px-3 py-2 
                   shadow-lg text-sm text-gray-700 font-medium animate-bounce">
                  <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-white border-b-2 
                     border-r-2 border-blue-400 transform -translate-x-1/2 rotate-45">
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Te redirigirá a la web de TVCAFA
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Badges */}
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center bg-white/90 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-800">Servicio de calidad</span>
            </div>
            <div className="flex items-center bg-white/90 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-800">Seguridad garantizada</span>
            </div>
          </div>
        </div>

        {/* Imagen / Logo destacado */}
        <div className="relative w-full max-w-lg">
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-xl p-6">
            <img
              src="/img/cafanet.png"
              alt="Cafanet Logo"
              className="w-full h-auto object-contain scale-125"
            />
          </div>

          {/* Cartas en modo desktop */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-8 hidden">
            {[{ icon: '⚡', label: 'Alta Velocidad' }, { icon: '🛡️', label: 'Firewall Avanzado' }, { icon: '📶', label: 'Cobertura Total' }, { icon: '🌐', label: 'Red Inteligente' }, { icon: '💵', label: 'Precios Comodos' }, { icon: '📡', label: 'Señal Estable' }].map((card, i) => (
              <div key={i} className="bg-white/90 text-gray-800 rounded-xl shadow-md p-4 text-center flex flex-col items-center justify-center text-sm font-semibold hover:shadow-xl transition-all">
                <div className="text-2xl mb-2">{card.icon}</div>
                {card.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
