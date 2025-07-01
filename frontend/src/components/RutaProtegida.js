import { Navigate } from 'react-router-dom';

// Funcion que restringe el acceso a rutas protegidas si no hay un usuario autenticado
function RutaProtegida({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || !usuario.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegida;
