import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import {
  FaTachometerAlt,
  FaShieldAlt,
  FaHeadset,
  FaWifi,
  FaServer,
  FaChartLine,
  FaGamepad,
  FaGlobe,
  FaBolt,
  FaRocket
} from 'react-icons/fa';
import { motion } from 'motion/react';
import { fadeInUp, fadeInScale, stagger, VIEWPORT, SOFT_EASE } from '../utils/motion';

// ===== WhatsApp helper =====
const waLink = text =>
  `https://wa.me/593990392423?text=${encodeURIComponent(text)}`;

// ===== Datos =====
const planesHogar = [
  {
    id: 'basico',
    nombre: 'Plan Básico',
    velocidad: '200',
    velocidadUnit: 'Mbps',
    precio: '25',
    precioCents: '00',
    descripcion:
      'Internet de fibra óptica al 100% para todo tu hogar. Navega, streaming en alta calidad y trabaja sin cortes.',
    requisitos: null,
    badge: null,
    accent: 'blue',
    image: '/img/planes/1.jpeg',
    waMessage: 'Hola, quiero contratar el Plan Básico de Cafanet (200 Mbps - $25)'
  },
  {
    id: 'solidario',
    nombre: 'Plan Solidario',
    velocidad: null,
    precio: '12',
    precioCents: '50',
    descripcion:
      'Conectividad accesible para beneficiarios del bono estatal. Fibra óptica al alcance de tu hogar.',
    requisitos: 'Solo personas beneficiarias del bono',
    badge: 'SOCIAL',
    accent: 'yellow',
    image: '/img/planes/2.jpeg',
    waMessage: 'Hola, quiero contratar el Plan Solidario de Cafanet ($12.50)'
  },
  {
    id: 'especial',
    nombre: 'Plan Especial',
    velocidad: null,
    precio: '12',
    precioCents: '50',
    descripcion:
      'Internet que apoya la inclusión, pensado para personas con capacidades diferentes.',
    requisitos: 'Solo personas con capacidades diferentes',
    badge: 'INCLUSIVO',
    accent: 'green',
    image: '/img/planes/3.jpeg',
    waMessage: 'Hola, quiero contratar el Plan Especial de Cafanet ($12.50)'
  },
  {
    id: 'senior',
    nombre: 'Plan Senior',
    velocidad: null,
    precio: '12',
    precioCents: '50',
    descripcion:
      'Conexión confiable para que los adultos mayores estén siempre cerca de los suyos.',
    requisitos: 'Solo personas de la 3era edad',
    badge: '3RA EDAD',
    accent: 'purple',
    image: '/img/planes/4.jpeg',
    waMessage: 'Hola, quiero contratar el Plan Senior de Cafanet ($12.50)'
  }
];

const featuresHogar = [
  { Icon: FaTachometerAlt, label: 'Alta Velocidad', color: 'text-blue-500', bg: 'bg-blue-50' },
  { Icon: FaShieldAlt,     label: 'Conexión Estable', color: 'text-green-500', bg: 'bg-green-50' },
  { Icon: FaHeadset,       label: 'Atención Personalizada', color: 'text-purple-500', bg: 'bg-purple-50' },
  { Icon: FaWifi,          label: 'Soporte Técnico', color: 'text-orange-500', bg: 'bg-orange-50' }
];

const planPersonalizado = {
  titulo: 'Plan Personalizado',
  eyebrow: '¿Necesitas más velocidad?',
  copy: 'Te adaptamos según tu necesidad. Diseñamos un plan a tu medida con la velocidad y estabilidad que tu hogar o emprendimiento requieren.',
  features: [
    { Icon: FaGlobe,    label: 'Internet sin interrupciones' },
    { Icon: FaGamepad,  label: 'Ideal para videojuegos en línea' },
    { Icon: FaBolt,     label: 'Conexión estable y rápida' },
    { Icon: FaRocket,   label: 'Tecnología 100% fibra óptica' }
  ],
  waMessage:
    'Hola, quiero un Plan Personalizado de Cafanet adaptado a mi necesidad'
};

