import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import StandaloneNosotros from './components/Nosotros'
import Documentos from './components/Documentos'
import Contactos from './components/Contactos'
import Footer from './components/Footer'
import PlanesCafanet from './components/PlanesCafanet'
import PlanesTvCafa from './components/PlanesTvCafa'
import HeroTvCafa from './components/HeroTvCafa'
import ControlParental from './components/ControlParental' // ✅ NUEVA IMPORTACIÓN

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<StandaloneNosotros />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/planes-cafanet" element={<PlanesCafanet />} />
          <Route path="/tv-cafa" element={<HeroTvCafa />} />
          <Route path="/planes-tvcafa" element={<PlanesTvCafa />} />
          <Route path="/control-parental" element={<ControlParental />} /> {/* ✅ NUEVA RUTA */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
