import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!token || !usuario || usuario.rol !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