const planesCorporativos = [
  {
    id: 'basico-empresarial',
    nombre: 'Básico Empresarial',
    velocidad: '600',
    velocidadUnit: 'Mbps',
    descripcion: 'Alta velocidad para operaciones diarias.',
    features: [
      'Ideal para navegación, facturación y correos',
      'Conexión estable durante todo el día',
      'Soporte empresarial dedicado'
    ],
    accent: 'blue',
    badge: null,
    waMessage: 'Hola, quiero información sobre el plan Básico Empresarial de Cafanet (600 Mbps)'
  },
  {
    id: 'empresarial-pro',
    nombre: 'Empresarial Pro',
    velocidad: '800',
    velocidadUnit: 'Mbps',
    descripcion: 'Mejor rendimiento para negocios exigentes.',
    features: [
      'Mejor rendimiento en horas pico',
      'Ideal para negocios con cámaras y acceso remoto',
      'Uso eficiente de sistemas en la nube',
      'Videollamadas sin interrupciones'
    ],
    accent: 'red',
    badge: 'POPULAR',
    waMessage: 'Hola, quiero información sobre el plan Empresarial Pro de Cafanet (800 Mbps)'
  },
  {
    id: 'empresarial-premium',
    nombre: 'Empresarial Premium',
    velocidad: '1',
    velocidadUnit: 'Gbps',
    velocidadExtra: 'Simétrico',
    descripcion: 'Máxima conectividad para alto rendimiento.',
    features: [
      'IP fija para acceso remoto seguro',
      'Monitoreo de cámaras desde cualquier lugar',
      'Acceso a servidores (web, correos, sistemas)',
      'VPN y conexión entre sucursales'
    ],
    accent: 'cyan',
    badge: 'PREMIUM',
    waMessage: 'Hola, quiero información sobre el plan Empresarial Premium de Cafanet (1 Gbps Simétrico)'
  }
];

const featuresCorporativo = [
  { Icon: FaTachometerAlt, title: 'Alta Velocidad Sin Cortes', desc: 'Internet dedicado para tu empresa.',     bg: 'bg-blue-50',   border: 'hover:border-blue-200',   text: 'text-blue-600' },
  { Icon: FaShieldAlt,     title: 'Conectividad Estable',      desc: 'Infraestructura redundante 24/7.',       bg: 'bg-green-50',  border: 'hover:border-green-200',  text: 'text-green-600' },
  { Icon: FaHeadset,       title: 'Soporte Prioritario',       desc: 'Atención rápida y especializada.',       bg: 'bg-red-50',    border: 'hover:border-red-200',    text: 'text-red-600' },
  { Icon: FaServer,        title: 'IP Fija (Opcional)',        desc: 'Mayor seguridad y acceso remoto.',       bg: 'bg-cyan-50',   border: 'hover:border-cyan-200',   text: 'text-cyan-600' },
  { Icon: FaChartLine,     title: 'Monitoreo 24/7',            desc: 'Supervisión constante para tu tranquilidad.', bg: 'bg-purple-50', border: 'hover:border-purple-200', text: 'text-purple-600' }
];

// ===== Colores por acento =====
const accentMap = {
  blue:   { ring: 'border-blue-200',   header: 'from-blue-50 to-blue-100',     headerBorder: 'border-blue-200',   text: 'text-blue-600',   btn: 'bg-blue-600 hover:bg-blue-700' },
  yellow: { ring: 'border-yellow-200', header: 'from-yellow-50 to-yellow-100', headerBorder: 'border-yellow-200', text: 'text-yellow-600', btn: 'bg-yellow-500 hover:bg-yellow-600' },
  green:  { ring: 'border-green-200',  header: 'from-green-50 to-green-100',   headerBorder: 'border-green-200',  text: 'text-green-600',  btn: 'bg-green-600 hover:bg-green-700' },
  purple: { ring: 'border-purple-200', header: 'from-purple-50 to-purple-100', headerBorder: 'border-purple-200', text: 'text-purple-600', btn: 'bg-purple-600 hover:bg-purple-700' },
  red:    { ring: 'border-red-200',    header: 'from-red-50 to-red-100',       headerBorder: 'border-red-200',    text: 'text-red-600',    btn: 'bg-red-600 hover:bg-red-700' },
  cyan:   { ring: 'border-cyan-200',   header: 'from-cyan-50 to-cyan-100',     headerBorder: 'border-cyan-200',   text: 'text-cyan-600',   btn: 'bg-cyan-600 hover:bg-cyan-700' }
};

