import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import StandaloneNosotros from './components/Nosotros'
import Documentos from './components/Documentos'
import Contactos from './components/Contactos'
import Footer from './components/Footer'
import PlanesCafanet from './components/PlanesCafanet'
import ControlParental from './components/ControlParental'
import Tips from './components/Tips'
import PaginaDocumento from './components/PaginaDocumento'
import Cobertura from './components/Cobertura'
import ScrollToTop from './utils/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Nav />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<StandaloneNosotros />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/planes-cafanet" element={<PlanesCafanet />} />
          <Route path="/cobertura" element={<Cobertura />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/control-parental" element={<ControlParental />} />
          <Route
            path="/parametros-calidad"
            element={
              <PaginaDocumento
                eyebrow="Información Regulatoria"
                title="Parámetros de Calidad"
                description="Documento oficial que detalla los parámetros de calidad del servicio de internet ofrecido por Cafanet, conforme a la normativa de ARCOTEL."
                highlights={[
                  'Velocidad de bajada y subida garantizada',
                  'Disponibilidad y tiempo de respuesta del servicio',
                  'Latencia y porcentaje de pérdida de paquetes',
                  'Compromisos de calidad ante el regulador',
                  'Procesos de atención y reclamos',
                  'Indicadores técnicos del servicio'
                ]}
              />
            }
          />
          <Route
            path="/tarifario-promociones"
            element={
              <PaginaDocumento
                eyebrow="Tarifas y Ofertas"
                title="Tarifario y Promociones"
                description="Consulta los precios oficiales de cada uno de los planes de internet Cafanet y las promociones vigentes para nuevos y actuales clientes."
                highlights={[
                  'Precio mensual por plan',
                  'Velocidad incluida en cada paquete',
                  'Beneficios de planes sociales y senior',
                  'Promociones vigentes y temporales',
                  'Costo de instalación según oficina',
                  'Condiciones y plazos de contratación'
                ]}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
