import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div className="container text-center mt-5">
      <div className="p-5 bg-light rounded shadow-sm">
        <h1 className="mb-4">¡Bienvenido a la PokedexApp! 🎮</h1>
        <p className="lead">
          En nuestra App vas a poder explorar una gran variedad de Pokémones con sus habilidades y tipos. 
          Inicia sesión para acceder a contenido exclusivo o gestiona usuarios si eres administrador.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <Link to="/pokedex" className="btn btn-danger btn-lg">
            Ver Pokedex
          </Link>
          <Link to="/login" className="btn btn-outline-primary btn-lg">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
