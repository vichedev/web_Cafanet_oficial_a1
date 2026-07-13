import { useMemo, useRef, useState } from 'react';

// Gráfica de líneas en SVG puro (sin librerías): uso diario de la capacidad
// internacional contra el 100% contratado. Un solo eje Y en porcentaje —
// los Gbps se muestran en el tooltip, nunca como segundo eje.

const ANCHO = 1000;
const ALTO = 400;
const MARGEN = { top: 24, right: 28, bottom: 52, left: 56 };

const AREA_ANCHO = ANCHO - MARGEN.left - MARGEN.right;
const AREA_ALTO = ALTO - MARGEN.top - MARGEN.bottom;

const SUPERFICIE = '#111827'; // panel oscuro (gray-900), el mismo del footer
const AZUL = '#3987e5';       // uso efectivo
const VERDE = '#199e70';      // capacidad contratada (100%)
const REJILLA = 'rgba(255,255,255,0.08)';
const EJE = '#898781';

const TICKS_Y = [0, 25, 50, 75, 100];

const escalaY = (porcentaje) => MARGEN.top + AREA_ALTO * (1 - porcentaje / 100);

const GraficaConsumo = ({ serie, capacidadGbps, etiquetaMes }) => {
  const svgRef = useRef(null);
  const [activo, setActivo] = useState(null);

  const { puntos, pasoX, etiquetasX } = useMemo(() => {
    const total = serie.length;
    const paso = total > 1 ? AREA_ANCHO / (total - 1) : 0;

    const pts = serie.map((punto, i) => ({
      ...punto,
      x: total > 1 ? MARGEN.left + i * paso : MARGEN.left + AREA_ANCHO / 2,
      y: escalaY(punto.porcentaje)
    }));

    // Un máximo de ~16 etiquetas en el eje X para que no se pisen entre sí.
    const salto = Math.max(1, Math.ceil(total / 16));
    const etiquetas = pts.filter((p, i) => i === 0 || i === total - 1 || p.dia % salto === 0);

    return { puntos: pts, pasoX: paso, etiquetasX: etiquetas };
  }, [serie]);

  if (puntos.length === 0) return null;

  const lineaUso = puntos.map((p) => `${p.x},${p.y}`).join(' ');
  const areaUso = `${MARGEN.left},${MARGEN.top + AREA_ALTO} ${lineaUso} ${puntos[puntos.length - 1].x},${MARGEN.top + AREA_ALTO}`;
  const yContratada = escalaY(100);

  const alMover = (evento) => {
    const svg = svgRef.current;
    if (!svg || pasoX === 0) return;

    const rect = svg.getBoundingClientRect();
    const x = ((evento.clientX - rect.left) / rect.width) * ANCHO;
    const indice = Math.round((x - MARGEN.left) / pasoX);

    setActivo(Math.min(puntos.length - 1, Math.max(0, indice)));
  };

  const punto = activo !== null ? puntos[activo] : null;

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <div className="min-w-[680px] relative">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${ANCHO} ${ALTO}`}
            className="w-full h-auto touch-none"
            role="img"
            aria-label={`Porcentaje diario de uso de la capacidad internacional durante ${etiquetaMes}. La tabla de datos con todos los valores está disponible debajo de la gráfica.`}
            onPointerMove={alMover}
            onPointerDown={alMover}
            onPointerLeave={() => setActivo(null)}
          >
            <defs>
              <linearGradient id="degradadoUso" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={AZUL} stopOpacity="0.28" />
                <stop offset="100%" stopColor={AZUL} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Rejilla + eje Y */}
            {TICKS_Y.map((tick) => (
              <g key={tick}>
                <line
                  x1={MARGEN.left}
                  y1={escalaY(tick)}
                  x2={ANCHO - MARGEN.right}
                  y2={escalaY(tick)}
                  stroke={REJILLA}
                  strokeWidth="1"
                />
                <text
                  x={MARGEN.left - 12}
                  y={escalaY(tick) + 4}
                  textAnchor="end"
                  fill={EJE}
                  fontSize="12"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {tick} %
                </text>
              </g>
            ))}

            {/* Eje X */}
            {etiquetasX.map((p) => (
              <text
                key={p.dia}
                x={p.x}
                y={ALTO - MARGEN.bottom + 22}
                textAnchor="middle"
                fill={EJE}
                fontSize="11"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {p.dia}
              </text>
            ))}
            <text
              x={MARGEN.left + AREA_ANCHO / 2}
              y={ALTO - 8}
              textAnchor="middle"
              fill={EJE}
              fontSize="11"
            >
              Día del mes
            </text>

            {/* Capacidad total contratada = 100% */}
            <line
              x1={MARGEN.left}
              y1={yContratada}
              x2={ANCHO - MARGEN.right}
              y2={yContratada}
              stroke={VERDE}
              strokeWidth="2"
            />
            <text
              x={ANCHO - MARGEN.right}
              y={yContratada - 10}
              textAnchor="end"
              fill={VERDE}
              fontSize="12"
              fontWeight="600"
            >
              Capacidad contratada · {capacidadGbps} Gbps
            </text>

            {/* Uso efectivo */}
            <polygon points={areaUso} fill="url(#degradadoUso)" />
            <polyline
              points={lineaUso}
              fill="none"
              stroke={AZUL}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {puntos.map((p) => (
              <circle
                key={p.dia}
                cx={p.x}
                cy={p.y}
                r="4"
                fill={AZUL}
                stroke={SUPERFICIE}
                strokeWidth="2"
              />
            ))}

            {/* Crosshair */}
            {punto && (
              <g pointerEvents="none">
                <line
                  x1={punto.x}
                  y1={MARGEN.top}
                  x2={punto.x}
                  y2={MARGEN.top + AREA_ALTO}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle cx={punto.x} cy={punto.y} r="7" fill={AZUL} stroke="#ffffff" strokeWidth="2" />
              </g>
            )}
          </svg>

          {/* Tooltip */}
          {punto && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] rounded-xl border border-white/10 bg-gray-950/95 px-3 py-2 shadow-2xl backdrop-blur-sm"
              style={{ left: `${(punto.x / ANCHO) * 100}%`, top: `${(punto.y / ALTO) * 100}%` }}
            >
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {punto.fecha}
              </p>
              <p className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-white">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: AZUL }} />
                {punto.porcentaje} % de uso
                <span className="font-normal text-gray-400">· {punto.gbps} Gbps</span>
              </p>
              <p className="mt-1 flex items-center gap-2 whitespace-nowrap text-xs text-gray-400">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: VERDE }} />
                Contratada · {capacidadGbps} Gbps
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-2 text-gray-300">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: AZUL }} />
          Porcentaje de uso efectivo
        </span>
        <span className="flex items-center gap-2 text-gray-300">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: VERDE }} />
          Capacidad total contratada (100 %)
        </span>
      </div>
    </div>
  );
};

export default GraficaConsumo;