// ===== Sub-componentes =====
const PlanHogarCard = ({ plan, onImageClick }) => {
  const a = accentMap[plan.accent];
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.4, ease: SOFT_EASE }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${a.ring} flex flex-col hover:shadow-2xl hover:shadow-blue-200/30`}
    >
      <div
        className="relative h-48 cursor-pointer group"
        onClick={() => onImageClick(plan.image)}
      >
        <img src={plan.image} alt={plan.nombre} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
        {plan.badge && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
            {plan.badge}
          </span>
        )}
      </div>

      <div className={`bg-gradient-to-r ${a.header} p-6 border-b ${a.headerBorder}`}>
        <h3 className={`text-2xl font-bold ${a.text}`}>{plan.nombre}</h3>
        {plan.velocidad && (
          <div className="mt-2 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            <FaTachometerAlt className={`w-3.5 h-3.5 ${a.text}`} />
            <span className="text-sm font-semibold text-gray-800">{plan.velocidad} {plan.velocidadUnit}</span>
          </div>
        )}
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold text-gray-900">${plan.precio}</span>
          <span className="text-2xl font-bold text-gray-900">,{plan.precioCents}</span>
          <span className="text-gray-500 ml-2 text-sm">/mes</span>
        </div>
        <p className="text-[11px] text-gray-500 italic mt-1">Impuestos incluidos</p>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{plan.descripcion}</p>

        {plan.requisitos && (
          <div className="mb-4 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Requisito</p>
            <p className="text-xs text-gray-700 font-medium">{plan.requisitos}</p>
          </div>
        )}

        <a
          href={waLink(plan.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center w-full ${a.btn} text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
        >
          Contratar ahora
        </a>
      </div>
    </motion.div>
  );
};

const PlanPersonalizadoCard = () => {
  const p = planPersonalizado;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeInScale}
      className="relative rounded-3xl overflow-hidden shadow-2xl"
    >
      {/* Fondo gradiente Cafanet */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-red-700"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_55%)]"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-500/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>

      <div className="relative p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white/95 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            {p.eyebrow}
          </span>
          <h3 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="block">Plan</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-red-200 text-shimmer">
              Personalizado
            </span>
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-xl">{p.copy}</p>

          <a
            href={waLink(p.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold px-7 py-3.5 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500"
          >
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 32 32">
              <path d="M16 2.933C8.805 2.933 2.933 8.805 2.933 16c0 2.537.653 5.013 1.888 7.188L2 30l7.042-2.792A13.002 13.002 0 0016 29.067C23.195 29.067 29.067 23.195 29.067 16S23.195 2.933 16 2.933z" />
            </svg>
            Solicita tu plan a medida
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <motion.div
          variants={stagger(0.3, 0.1)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {p.features.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: SOFT_EASE }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-start gap-3 hover:bg-white/15 hover:border-white/40"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <feat.Icon className="w-5 h-5" />
              </div>
              <p className="text-white text-sm font-medium leading-snug pt-1">{feat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const PlanCorporativoCard = ({ plan }) => {
  const a = accentMap[plan.accent];
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.4, ease: SOFT_EASE }}
      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${a.ring} flex flex-col hover:shadow-2xl hover:shadow-blue-200/30`}
    >
      {plan.badge && (
        <span className={`absolute top-4 right-4 z-10 ${a.btn} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg`}>
          {plan.badge}
        </span>
      )}

      <div className={`bg-gradient-to-br ${a.header} p-7 border-b ${a.headerBorder}`}>
        <h3 className={`text-xl font-bold ${a.text} uppercase tracking-wide mb-3`}>{plan.nombre}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-6xl font-extrabold text-gray-900">{plan.velocidad}</span>
          <div className="flex flex-col leading-tight">
            <span className={`text-2xl font-bold ${a.text}`}>{plan.velocidadUnit}</span>
            {plan.velocidadExtra && (
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{plan.velocidadExtra}</span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">{plan.descripcion}</p>
      </div>

      <div className="p-7 flex flex-col flex-grow">
        <ul className="space-y-2.5 mb-6 flex-grow">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${a.text}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={waLink(plan.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center w-full ${a.btn} text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
        >
          Solicitar cotización
        </a>
      </div>
    </motion.div>
  );
};

// ===== Mapa: helpers (idénticos a antes) =====
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

const cobertura = [
  { nombre: 'Ventanas',     provincia: 'Los Ríos', lat: -1.4475, lng: -79.4571, direccion: 'Centro de Ventanas',                            referencia: 'Origen de Cafanet • Cantón Ventanas', whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'Babahoyo',     provincia: 'Los Ríos', lat: -1.8024, lng: -79.5348, direccion: 'Olmedo entre General Barona y 10 de Agosto',   referencia: 'A 2 locales de Avendaño',             whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'Baba - Pimocha', provincia: 'Los Ríos', lat: -1.8330326666208572, lng: -79.59897009047452, direccion: 'Av. Guayaquil',         referencia: 'Junto al complejo Boga',              whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'La Unión',     provincia: 'Los Ríos', lat: -1.70571, lng: -79.39154, direccion: 'Abraham Freire y 9 de Octubre',              referencia: 'Cerca de Agripac',                    whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'Puebloviejo',  provincia: 'Los Ríos', lat: -1.549184881516172, lng: -79.53183102174286, direccion: 'Justino Cornejo y 10 de Agosto', referencia: 'Centro de Puebloviejo',         whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'San Juan',     provincia: 'Los Ríos', lat: -1.6277118646117377, lng: -79.56112179141901, direccion: 'Jaime Roldós y Othón Alava', referencia: 'Frente al parque infantil',       whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'Urdaneta',     provincia: 'Los Ríos', lat: -1.57055556, lng: -79.47111111, direccion: 'Av. Leonidas Icaza',                   referencia: 'Junto a la casa de Lcdo. Cristhian Lara', whatsapp: '593990392423', telefono: '0990392423' },
  { nombre: 'La Isla',      provincia: 'Los Ríos', lat: -1.6770852437414112, lng: -79.64163062448694, direccion: 'Cdla. 23 de Abril',      referencia: 'Junto al taller Don Jacinto Alava',   whatsapp: '593990392423', telefono: '0990392423' }
];

// ===== Componente principal =====
const PlanesCafanet = () => {
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);
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

  return (
    <section className="relative bg-gray-50 min-h-screen overflow-hidden">
      {/* Modal imagen */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-red-500 z-50 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={modalImage}
              alt="Vista ampliada del plan"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0, 0.1)}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4"
          >
            Cafanet • Una ventana al mundo
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 text-shimmer">
              Planes Cafanet
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
            Internet 100% fibra óptica diseñado para cada necesidad: hogar, social, inclusivo y empresarial.
          </motion.p>
        </motion.div>

        {/* === Planes Hogar === */}
        <div className="mb-8">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
            <div>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Planes para Hogar</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Conectividad para los tuyos</h2>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Impuestos incluidos en todos los planes
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.1, 0.12)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {planesHogar.map(plan => (
              <PlanHogarCard key={plan.id} plan={plan} onImageClick={setModalImage} />
            ))}
          </motion.div>

          {/* Strip de beneficios comunes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.1, 0.1)}
            className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <motion.p variants={fadeInUp} className="text-center text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">
              Todos los planes hogar incluyen
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuresHogar.map((feat, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${feat.bg} flex items-center justify-center flex-shrink-0`}>
                    <feat.Icon className={`w-5 h-5 ${feat.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{feat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* === Plan Personalizado === */}
        <div className="mt-16 mb-20">
          <PlanPersonalizadoCard />
        </div>

        {/* === Internet Corporativo === */}
        <div className="mt-20">
          {/* Header de la sección */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0, 0.1)}
            className="text-center mb-10"
          >
            <motion.span variants={fadeInUp} className="inline-block bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              Para empresas
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-red-500 text-shimmer">
                Internet Corporativo
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto">
              Infraestructura de red en fibra óptica para que tu negocio nunca se detenga.
            </motion.p>
          </motion.div>

          {/* Features corporativos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.1, 0.1)}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
          >
            {featuresCorporativo.map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: SOFT_EASE }}
                className={`bg-white rounded-2xl p-5 shadow-md border border-gray-100 ${feat.border} hover:shadow-xl text-center`}
              >
                <div className={`w-12 h-12 mx-auto rounded-xl ${feat.bg} flex items-center justify-center mb-3`}>
                  <feat.Icon className={`w-6 h-6 ${feat.text}`} />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">{feat.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 3 planes corporativos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={stagger(0.1, 0.13)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {planesCorporativos.map(plan => (
              <PlanCorporativoCard key={plan.id} plan={plan} />
            ))}
          </motion.div>

          {/* CTA empresarial */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeInScale}
            className="relative mt-10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-blue-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_55%)]"></div>

            <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <FaHeadset className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left text-white">
                <span className="inline-block bg-white/15 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
                  Cotización empresarial
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">Solicita tu cotización personalizada</h3>
                <p className="text-white/90">Planes diseñados para impulsar tu negocio. Soluciones escalables, SLA garantizado e instalación prioritaria.</p>
              </div>
              <motion.a
                href={waLink('Hola, necesito una cotización empresarial de Cafanet para mi negocio')}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: SOFT_EASE }}
                className="inline-flex items-center gap-2 bg-white text-red-700 hover:bg-red-50 font-bold px-6 py-3.5 rounded-xl shadow-xl hover:shadow-2xl whitespace-nowrap"
              >
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 2.933C8.805 2.933 2.933 8.805 2.933 16c0 2.537.653 5.013 1.888 7.188L2 30l7.042-2.792A13.002 13.002 0 0016 29.067C23.195 29.067 29.067 23.195 29.067 16S23.195 2.933 16 2.933z" />
                </svg>
                Escríbenos ahora
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ============================================================
            COBERTURA INTELIGENTE
            ============================================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          className="mt-20"
        >
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

        {/* Volver */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver atrás
          </button>
        </div>
      </div>

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
    </section>
  );
};

export default PlanesCafanet;
