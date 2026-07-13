import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { fadeInUp, fadeInScale, stagger, VIEWPORT, SOFT_EASE } from '../utils/motion';
import GraficaConsumo from './GraficaConsumo';
import {
  capacidadDelMes,
  mesesDisponibles,
  resumenSerie,
  serieDelMes,
  NOMBRES_MES
} from '../data/consumoInternacional';

// Lectura automática del mes: se redacta sola con los datos de la serie.
const interpretacion = (resumen, etiquetaMes, capacidad) => {
  const estado =
    resumen.pico >= 90
      ? 'La red alcanzó niveles altos de ocupación en su día pico, por lo que el monitoreo se mantiene reforzado.'
      : resumen.promedio <= 75
        ? 'La red operó con holgura durante todo el mes: la capacidad contratada cubrió la demanda sin saturación.'
        : 'La red operó dentro de los márgenes previstos, con una holgura menor en las horas de mayor demanda.';

  return `En ${etiquetaMes} el uso promedio de la capacidad internacional fue del ${resumen.promedio} % (${resumen.gbpsPromedio} Gbps de los ${capacidad} Gbps contratados), con un pico del ${resumen.pico} % el día ${resumen.diaPico} y un mínimo del ${resumen.minimo} %. Esto deja una holgura promedio del ${resumen.holgura} %. ${estado}`;
};

const TarjetaDato = ({ etiqueta, valor, unidad, detalle, acento = 'blue' }) => {
  const acentos = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    slate: 'text-gray-700'
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: SOFT_EASE }}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:border-blue-200 hover:shadow-xl hover:shadow-blue-200/30"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{etiqueta}</p>
      <p className={`mt-2 text-3xl font-bold ${acentos[acento]}`}>
        {valor}
        <span className="ml-1 text-base font-semibold text-gray-400">{unidad}</span>
      </p>
      {detalle && <p className="mt-1 text-xs text-gray-500">{detalle}</p>}
    </motion.div>
  );
};

const ConsumoInternacional = () => {
  const meses = useMemo(() => mesesDisponibles(), []);
  const [claveSeleccionada, setClaveSeleccionada] = useState(meses[0].clave);

  const mes = meses.find((m) => m.clave === claveSeleccionada) ?? meses[0];
  const esMesActual = mes.clave === meses[0].clave;

  const capacidad = capacidadDelMes(mes.anio, mes.mes);
  const serie = useMemo(() => serieDelMes(mes.anio, mes.mes), [mes.anio, mes.mes]);
  const resumen = useMemo(() => resumenSerie(serie, capacidad), [serie, capacidad]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 md:py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-200/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: SOFT_EASE }}
          className="mb-8 flex items-center gap-2 text-sm text-gray-500"
        >
          <Link to="/" className="transition-colors hover:text-blue-600">Inicio</Link>
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium text-gray-700">Consumo Internacional</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.1, 0.1)}
          className="mb-12 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700"
          >
            Información Regulatoria
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl"
          >
            <span className="text-shimmer bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
              Consumo Internacional
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
            Porcentaje promedio de capacidad efectiva utilizada frente a la capacidad internacional
            total contratada por Cafanet. La gráfica se actualiza cada día y cambia de mes
            automáticamente.
          </motion.p>
        </motion.div>

        {/* Selector de mes */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-white/70 p-4 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <p className="text-sm text-gray-600">
              {esMesActual ? (
                <>
                  Monitoreo <span className="font-semibold text-gray-900">en curso</span> · {serie.length}{' '}
                  {serie.length === 1 ? 'día registrado' : 'días registrados'} de {NOMBRES_MES[mes.mes - 1]}
                </>
              ) : (
                <>
                  Mes cerrado · <span className="font-semibold text-gray-900">{serie.length} días</span> registrados
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="mes-consumo" className="text-sm font-medium text-gray-600">
              Período:
            </label>
            <select
              id="mes-consumo"
              value={claveSeleccionada}
              onChange={(e) => setClaveSeleccionada(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {meses.map((m, i) => (
                <option key={m.clave} value={m.clave}>
                  {m.etiqueta}{i === 0 ? ' (mes actual)' : ''}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Tarjetas de resumen */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={stagger(0, 0.08)}
          className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          <TarjetaDato
            etiqueta="Uso promedio"
            valor={resumen.promedio}
            unidad="%"
            detalle={`${resumen.gbpsPromedio} Gbps promedio`}
            acento="blue"
          />
          <TarjetaDato
            etiqueta="Pico máximo"
            valor={resumen.pico}
            unidad="%"
            detalle={resumen.diaPico ? `Día ${resumen.diaPico} · ${resumen.gbpsPico} Gbps` : null}
            acento="amber"
          />
          <TarjetaDato
            etiqueta="Holgura disponible"
            valor={resumen.holgura}
            unidad="%"
            detalle="Capacidad libre promedio"
            acento="emerald"
          />
          <TarjetaDato
            etiqueta="Capacidad contratada"
            valor={capacidad}
            unidad="Gbps"
            detalle="Salida internacional total"
            acento="slate"
          />
        </motion.div>

        {/* Gráfica */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInScale}
          className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 p-5 shadow-2xl shadow-blue-900/20 md:p-8"
        >
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-white md:text-2xl">
              Porcentaje promedio de capacidad efectiva vs capacidad internacional
            </h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-gray-400">
              {mes.etiqueta}
            </p>
          </div>

          <GraficaConsumo serie={serie} capacidadGbps={capacidad} etiquetaMes={mes.etiqueta} />
        </motion.div>

        {/* Lectura automática del mes */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          className="mt-6 flex gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm md:p-6"
        >
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-gray-900">Lectura del período</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {interpretacion(resumen, mes.etiqueta, capacidad)}
            </p>
          </div>
        </motion.div>

        {/* Tabla de datos */}
        <motion.details
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeInUp}
          className="group mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-gray-800 transition-colors hover:bg-gray-50">
            <span className="flex items-center gap-3">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Ver tabla de datos diarios
            </span>
            <svg
              className="h-4 w-4 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <div className="max-h-96 overflow-auto border-t border-gray-100">
            <table className="w-full text-left text-sm tabular-nums">
              <thead className="sticky top-0 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Fecha</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Uso efectivo</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Consumo (Gbps)</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Capacidad contratada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {serie.map((punto) => (
                  <tr key={punto.dia} className="transition-colors hover:bg-blue-50/50">
                    <td className="px-5 py-2.5 text-gray-700">{punto.fecha}</td>
                    <td className="px-5 py-2.5 font-semibold text-gray-900">{punto.porcentaje} %</td>
                    <td className="px-5 py-2.5 text-gray-600">{punto.gbps} Gbps</td>
                    <td className="px-5 py-2.5 text-gray-600">{capacidad} Gbps · 100 %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.details>

        <p className="mt-6 text-center text-xs leading-relaxed text-gray-500">
          Los valores corresponden al promedio diario de utilización del enlace internacional de
          Cafanet sobre la capacidad total contratada, publicados conforme a la normativa de la
          Agencia de Regulación y Control de las Telecomunicaciones (ARCOTEL).
        </p>
      </div>
    </section>
  );
};

export default ConsumoInternacional;
