import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Bienvenido Administrador</h1>
        <p className="text-secondary fs-5">Accede a las herramientas para gestionar usuarios</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow border-0 rounded-4" style={{ background: 'linear-gradient(to top right, #f8f9fa, #e9ecef)' }}>
            <div className="card-body text-center p-4">
              <h5 className="card-title text-uppercase fw-semibold mb-3">Gestor de Usuarios</h5>
              <p className="card-text text-muted">Visualiza, edita y administra usuarios registrados.</p>
              <Link 
                to="/admin/usuarios" 
                className="btn btn-primary px-4 py-2 mt-3"
                style={{ transition: 'all 0.3s ease' }}
              >
                Acceder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
