import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || !usuario.token || usuario.rol !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
