import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-white shadow-md'
      }`}
    >
      <div className="flex justify-between items-center py-3 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center group"
          onClick={closeMenu}
          aria-label="Inicio Cafanet"
        >
          <img
            src="/img/LOGO.png"
            alt="Cafanet Logo"
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Menú e íconos a la derecha */}
        <div className="flex items-center">
          {/* Botón hamburguesa en móviles */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
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
          <div className="hidden md:flex items-center space-x-1 ml-6">
            <NavLinks closeMenu={closeMenu} currentPath={location.pathname} />
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable con transición */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <div className="flex flex-col space-y-1">
            <NavLinks closeMenu={closeMenu} currentPath={location.pathname} mobile />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLinks = ({ closeMenu, currentPath, mobile = false }) => (
  <>
    <CustomLink to="/nosotros" label="Sobre Nosotros" closeMenu={closeMenu} currentPath={currentPath} mobile={mobile}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </CustomLink>

    <CustomLink to="/documentos" label="Documentos" closeMenu={closeMenu} currentPath={currentPath} mobile={mobile}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </CustomLink>

    <CustomLink to="/tips" label="Tips" closeMenu={closeMenu} currentPath={currentPath} mobile={mobile}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </CustomLink>

    <CustomLink to="/control-parental" label="Control Parental" closeMenu={closeMenu} currentPath={currentPath} mobile={mobile}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </CustomLink>

    <CustomLink to="/contactos" label="Contactos" closeMenu={closeMenu} currentPath={currentPath} mobile={mobile}>
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </CustomLink>
  </>
);

const CustomLink = ({ to, label, children, closeMenu, currentPath, mobile }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      onClick={closeMenu}
      className={`relative flex items-center font-medium transition-all duration-300 rounded-lg ${
        mobile
          ? `py-2.5 px-3 ${
              isActive
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
            }`
          : `py-2 px-3 ${
              isActive
                ? 'text-blue-600'
                : 'text-gray-700 hover:text-blue-600'
            }`
      }`}
    >
      {children}
      {label}
      {!mobile && isActive && (
        <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
      )}
    </Link>
  );
};

export default Nav;
