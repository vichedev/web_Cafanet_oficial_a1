import { useNavigate } from 'react-router-dom';

const HeroTvCafa = () => {
  const navigate = useNavigate();

  const handleVerPaquetesClick = () => {
    navigate('/planes-tvcafa');
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto a la izquierda */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              <span className="block">Entretenimiento</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
                Sin Límites
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              TVCAFA ofrece la mejor experiencia de televisión con canales premium, contenido bajo demanda y tecnología de última generación.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-3.5 rounded-lg border-2 border-white text-white hover:bg-white hover:text-black font-semibold text-lg transition-all duration-300"
              >
                ← Volver
              </button>
              <button
                onClick={handleVerPaquetesClick}
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Ver Paquetes
                <span className="ml-2">→</span>
              </button>
            </div>

            {/* Canales destacados */}
            <div className="mt-10">
              <h3 className="text-white font-medium mb-4">Canales destacados:</h3>
              <div className="flex flex-wrap gap-3">
                {['HBO', 'ESPN', 'Discovery', 'Fox Sports', 'CNN', 'Nat Geo', 'Disney', 'TNT'].map((channel) => (
                  <div key={channel} className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full text-black font-semibold text-sm shadow-lg">
                    {channel}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Galería interactiva de canales */}
          <div className="w-full h-full min-h-[500px] lg:min-h-[600px] relative">
            {/* Grid principal */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 md:gap-4">

              {/* Celda 1 - Deportes (con efecto hover) */}
              <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-all duration-500">
                <img
                  src="/img/tv/hero/deportes.jpg"
                  alt="Canales de Deportes"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-xl drop-shadow-lg">Deportes</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Celda 2 - Películas (versión con una sola imagen) */}
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute inset-0">
                  <img
                    src="/img/tv/hero/peliculas.jpg"
                    alt="Catálogo de Películas"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-white font-bold text-xl mb-1">Películas</span>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white text-sm">Nuevos estrenos cada semana</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                </div>
              </div>

              {/* Celda 3 - Logo TVCAFA (con efecto brillo) */}
              <div className="bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden relative group">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent p-4 z-10">
                  TVCAFA
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="animate-pulse text-xs text-gray-500 mt-20">Tu mejor entretenimiento</div>
                </div>
              </div>

              {/* Celda 4 - Series (con efecto flip) */}
              <div className="relative group overflow-hidden rounded-2xl shadow-xl perspective-1000">
                <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-700 to-purple-400 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Series</span>
                  </div>
                  <div className="absolute inset-0 backface-hidden bg-gray-900 rotate-y-180 flex items-center justify-center p-4">
                    <div className="text-center">
                      <div className="text-white font-medium mb-2">Más de 30 series</div>
                      <div className="text-purple-300 text-sm">Nuevos episodios cada semana</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Celda 5 - Kids (con efecto zoom y burbujas) */}
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/img/tv/hero/infantil.jpeg"
                  alt="Canales Infantiles"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/30 to-transparent flex items-end justify-center p-4">
                  <span className="text-white font-bold text-xl drop-shadow-lg">Kids</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white/30"
                      style={{
                        width: `${Math.random() * 30 + 10}px`,
                        height: `${Math.random() * 30 + 10}px`,
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        animation: `float ${Math.random() * 5 + 3}s infinite ease-in-out ${Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Celda 6 - Noticias con imagen y efectos mejorados */}
              <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                {/* Imagen de fondo con overlay */}
                <div className="absolute inset-0">
                  <img
                    src="/img/tv/hero/noticias.png"
                    alt="Noticias"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br  to-gray-600/70"></div>
                  <div className="absolute inset-0 bg-[url('/img/tv/news-pattern.png')] bg-[size:200px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                </div>

                {/* Contenido */}
                <div className="relative h-full flex flex-col justify-between p-4">
                  {/* Indicador "En vivo" animado */}
                  <div className="absolute bottom-3 right-3 flex items-center">
                    <div className="relative">
                      <span className="text-white/80 group-hover:text-white text-xs font-medium transition-colors duration-300">
                        EN VIVO
                      </span>
                      <span className="absolute -right-2 -top-1 flex h-2 w-2 group-hover:animate-ping">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </span>
                    </div>
                  </div>

                  {/* Efecto de ondas de noticias al hacer hover */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[1, 2, 3].map((wave) => (
                      <div
                        key={wave}
                        className="absolute border-2 border-white/20 rounded-full"
                        style={{
                          width: `${wave * 100}%`,
                          height: `${wave * 100}%`,
                          top: `-${wave * 25}%`,
                          left: `-${wave * 25}%`,
                          animation: `pulse ${wave * 3}s infinite linear`,
                          animationDelay: `${wave * 0.5}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animación para las ondas */}
              <style>{`
                @keyframes pulse {
                  0% { transform: scale(0.8); opacity: 0.7; }
                  70% { transform: scale(1.1); opacity: 0.2; }
                  100% { transform: scale(1.2); opacity: 0; }
                }
              `}</style>

              {/* Celda 7 - Info extendida (mejorada) */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-5 md:p-6 col-span-3 row-span-1 flex items-center border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full">
                  <div className="flex-shrink-0 bg-gradient-to-r from-red-500 to-blue-500 p-3 rounded-full transform group-hover:rotate-12 transition-transform duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <h3 className="font-bold text-white text-lg md:text-xl">Más de 50 canales Nacionales</h3>
                    <p className="text-gray-300 text-sm md:text-base mt-1 group-hover:text-white transition-colors duration-300">
                      Disfruta de la mejor programación internacional y nacional en alta definición
                    </p>
                  </div>
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex space-x-2">
                      {['4K', 'HD', 'ES', 'EN'].map((tag) => (
                        <span key={tag} className="bg-white/10 text-white text-xs px-2 py-1 rounded-full border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estilos CSS para las animaciones */}
          <style>{`
            @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
           .perspective-1000 {
            perspective: 1000px;
            }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
            }
          .backface-hidden {
          backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>

        </div>
      </div>

      {/* Efecto de pantalla de TV */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-white"></div>
      </div>
    </section>
  );
};

export default HeroTvCafa;