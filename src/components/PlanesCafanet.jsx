import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  FaTachometerAlt,
  FaShieldAlt,
  FaHeadset,
  FaServer,
  FaChartLine,
  FaGamepad,
  FaGlobe,
  FaBolt,
  FaRocket,
  FaWifi
} from 'react-icons/fa';
import { motion } from 'motion/react';
import { fadeInUp, fadeInScale, stagger, VIEWPORT, SOFT_EASE } from '../utils/motion';
import MapaCobertura from './MapaCobertura';

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
      'Ideal para hogares que buscan estabilidad y alto rendimiento en su conexión. Navega, haz streaming y trabaja sin cortes.',
    requisitos: null,
    badge: null,
    accent: 'blue',
    image: '/img/planes/1.jpeg',
    docUrl: '/Docu_plan/plan-basico.pdf',
    waMessage: 'Hola, quiero contratar el Plan Básico de Cafanet (200 Mbps - $25)'
  },
  {
    id: 'solidario',
    nombre: 'Plan Solidario',
    velocidad: null,
    precio: '12',
    precioCents: '50',
    descripcion:
      'Pensado para beneficiarios del bono estatal: conectividad accesible para todos con la calidad de la fibra óptica Cafanet.',
    requisitos: 'Solo personas beneficiarias del bono',
    badge: 'SOCIAL',
    accent: 'yellow',
    image: '/img/planes/2.jpeg',
    docUrl: '/Docu_plan/plan-solidario.pdf',
    waMessage: 'Hola, quiero contratar el Plan Solidario de Cafanet ($12.50)'
  },
  {
    id: 'especial',
    nombre: 'Plan Especial',
    velocidad: null,
    precio: '12',
    precioCents: '50',
    descripcion:
      'Diseñado para personas con discapacidades: Internet que apoya la inclusión y mantiene a tu familia conectada.',
    requisitos: 'Solo personas con capacidades diferentes',
    badge: 'INCLUSIVO',
    accent: 'green',
    image: '/img/planes/3.jpeg',
    docUrl: '/Docu_plan/plan-especial.pdf',
    waMessage: 'Hola, quiero contratar el Plan Especial de Cafanet ($12.50)'
  },
  {
    id: 'senior',
    nombre: 'Plan Senior',
    velocidad: null,
    precio: '12',
    precioCents: '50',
    descripcion:
      'Exclusivo para adultos mayores: conexión confiable y sencilla para estar siempre cerca de los tuyos.',
    requisitos: 'Solo personas de la 3era edad',
    badge: '3RA EDAD',
    accent: 'purple',
    image: '/img/planes/4.jpeg',
    docUrl: '/Docu_plan/plan-senior.pdf',
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
  image: '/img/planes/5.jpeg',
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
    descripcion: 'Diseñado para negocios exigentes. Alta velocidad y estabilidad para potenciar tu productividad diaria.',
    features: [
      'Ideal para navegación, facturación y correos',
      'Conexión estable durante todo el día',
      'Soporte empresarial dedicado'
    ],
    accent: 'blue',
    badge: null,
    image: '/img/planes/6.jpeg',
    docUrl: '/Docu_plan/plan-basico-empresarial.pdf',
    waMessage: 'Hola, quiero información sobre el plan Básico Empresarial de Cafanet (600 Mbps)'
  },
  {
    id: 'empresarial-pro',
    nombre: 'Empresarial Pro',
    velocidad: '800',
    velocidadUnit: 'Mbps',
    descripcion: 'Mejor rendimiento para negocios exigentes con operaciones intensivas y trabajo remoto sin cortes.',
    features: [
      'Mejor rendimiento en horas pico',
      'Ideal para negocios con cámaras y acceso remoto',
      'Uso eficiente de sistemas en la nube',
      'Videollamadas sin interrupciones'
    ],
    accent: 'red',
    badge: 'POPULAR',
    image: '/img/planes/6.jpeg',
    docUrl: '/Docu_plan/plan-empresarial-pro.pdf',
    waMessage: 'Hola, quiero información sobre el plan Empresarial Pro de Cafanet (800 Mbps)'
  },
  {
    id: 'empresarial-premium',
    nombre: 'Empresarial Premium',
    velocidad: '1',
    velocidadUnit: 'Gbps',
    velocidadExtra: 'Simétrico',
    descripcion: 'Máxima conectividad para alto rendimiento: ancho de banda simétrico, IP fija y enlaces dedicados.',
    features: [
      'IP fija para acceso remoto seguro',
      'Monitoreo de cámaras desde cualquier lugar',
      'Acceso a servidores (web, correos, sistemas)',
      'VPN y conexión entre sucursales'
    ],
    accent: 'cyan',
    badge: 'PREMIUM',
    image: '/img/planes/6.jpeg',
    docUrl: '/Docu_plan/plan-empresarial-premium.pdf',
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

        {plan.docUrl && (
          <a
            href={plan.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 w-full bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 015.656 0 4 4 0 010 5.656l-3 3a4 4 0 01-5.656 0M10.172 13.828a4 4 0 01-5.656 0 4 4 0 010-5.656l3-3a4 4 0 015.656 0" />
            </svg>
            Cómo acceder a mi plan
          </a>
        )}
      </div>
    </motion.div>
  );
};

const PlanPersonalizadoCard = ({ onImageClick }) => {
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

        {p.image && (
          <motion.div
            variants={fadeInScale}
            className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
            onClick={() => onImageClick && onImageClick(p.image)}
          >
            <img
              src={p.image}
              alt={p.titulo}
              className="w-full h-full max-h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        variants={stagger(0.3, 0.1)}
        className="relative px-8 md:px-12 pb-8 md:pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
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
    </motion.div>
  );
};

const PlanCorporativoCard = ({ plan, onImageClick }) => {
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

      {plan.image && (
        <div
          className="relative h-44 cursor-pointer group"
          onClick={() => onImageClick && onImageClick(plan.image)}
        >
          <img src={plan.image} alt={plan.nombre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
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

        {plan.docUrl && (
          <a
            href={plan.docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 w-full bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-500 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 015.656 0 4 4 0 010 5.656l-3 3a4 4 0 01-5.656 0M10.172 13.828a4 4 0 01-5.656 0 4 4 0 010-5.656l3-3a4 4 0 015.656 0" />
            </svg>
            Cómo acceder a mi plan
          </a>
        )}
      </div>
    </motion.div>
  );
};

// ===== Componente principal =====
const PlanesCafanet = () => {
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);

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
          <PlanPersonalizadoCard onImageClick={setModalImage} />
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
              <PlanCorporativoCard key={plan.id} plan={plan} onImageClick={setModalImage} />
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

        {/* === Cobertura inteligente === */}
        <div className="mt-20">
          <MapaCobertura />
        </div>

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
    </section>
  );
};

export default PlanesCafanet;
