import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef, useEffect } from 'react';

// Componente para centrar el mapa al hacer clic en una ubicación
function CenterMap({ cobertura, activeLocation }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeLocation) {
      const location = cobertura.find(loc => loc.nombre === activeLocation);
      if (location) {
        map.flyTo([location.lat, location.lng], 13, {
          duration: 1
        });
      }
    }
  }, [activeLocation, cobertura, map]);

  return null;
}

// Configuración de iconos personalizados para el mapa
const createCustomIcon = (color = 'red') => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="${color}" fill="${color}" stroke-width="2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

// Ubicaciones de cobertura con coordenadas precisas y contactos
const cobertura = [
  { 
    nombre: "Pueblo Viejo", 
    lat: -1.549184881516172, 
    lng: -79.53183102174286,
    contacto: "Juan Pérez",
    telefono: "0991234567",
    direccion: "Av. Principal #123",
    whatsapp: "593991234567"
  },
  { 
    nombre: "San Juan", 
    lat: -1.6277118646117377, 
    lng: -79.56112179141901,
    contacto: "María Gómez",
    telefono: "0987654321",
    direccion: "Calle 10 de Agosto",
    whatsapp: "593987654321"
  },
  { 
    nombre: "Babahoyo", 
    lat: -1.8024, 
    lng: -79.5348,
    contacto: "Carlos Rodríguez",
    telefono: "0976543210",
    direccion: "Malecón de Babahoyo",
    whatsapp: "593976543210"
  },
  { 
    nombre: "La Unión", 
    lat: -1.70571, 
    lng: -79.39154,
    contacto: "Luisa Martínez",
    telefono: "0965432109",
    direccion: "Calle Principal",
    whatsapp: "593965432109"
  },
  { 
    nombre: "Caracol", 
    lat: -1.6705130548054388, 
    lng: -79.46215809049055,
    contacto: "Pedro Sánchez",
    telefono: "0954321098",
    direccion: "Vía a Caracol",
    whatsapp: "593954321098"
  },
  { 
    nombre: "Pimocha", 
    lat: -1.8330326666208572, 
    lng: -79.59897009047452,
    contacto: "Ana López",
    telefono: "0943210987",
    direccion: "Calle Central",
    whatsapp: "593943210987"
  },
  { 
    nombre: "Isla de Bejucal", 
    lat: -1.6770852437414112, 
    lng: -79.64163062448694,
    contacto: "José Ramírez",
    telefono: "0932109876",
    direccion: "Vía Principal",
    whatsapp: "593932109876"
  },
  { 
    nombre: "Baba", 
    lat: -1.7820190164596605, 
    lng: -79.68057629438157,
    contacto: "Sofía Torres",
    telefono: "0921098765",
    direccion: "Av. Central #456",
    whatsapp: "593921098765"
  }
];

