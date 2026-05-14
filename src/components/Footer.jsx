import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-20">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/img/cafanet.png"
                alt="Cafanet Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Con más de 20 años de trayectoria, en Cafanet transformamos la conectividad de hogares y empresas en Ecuador.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Cafanet"
                className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/593990392423"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Cafanet"
                className="text-gray-400 hover:text-green-400 hover:scale-110 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 2.933C8.805 2.933 2.933 8.805 2.933 16c0 2.537.653 5.013 1.888 7.188L2 30l7.042-2.792A13.002 13.002 0 0016 29.067C23.195 29.067 29.067 23.195 29.067 16S23.195 2.933 16 2.933zm0 24a10.922 10.922 0 01-5.832-1.66l-.417-.25-4.167 1.646 1.563-4.042-.271-.438a10.913 10.913 0 01-1.708-5.729c0-6.012 4.887-10.9 10.9-10.9 6.012 0 10.9 4.888 10.9 10.9s-4.888 10.9-10.9 10.9zm5.313-8.063c-.292-.146-1.729-.854-1.997-.95-.271-.104-.47-.146-.667.146-.198.292-.771.95-.946 1.146-.177.198-.354.219-.646.073-.292-.146-1.229-.454-2.34-1.45-.865-.771-1.448-1.729-1.615-2.021-.167-.292-.02-.438.125-.583.125-.125.292-.323.438-.49.146-.167.198-.292.292-.49.104-.219.052-.365-.021-.51-.073-.146-.667-1.615-.917-2.219-.24-.583-.479-.5-.667-.51h-.573c-.198 0-.51.073-.771.365s-1.01.99-1.01 2.417c0 1.427 1.031 2.803 1.177 2.99.146.198 2.031 3.094 4.927 4.333.688.292 1.229.469 1.646.605.688.219 1.313.188 1.813.115.552-.083 1.729-.708 1.979-1.396.24-.688.24-1.292.167-1.396-.063-.104-.24-.167-.51-.292z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Información Regulatoria */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Información Regulatoria</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.speedtest.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Speedtest
                </a>
              </li>
              <li>
                <a
                  href="https://www.presidencia.gob.ec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Presidencia Nacional Ecuatoriana
                </a>
              </li>
              <li>
                <a
                  href="https://www.arcotel.gob.ec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Arcotel
                </a>
              </li>
              <li>
                <a
                  href="https://www.telecomunicaciones.gob.ec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Mintel
                </a>
              </li>
              <li>
                <Link
                  to="/parametros-calidad"
                  className="text-gray-400 hover:text-white transition"
                >
                  Parámetros de calidad
                </Link>
              </li>
              <li>
                <Link
                  to="/tarifario-promociones"
                  className="text-gray-400 hover:text-white transition"
                >
                  Tarifario y promociones
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nosotros" className="text-gray-400 hover:text-white transition">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/documentos" className="text-gray-400 hover:text-white transition">
                  Documentos Legales
                </Link>
              </li>
              <li>
                <Link to="/contactos" className="text-gray-400 hover:text-white transition">
                  Contactos
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-gray-400 hover:text-white transition">
                  Tips & Consejos
                </Link>
              </li>
              <li>
                <Link to="/planes-cafanet" className="text-gray-400 hover:text-white transition">
                  Planes y Cobertura
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} CAFANET. Todos los derechos reservados.</p>
          <p className="mt-2">
            Cumpliendo con los requisitos de la Agencia de Regulación y Control de las
            Telecomunicaciones (ARCOTEL).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
