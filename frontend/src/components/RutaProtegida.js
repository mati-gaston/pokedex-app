import { Navigate } from 'react-router-dom';

function RutaProtegida({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || !usuario.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegida;
