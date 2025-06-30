import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Iniciando sesión con:', email, password); // ✅ Agregá esto


    try {
      const respuesta = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const datos = await respuesta.json();

       console.log('Respuesta del backend:', datos); // ✅ Agregá esto

      if (respuesta.ok) {
        console.log('Redirigiendo a:', datos.usuario.rol === 'admin' ? '/admin' : '/pokedex');

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
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;

