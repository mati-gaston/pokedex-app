import { useEffect, useState } from 'react';

// Componente que muestra un botón con imagen para volver al inicio cuando se hace scroll hacia abajo
function VolverArriba() {
  const [visible, setVisible] = useState(false);

  // Funcion que controla si el botón debe mostrarse según el desplazamiento de la pagina
  const alternarVisibilidad = () => {
    const desplazamiento = window.scrollY;
    setVisible(desplazamiento > 200);
  };

  // Funcion que desplaza la ventana suavemente hacia arriba
  const desplazarseArriba = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Hook que agrega y limpia el evento scroll cuando se monta o desmonta el componente
  useEffect(() => {
    window.addEventListener('scroll', alternarVisibilidad);
    return () => window.removeEventListener('scroll', alternarVisibilidad);
  }, []);

  return (
    visible && (
      <img
        src="/Logopkm.png"
        alt="Volver al inicio"
        onClick={desplazarseArriba}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          zIndex: 1000,
          opacity: 0.9,
          animation: 'fadeInUp 0.6s ease',
          transition: 'opacity 0.3s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.9)}
      />
    )
  );
}

export default VolverArriba;

