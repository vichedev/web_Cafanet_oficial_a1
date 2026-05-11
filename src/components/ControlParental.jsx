import { useState } from 'react';

const ControlParental = () => {
  const [activeApp, setActiveApp] = useState(null);

  // Datos de las apps de control parental
  const apps = [
    {
      name: "Norton Family",
      description: "Supervisa y administra el tiempo de pantalla, bloquea contenido inapropiado y rastrea ubicaciones.",
      android: "https://play.google.com/store/apps/details?id=com.symantec.familypremier",
      ios: "https://apps.apple.com/us/app/norton-family-parental-control/id482896221",
      pc: "https://family.norton.com/web/",
      logo: "/img/Parental/norton.png"
    },
    {
      name: "Qustodio (Parental Control)",
      description: "Filtra contenido, limita tiempo de uso, monitorea redes sociales y rastrea ubicación.",
      android: "https://play.google.com/store/apps/details?id=com.qustodio.qustodioapp",
      ios: "https://apps.apple.com/us/app/qustodio-best-parental-control/id802101371",
      pc: "https://www.qustodio.com/",
      logo: "/img/Parental/qustodio.jpg"
    },
    {
      name: "Google Family Link",
      description: "Administra aplicaciones, supervisa tiempo de uso y establece límites de pantalla.",
      android: "https://play.google.com/store/apps/details?id=com.google.android.apps.kids.familylink",
      ios: "https://apps.apple.com/us/app/family-link-for-parents/id1415818207",
      pc: "https://families.google.com/familylink/",
      logo: "/img/Parental/Gfamily.png"
    },
    {
      name: "Kids Guard (Pro-Vigilancia)",
      description: "Monitoreo avanzado de actividades, mensajes, llamadas y ubicación en tiempo real.",
      android: "https://play.google.com/store/apps/details?id=com.kidsguard.pro",
      ios: "https://apps.apple.com/us/app/kidsguard-pro-parental-control/id1446486128",
      pc: "https://www.kidsguard.pro/",
      logo: "/img/Parental/KidsGuard.png"
    }
  ];

  // Funcionalidades del control parental
  const features = [
    {
      title: "Filtrado de Contenido",
      description: "Bloquea sitios web y aplicaciones inapropiadas según la edad del niño.",
      icon: "🛡️"
    },
    {
      title: "Límites de Tiempo",
      description: "Establece horarios de uso y límites diarios para cada dispositivo.",
      icon: "⏱️"
    },
    {
      title: "Monitoreo de Actividad",
      description: "Revisa qué aplicaciones usan y cuánto tiempo pasan en cada una.",
      icon: "👀"
    },
    {
      title: "Reportes Detallados",
      description: "Recibe informes semanales con el resumen de la actividad digital.",
      icon: "📊"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              CONTROL PARENTAL
            </span>
          </h1>
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              CONTROL PARENTAL
            </span>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            El control parental es una herramienta que protege a niños y adolescentes al restringir el acceso a contenido inapropiado a través de apps y controlar su uso, juegos y sitios web en sus dispositivos.
          </p>
        </div>

        {/* Sección de descarga */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Descárgalas en <span className="text-blue-600">iOS</span>, <span className="text-green-600">Android</span> o <span className="text-purple-600">PC</span>
          </h2>
          
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              Control Parental
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-center text-gray-800 mb-8">
            APPS de Control Parental
          </h3>

          {/* Grid de aplicaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apps.map((app, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg border ${activeApp === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md`}
                onClick={() => setActiveApp(index)}
              >
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <img src={app.logo} alt={`Logo ${app.name}`} className="w-12 h-12 object-contain mr-3" />
                    <h4 className="font-bold text-gray-800">{app.name}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                </div>
                
                {activeApp === index && (
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 gap-2">
                      <a 
                        href={app.android} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 18a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3zm4.5 0a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1H9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7.5zm4.5 0a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H12zm4.5 0a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1H18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1.5z"/>
                        </svg>
                        Android
                      </a>
                      <a 
                        href={app.ios} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        iOS
                      </a>
                      {app.pc && (
                        <a 
                          href={app.pc} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                          </svg>
                          Versión PC
                        </a>
                      )}
                    </div>
                    <a 
                      href={app.android || app.ios} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block mt-3 text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Da click y conoce más!
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sección de funcionalidades */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            ¿Cómo puedes usar estas Apps?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6 border border-blue-100 hover:border-blue-300 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ControlParental;