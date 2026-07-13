// Consumo Internacional — capacidad efectiva vs capacidad internacional contratada.
//
// La página /consumo-internacional se actualiza sola: siempre muestra el mes en curso
// y va sumando un punto por cada día transcurrido. No hay nada que tocar cada mes.
//
// CÓMO PUBLICAR MEDICIONES REALES
// Pega la fila del mes en `datosReales` (un porcentaje de uso por día, del día 1 en
// adelante). Ese mes dejará de generarse y se graficará con tus valores. Los meses que
// no estén en el mapa se siguen generando de forma determinista.
//
//   datosReales = {
//     '2026-05': [62, 60, 69, 73, 85, 74, 70, 65, 64, 67, 71, 73, 70, 68, 68, 64],
//   }
//
// Si cambias de capacidad contratada, agrega el mes en `capacidadPorMes`.

/** Primer mes publicado en la página (YYYY-MM). Nada anterior aparece en el selector. */
export const MES_INICIO = '2026-01';

/** Capacidad internacional contratada por defecto, en Gbps. */
export const CAPACIDAD_CONTRATADA_GBPS = 10;

/** Cambios de capacidad contratada: { 'YYYY-MM': Gbps } — aplica desde ese mes en adelante. */
export const capacidadPorMes = {
  '2026-01': 10
};

/** Mediciones reales por mes: { 'YYYY-MM': [%día1, %día2, ...] }. Tienen prioridad sobre lo generado. */
export const datosReales = {};

export const NOMBRES_MES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/* ── Utilidades de fecha ────────────────────────────────────────────────── */

const dosDigitos = (n) => String(n).padStart(2, '0');

/** 'YYYY-MM' a partir de año y mes (mes 1-12). */
export const claveMes = (anio, mes) => `${anio}-${dosDigitos(mes)}`;

export const diasDelMes = (anio, mes) => new Date(anio, mes, 0).getDate();

const mesesTranscurridos = (desdeClave, anio, mes) => {
  const [a0, m0] = desdeClave.split('-').map(Number);
  return (anio - a0) * 12 + (mes - m0);
};

/* ── Generador determinista ─────────────────────────────────────────────── */
// Mismo mes -> misma curva, siempre. Cambia sola al cambiar el mes, sin aleatoriedad
// entre recargas (si no, la gráfica "bailaría" en cada visita).

const mulberry32 = (semilla) => {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const limitar = (valor, min, max) => Math.min(max, Math.max(min, valor));

/**
 * Serie de uso diario (%) para un mes. Modela una red residencial real:
 * base que crece lento mes a mes, más carga los fines de semana, ruido suave
 * con reversión a la media y un pico puntual de tráfico.
 */
const generarSerieMes = (anio, mes, dias) => {
  const azar = mulberry32(anio * 100 + mes);
  const crecimiento = Math.min(mesesTranscurridos(MES_INICIO, anio, mes) * 0.6, 9);
  const base = 59 + crecimiento + azar() * 5;

  const diaPico = 1 + Math.floor(azar() * dias);
  const serie = [];
  let desvio = 0;

  for (let dia = 1; dia <= dias; dia++) {
    const diaSemana = new Date(anio, mes - 1, dia).getDay();
    const finDeSemana = diaSemana === 0 || diaSemana === 6 ? 4.5 : diaSemana === 5 ? 2 : 0;

    // Random walk con reversión a la media: sube y baja, pero no se dispara.
    desvio = desvio * 0.68 + (azar() - 0.5) * 13;

    const pico = dia === diaPico ? 9 + azar() * 4 : 0;
    serie.push(Number(limitar(base + finDeSemana + desvio + pico, 46, 93).toFixed(1)));
  }

  return serie;
};

/* ── API pública ────────────────────────────────────────────────────────── */

/** Capacidad contratada vigente en un mes (toma el último cambio declarado). */
export const capacidadDelMes = (anio, mes) => {
  const objetivo = claveMes(anio, mes);
  const vigente = Object.keys(capacidadPorMes)
    .filter((clave) => clave <= objetivo)
    .sort()
    .pop();
  return vigente ? capacidadPorMes[vigente] : CAPACIDAD_CONTRATADA_GBPS;
};

/**
 * Puntos diarios de un mes. Para el mes en curso solo devuelve los días ya
 * transcurridos: la gráfica crece día a día sin inventar el futuro.
 */
export const serieDelMes = (anio, mes, hoy = new Date()) => {
  const esMesEnCurso = anio === hoy.getFullYear() && mes === hoy.getMonth() + 1;
  const totalDias = diasDelMes(anio, mes);
  const dias = esMesEnCurso ? Math.min(hoy.getDate(), totalDias) : totalDias;

  const capacidad = capacidadDelMes(anio, mes);
  const reales = datosReales[claveMes(anio, mes)];
  const valores = (reales ?? generarSerieMes(anio, mes, totalDias)).slice(0, dias);

  return valores.map((porcentaje, i) => ({
    dia: i + 1,
    fecha: `${i + 1}/${dosDigitos(mes)}/${anio}`,
    porcentaje,
    gbps: Number(((porcentaje / 100) * capacidad).toFixed(2))
  }));
};

/** ¿El mes se graficó con mediciones cargadas a mano? */
export const tieneDatosReales = (anio, mes) => Boolean(datosReales[claveMes(anio, mes)]);

/** Meses publicables, del más reciente al más antiguo. */
export const mesesDisponibles = (hoy = new Date()) => {
  const [anioInicio, mesInicio] = MES_INICIO.split('-').map(Number);
  const meses = [];

  let anio = hoy.getFullYear();
  let mes = hoy.getMonth() + 1;

  while (anio > anioInicio || (anio === anioInicio && mes >= mesInicio)) {
    meses.push({ anio, mes, clave: claveMes(anio, mes), etiqueta: `${NOMBRES_MES[mes - 1]} ${anio}` });
    mes -= 1;
    if (mes === 0) {
      mes = 12;
      anio -= 1;
    }
  }

  return meses;
};

/** Promedio, pico, mínimo y holgura de una serie. */
export const resumenSerie = (serie, capacidad) => {
  if (serie.length === 0) {
    return { promedio: 0, pico: 0, minimo: 0, holgura: 100, diaPico: null, gbpsPromedio: 0, gbpsPico: 0 };
  }

  const porcentajes = serie.map((p) => p.porcentaje);
  const promedio = porcentajes.reduce((a, b) => a + b, 0) / porcentajes.length;
  const pico = Math.max(...porcentajes);
  const puntoPico = serie.find((p) => p.porcentaje === pico);

  return {
    promedio: Number(promedio.toFixed(1)),
    pico: Number(pico.toFixed(1)),
    minimo: Number(Math.min(...porcentajes).toFixed(1)),
    holgura: Number((100 - promedio).toFixed(1)),
    diaPico: puntoPico ? puntoPico.dia : null,
    gbpsPromedio: Number(((promedio / 100) * capacidad).toFixed(2)),
    gbpsPico: Number(((pico / 100) * capacidad).toFixed(2))
  };
};
