import { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center py-3 px-4 md:px-8">
        {/* Logo alineado a la izquierda */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img
            src="/img/cafanet.png"
            alt="Cafanet Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Menú e íconos a la derecha */}
        <div className="flex items-center">
          {/* Botón hamburguesa en móviles */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menú en pantallas grandes */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            <NavLinks closeMenu={closeMenu} />
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2">
            <NavLinks closeMenu={closeMenu} />
          </div>
        </div>
      )}
    </nav>
  );
};

// Reutilizable para todos los enlaces del menú
const NavLinks = ({ closeMenu }) => (
  <>
    <CustomLink to="/nosotros" label="Sobre Nosotros" closeMenu={closeMenu}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </CustomLink>

    <CustomLink to="/documentos" label="Documentos" closeMenu={closeMenu}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </CustomLink>

    <CustomLink to="/control-parental" label="Control Parental" closeMenu={closeMenu}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </CustomLink>

    <CustomLink to="/contactos" label="Contactos" closeMenu={closeMenu}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </CustomLink>
  </>
);

const CustomLink = ({ to, label, children, closeMenu }) => (
  <Link
    to={to}
    onClick={closeMenu}
    className="flex items-center text-gray-700 hover:text-blue-500 transition duration-300 font-medium py-2 md:py-0 md:px-3"
  >
    {children}
    {label}
  </Link>
);

export default Nav;