const PlanesTvCafa = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const mapRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLocationClick = (nombre) => {
    setActiveLocation(nombre === activeLocation ? null : nombre);
  };

  const filteredLocations = cobertura.filter(loc => 
    loc.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.contacto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Modal para imagen ampliada */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-red-500 z-50"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <img 
              src="/img/tv/tvplan.jpeg" 
              alt="Familia disfrutando TV - Vista ampliada" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Sección de planes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
              Planes TVCAFA
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Entretenimiento para toda la familia al mejor precio
          </p>
        </div>

        {/* Plan Básico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-r from-red-600/20 to-blue-600/20 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-4">Plan Básico</h2>
              <div className="mb-6">
                <span className="text-5xl font-bold">$20</span>
                <span className="text-gray-300 ml-2">/mes</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>65 canales nacionales</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Impuestos incluidos</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Calidad HD</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Guía de programación</span>
                </li>
              </ul>
              
              <button className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Contratar ahora
              </button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 cursor-pointer" onClick={openModal}>
            <div className="relative group">
              <img 
                src="/img/tv/tvplan.jpeg" 
                alt="Familia disfrutando TV" 
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white/20 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black bg-opacity-50 p-3 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-2">Haz clic para ampliar</p>
          </div>
        </div>

        {/* Mapa de cobertura */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
              Cobertura TVCAFA
            </span>
          </h2>
          
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
            {/* Buscador y toggle de modo oscuro */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Buscar localidad o contacto..."
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg py-2 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value) {
                      const found = cobertura.find(loc => 
                        loc.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        loc.contacto.toLowerCase().includes(e.target.value.toLowerCase())
                      );
                      if (found) setActiveLocation(found.nombre);
                    }
                  }}
                />
                <svg className="absolute right-3 top-2.5 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center justify-center sm:justify-start gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {darkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  )}
                </svg>
                <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
              </button>
            </div>

            <div className="h-96 w-full rounded-xl overflow-hidden mb-4 relative">
              <MapContainer
                center={[-1.70571, -79.39154]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
                ref={mapRef}
              >
                <TileLayer
                  url={darkMode ? 
                    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  }
                  attribution={darkMode ? 
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' : 
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  }
                />
                
                {filteredLocations.map((loc, index) => (
                  <Marker 
                    key={index} 
                    position={[loc.lat, loc.lng]} 
                    icon={createCustomIcon(loc.nombre === activeLocation ? '#3B82F6' : '#EF4444')}
                    eventHandlers={{
                      click: () => setActiveLocation(loc.nombre)
                    }}
                  >
                    <Popup>
                      <div className="text-gray-800 min-w-[220px]">
                        <div className="flex items-center mb-2">
                          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <h3 className="font-bold text-lg">{loc.nombre}</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <span>{loc.contacto}</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <a href={`tel:${loc.telefono}`} className="text-blue-600 hover:text-blue-800">{loc.telefono}</a>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66L12 23l8.11-5.41c.53-.36.88-.97.88-1.66L21 3c0-1.1-.9-2-2-2zm-7 19.6l-7-4.66V3h14v12.93l-7 4.67zm-2.01-7.42l-2.58-2.59L6 12l4 4 8-8-1.42-1.42z"/>
                            </svg>
                            <a 
                              href={`https://wa.me/${loc.whatsapp}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800"
                            >
                              WhatsApp: {loc.telefono}
                            </a>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-4 h-4 mt-0.5 mr-2 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{loc.direccion}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                <CenterMap cobertura={cobertura} activeLocation={activeLocation} />
              </MapContainer>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {filteredLocations.map((loc, index) => (
                <div 
                  key={index} 
                  onClick={() => handleLocationClick(loc.nombre)}
                  className={`flex flex-col bg-white/5 px-4 py-3 rounded-lg cursor-pointer transition-all ${loc.nombre === activeLocation ? 'border-2 border-blue-500 bg-blue-500/10' : 'border border-white/10 hover:bg-white/10'}`}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{loc.nombre}</span>
                  </div>
                  {loc.nombre === activeLocation && (
                    <div className="mt-2 text-sm text-gray-300 space-y-1">
                      <p className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {loc.contacto}
                      </p>
                      <p className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <a href={`tel:${loc.telefono}`} className="text-blue-400 hover:text-blue-300">{loc.telefono}</a>
                      </p>
                      <p className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 1H5c-1.1 0-1.99.9-1.99 2L3 15.93c0 .69.35 1.3.88 1.66L12 23l8.11-5.41c.53-.36.88-.97.88-1.66L21 3c0-1.1-.9-2-2-2zm-7 19.6l-7-4.66V3h14v12.93l-7 4.67zm-2.01-7.42l-2.58-2.59L6 12l4 4 8-8-1.42-1.42z"/>
                        </svg>
                        <a 
                          href={`https://wa.me/${loc.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300"
                        >
                          WhatsApp
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botón de volver */}
        <div className="text-center">
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-white/30 rounded-lg text-white hover:bg-white/10 transition duration-300"
          >
            ← Volver
          </button>
        </div>
      </div>

      {/* Estilos para los iconos personalizados */}
      <style>{`
        .custom-icon {
          background: transparent;
          border: none;
        }
        .custom-icon svg {
          filter: drop-shadow(0 0 2px rgba(0,0,0,0.7));
        }
        .leaflet-popup-content {
          margin: 12px !important;
        }
      `}</style>

      
    </section>
  );
};

export default PlanesTvCafa;