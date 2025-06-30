import { Navigate } from 'react-router-dom';

function RutaProtegida({ children }) {
  const token = localStorage.getItem('token');

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
export default RutaProtegida;
