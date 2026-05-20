import { useState, useRef, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'motion/react';
import { fadeInUp, stagger, VIEWPORT, SOFT_EASE } from '../utils/motion';

export const cobertura = [
  { nombre: 'Ventanas',       provincia: 'Los Ríos', lat: -1.4475, lng: -79.4571, direccion: 'Centro de Ventanas',                            referencia: 'Origen de Cafanet • Cantón Ventanas', whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'Babahoyo',       provincia: 'Los Ríos', lat: -1.8024, lng: -79.5348, direccion: 'Olmedo entre General Barona y 10 de Agosto',   referencia: 'A 2 locales de Avendaño',             whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'Baba - Pimocha', provincia: 'Los Ríos', lat: -1.8330326666208572, lng: -79.59897009047452, direccion: 'Av. Guayaquil',          referencia: 'Junto al complejo Boga',              whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'La Unión',       provincia: 'Los Ríos', lat: -1.70571, lng: -79.39154, direccion: 'Abraham Freire y 9 de Octubre',              referencia: 'Cerca de Agripac',                    whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'Puebloviejo',    provincia: 'Los Ríos', lat: -1.549184881516172, lng: -79.53183102174286, direccion: 'Justino Cornejo y 10 de Agosto', referencia: 'Centro de Puebloviejo',         whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'San Juan',       provincia: 'Los Ríos', lat: -1.6277118646117377, lng: -79.56112179141901, direccion: 'Jaime Roldós y Othón Alava', referencia: 'Frente al parque infantil',       whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'Urdaneta',       provincia: 'Los Ríos', lat: -1.57055556, lng: -79.47111111, direccion: 'Av. Leonidas Icaza',                   referencia: 'Junto a la casa de Lcdo. Cristhian Lara', whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'La Isla',        provincia: 'Los Ríos', lat: -1.6770852437414112, lng: -79.64163062448694, direccion: 'Cdla. 23 de Abril',      referencia: 'Junto al taller Don Jacinto Alava',   whatsapp: '593990392423', telefono: '0990392423' }
];

function CenterMap({ cobertura, activeLocation }) {
  const map = useMap();
  useEffect(() => {
    if (activeLocation) {
      const location = cobertura.find(loc => loc.nombre === activeLocation);
      if (location) {
        map.flyTo([location.lat, location.lng], 14, { duration: 1.1 });
      }
    }
  }, [activeLocation, cobertura, map]);
  return null;
}

function FitAllButton({ cobertura }) {
  const map = useMap();
  const fitAll = () => {
    if (!cobertura.length) return;
    const bounds = L.latLngBounds(cobertura.map(c => [c.lat, c.lng]));
    map.flyToBounds(bounds, { padding: [40, 40], duration: 1 });
  };
  return (
    <button
      onClick={fitAll}
      title="Ver todas las oficinas"
      className="absolute top-3 right-3 z-[400] bg-white/95 hover:bg-white shadow-lg rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105 flex items-center gap-1.5"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
      Ver todas
    </button>
  );
}

const createCustomIcon = (color = '#EF4444', isActive = false) => {
  const size = isActive ? 38 : 28;
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      ${isActive ? `
        <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.18;animation:pulseRing 2.4s cubic-bezier(0.16,1,0.3,1) infinite;"></div>
        <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.28;animation:pulseRing 2.4s cubic-bezier(0.16,1,0.3,1) infinite 1.2s;"></div>
      ` : ''}
      <svg viewBox="0 0 24 24" width="${size}" height="${size}" stroke="white" fill="${color}" stroke-width="2" style="position:relative;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));transition:transform 0.5s cubic-bezier(0.16,1,0.3,1);">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
      </svg>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
};

const MapaCobertura = ({ animated = true }) => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('Todas');
  const mapRef = useRef(null);

  const provincias = useMemo(
    () => ['Todas', ...new Set(cobertura.map(loc => loc.provincia))],
    []
  );

  const filteredLocations = useMemo(
    () =>
      cobertura.filter(loc => {
        const term = searchTerm.toLowerCase().trim();
        const matchTerm =
          !term ||
          loc.nombre.toLowerCase().includes(term) ||
          loc.direccion.toLowerCase().includes(term) ||
          loc.referencia.toLowerCase().includes(term);
        const matchProvincia = selectedProvince === 'Todas' || loc.provincia === selectedProvince;
        return matchTerm && matchProvincia;
      }),
    [searchTerm, selectedProvince]
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProvince('Todas');
    setActiveLocation(null);
  };

  const wrapperMotionProps = animated
    ? { initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT, variants: fadeInUp }
    : {};

  return (
    <>
      <motion.div {...wrapperMotionProps}>
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 text-white p-6 md:p-10 rounded-3xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <span className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Cobertura Cafanet
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Encuentra tu oficina más cercana</h2>
              <p className="text-gray-300 mt-2 max-w-xl">
                Estamos presentes en {cobertura.length} oficinas de la provincia de Los Ríos. Busca por nombre, dirección o referencia.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-center min-w-[110px] hover:bg-white/15 hover:-translate-y-1 transition-all duration-500">
                <div className="text-3xl font-bold text-blue-300 animate-breathe">{cobertura.length}</div>
                <div className="text-xs text-gray-300 uppercase tracking-wider mt-0.5">Oficinas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-center min-w-[110px] hover:bg-white/15 hover:-translate-y-1 transition-all duration-500">
                <div className="text-3xl font-bold text-blue-300 animate-breathe">{provincias.length - 1}</div>
                <div className="text-xs text-gray-300 uppercase tracking-wider mt-0.5">Provincia</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/10 mb-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-grow">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar por localidad, dirección o referencia..."
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    const term = e.target.value.toLowerCase().trim();
                    if (term) {
                      const found = cobertura.find(
                        loc =>
                          loc.nombre.toLowerCase().includes(term) ||
                          loc.direccion.toLowerCase().includes(term)
                      );
                      if (found) setActiveLocation(found.nombre);
                    }
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                    aria-label="Limpiar búsqueda"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <select
                value={selectedProvince}
                onChange={e => setSelectedProvince(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
              >
                {provincias.map(prov => (
                  <option key={prov} value={prov} className="bg-gray-900">
                    {prov === 'Todas' ? 'Todas las provincias' : prov}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition border border-white/20"
                title={darkMode ? 'Modo claro' : 'Modo oscuro'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {darkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  )}
                </svg>
              </button>

              {(searchTerm || selectedProvince !== 'Todas') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-red-200 px-4 py-2.5 rounded-lg transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar
                </button>
              )}
            </div>

            <div className="mt-3 text-sm text-gray-300 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 px-2.5 py-1 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                {filteredLocations.length} {filteredLocations.length === 1 ? 'oficina encontrada' : 'oficinas encontradas'}
              </span>
            </div>
          </div>

          <div className="h-96 w-full rounded-2xl overflow-hidden mb-4 relative border border-white/10 shadow-xl">
            <MapContainer
              center={[-1.70571, -79.5348]}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
              scrollWheelZoom={false}
            >
              <TileLayer
                key={darkMode ? 'dark' : 'light'}
                url={
                  darkMode
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
                attribution={
                  darkMode
                    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }
              />

              {filteredLocations.map(loc => (
                <Marker
                  key={loc.nombre}
                  position={[loc.lat, loc.lng]}
                  icon={createCustomIcon(loc.nombre === activeLocation ? '#3B82F6' : '#EF4444', loc.nombre === activeLocation)}
                  eventHandlers={{ click: () => setActiveLocation(loc.nombre) }}
                >
                  <Popup>
                    <div className="text-gray-800 min-w-[240px]">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-bold text-lg">{loc.nombre}</h3>
                      </div>
                      <div className="space-y-1.5 text-sm">
                        <p><span className="font-semibold">Dirección:</span> {loc.direccion}</p>
                        <p className="text-gray-600 italic">{loc.referencia}</p>
                        <div className="flex gap-2 pt-2">
                          <a href={`tel:${loc.telefono}`} className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded text-xs font-semibold transition">
                            Llamar
                          </a>
                          <a
                            href={`https://wa.me/${loc.whatsapp}?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20la%20oficina%20de%20${encodeURIComponent(loc.nombre)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-xs font-semibold transition"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <CenterMap cobertura={filteredLocations} activeLocation={activeLocation} />
              <FitAllButton cobertura={filteredLocations} />
            </MapContainer>
          </div>

          {filteredLocations.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <svg className="w-16 h-16 mx-auto text-white/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-white/70 mb-3">No encontramos oficinas que coincidan con tu búsqueda.</p>
              <button
                onClick={clearFilters}
                className="text-blue-300 hover:text-blue-200 underline text-sm font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <motion.div
              key={`${searchTerm}-${selectedProvince}`}
              initial="hidden"
              animate="visible"
              variants={stagger(0.05, 0.07)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {filteredLocations.map(loc => {
                const isActive = loc.nombre === activeLocation;
                return (
                  <motion.button
                    key={loc.nombre}
                    variants={fadeInUp}
                    whileHover={!isActive ? { y: -4, scale: 1.015 } : {}}
                    transition={{ duration: 0.3, ease: SOFT_EASE }}
                    onClick={() => setActiveLocation(isActive ? null : loc.nombre)}
                    className={`text-left flex flex-col px-4 py-3 rounded-xl cursor-pointer transition-colors duration-500 group ${
                      isActive
                        ? 'bg-blue-500/20 border-2 border-blue-400 shadow-lg shadow-blue-500/30'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`mt-0.5 p-1.5 rounded-lg transition-colors ${isActive ? 'bg-blue-500/30' : 'bg-white/10 group-hover:bg-white/20'}`}>
                        <svg className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-red-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white truncate">{loc.nombre}</div>
                        <div className="text-xs text-gray-300 mt-0.5 line-clamp-1">{loc.direccion}</div>
                        <div className="text-[11px] text-gray-400 italic line-clamp-1">{loc.referencia}</div>
                      </div>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="border-t border-white/10 pt-2 flex gap-2">
                        <a
                          href={`tel:${loc.telefono}`}
                          onClick={e => e.stopPropagation()}
                          className="flex-1 text-center bg-blue-500/30 hover:bg-blue-500/50 text-blue-100 py-1.5 rounded text-xs font-semibold transition"
                        >
                          📞 Llamar
                        </a>
                        <a
                          href={`https://wa.me/${loc.whatsapp}?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20la%20oficina%20de%20${encodeURIComponent(loc.nombre)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex-1 text-center bg-green-500/30 hover:bg-green-500/50 text-green-100 py-1.5 rounded text-xs font-semibold transition"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>

      <style>{`
        .custom-icon { background: transparent; border: none; }
        .leaflet-popup-content { margin: 12px !important; }
        .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.3) !important;
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.55; }
          70% { opacity: 0.05; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default MapaCobertura;
