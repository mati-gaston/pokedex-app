import { Navigate } from 'react-router-dom';

// Funcion de ruta protegida que permite el acceso solo a administradores
function AdminRuta({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || !usuario.token || usuario.rol !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRuta;
