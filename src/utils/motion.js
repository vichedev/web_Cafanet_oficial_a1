// Variants y utilidades reutilizables para motion/react
// Centraliza la "voz" del motion design del sitio.

// Curva suave tipo ease-out-expo
export const SOFT_EASE = [0.22, 1, 0.36, 1];

// Configuración estándar para whileInView en scroll reveals
export const VIEWPORT = { once: true, margin: '-80px' };

// Container que dispara stagger a sus hijos
export const stagger = (delayChildren = 0, staggerChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren }
  }
});

// Fade-in puro (solo opacity)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: SOFT_EASE }
  }
};

// Fade + sube suave desde abajo (la animación más usada)
export const fadeInUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: SOFT_EASE }
  }
};

// Más sutil aún (para texto)
export const fadeInUpSmall = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: SOFT_EASE }
  }
};

// Cae desde arriba (badges, headers)
export const fadeInDown = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: SOFT_EASE }
  }
};

// Desliza desde la izquierda
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: SOFT_EASE }
  }
};

// Desliza desde la derecha
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: SOFT_EASE }
  }
};

// Fade + scale suave (cards, modales)
export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: SOFT_EASE }
  }
};

// Spring delicado para hovers (no para entradas)
export const gentleSpring = {
  type: 'spring',
  stiffness: 120,
  damping: 20
};

// Hover lift utilitario para pasar a whileHover en motion.div
export const hoverLift = {
  y: -6,
  scale: 1.015,
  transition: { duration: 0.4, ease: SOFT_EASE }
};
