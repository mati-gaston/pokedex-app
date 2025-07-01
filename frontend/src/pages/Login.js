import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Componente Login
 * Muestra un formulario para iniciar sesión.
 * Si el usuario ya inicio, redirige automáticamente según su rol.
 */
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

/**
   * Verifica si el usuario ya está logueado.
   * Si es así, muestra un mensaje y redirige automáticamente.
   */

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (token && usuario) {
      setMensaje('Ya estás logueado. Redirigiendo...⏳');
      setTimeout(() => {
        const destino = usuario.rol === 'admin' ? '/admin' : '/pokedex';
        navigate(destino);
      }, 1500);
    }
  }, [navigate]);

    /**
   * Envía los datos del formulario al backend para iniciar sesión.
   * Si el login es exitoso, guarda el token y los datos del usuario en el contexto.
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        login({
          nombre: datos.usuario.nombre,
          rol: datos.usuario.rol,
          token: datos.token
        });

        navigate(datos.usuario.rol === 'admin' ? '/admin' : '/pokedex');
      } else {
        alert(datos.mensaje || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      {!mensaje && (
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button className="btn btn-primary">Iniciar sesión</button>
        </form>
      )}
    </div>
  );
}

export default Login;
