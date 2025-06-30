import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/pokebola.png" alt="Logo" width="40" height="40" className="me-2" /> 
          <span className="brand-text">Pokedex</span>
        </Link>
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {usuario && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/pokedex">Pokedex</Link>
                </li>
                {usuario.rol === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/usuarios">Gestionar Usuarios</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm ms-3" onClick={cerrarSesion}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
            {!usuario && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
