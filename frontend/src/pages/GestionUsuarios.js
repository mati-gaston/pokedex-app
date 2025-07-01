import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState({ id: '', nombre: '', email: '', rol: '' });
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', password: '', rol: 'viewer' });

  const token = JSON.parse(localStorage.getItem('usuario'))?.token;

  /**Funcion obtenerUsuario
 * Obtiene la lista de usuarios desde el backend y actualiza el estado.
 * Usa el token almacenado en localStorage para la autenticación.
 * */
  const obtenerUsuarios = async () => {
    try {
      const respuesta = await fetch('http://localhost:4000/api/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await respuesta.json();

      if (Array.isArray(data.usuarios)) {
        setUsuarios(data.usuarios);
      } else if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        setUsuarios([]);
        setMensaje('Error al obtener los usuarios.');
      }
    } catch (error) {
      setMensaje('No se pudo conectar al servidor.');
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  /**
 * Función eliminarUsuario
 * Elimina un usuario tras confirmar mediante SweetAlert.
 * Luego actualiza la lista de usuarios.
 */
  const eliminarUsuario = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const respuesta = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await respuesta.json();
      setMensaje(data.mensaje);
      obtenerUsuarios();

      Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
    } catch {
      setMensaje('No se pudo eliminar el usuario.');
      Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
    }
  };

  /**
 * Función editarUsuario
 * Activa el modo edición y carga los datos del usuario seleccionado en el formulario.
 */
  const editarUsuario = (usuario) => {
    setModoEdicion(true);
    setUsuarioEditado(usuario);
    setMensaje('');
  };

  /**
 * Función manejarCambio
 * Actualiza el estado del usuario en edición conforme se completan los campos del formulario.
 */
  const manejarCambio = (e) => {
    setUsuarioEditado({ ...usuarioEditado, [e.target.name]: e.target.value });
  };

  /**
 * Función guardarEdicion
 * Envía los datos modificados del usuario al backend para actualizar la información.
 * Luego actualiza la lista de usuarios.
 */
  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(`http://localhost:4000/api/usuarios/${usuarioEditado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: usuarioEditado.nombre,
          email: usuarioEditado.email,
          rol: usuarioEditado.rol,
        }),
      });
      const data = await respuesta.json();
      setMensaje(data.mensaje);
      setModoEdicion(false);
      obtenerUsuarios();
    } catch {
      setMensaje('No se pudo editar el usuario.');
    }
  };

  /**
 * Función manejarCambioNuevo
 * Actualiza el estado del nuevo usuario conforme se completan los campos del formulario.
 */
  const manejarCambioNuevo = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  /**
 * Función crearUsuario
 * Envía los datos del nuevo usuario al backend para su creación.
 * Luego limpia el formulario y actualiza la lista de usuarios.
 */
  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:4000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoUsuario),
      });
      const data = await respuesta.json();
      setMensaje(data.mensaje);
      setNuevoUsuario({ nombre: '', email: '', password: '', rol: 'viewer' });
      obtenerUsuarios();
    } catch {
      setMensaje('No se pudo crear el usuario.');
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-center">Gestión de Usuarios</h2>
      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}

      {/* Formulario creación de usuario */}
      <form onSubmit={crearUsuario} className="mb-5 p-4 rounded shadow-sm bg-light border">
        <h4 className="mb-3 text-primary">Crear Nuevo Usuario</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="nombre"
              className="form-control"
              placeholder="Nombre"
              value={nuevoUsuario.nombre}
              onChange={manejarCambioNuevo}
              required
              autoComplete="off"
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={nuevoUsuario.email}
              onChange={manejarCambioNuevo}
              required
              autoComplete="off"
            />
          </div>
          <div className="col-md-6">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              value={nuevoUsuario.password}
              onChange={manejarCambioNuevo}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="col-md-6">
            <select
              name="rol"
              className="form-select"
              value={nuevoUsuario.rol}
              onChange={manejarCambioNuevo}
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>

        <div className="text-end mt-4">
          <button type="submit" className="btn btn-success px-4">Crear Usuario</button>
        </div>
      </form>

      {/* Formulario edición */}
      {modoEdicion && (
        <form onSubmit={guardarEdicion} className="mb-5 p-4 rounded shadow-sm bg-warning-subtle border border-warning">
          <h4 className="mb-3 text-dark">Editar Usuario</h4>

          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Nombre"
                value={usuarioEditado.nombre}
                onChange={manejarCambio}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={usuarioEditado.email}
                onChange={manejarCambio}
                required
              />
            </div>
            <div className="col-md-4">
              <select
                name="rol"
                className="form-select"
                value={usuarioEditado.rol}
                onChange={manejarCambio}
                required
              >
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4 gap-2">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={() => setModoEdicion(false)}>Cancelar</button>
          </div>
        </form>
      )}

      {/* Lista de usuarios */}
      <ul className="list-group shadow-sm">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong className="text-capitalize">{usuario.nombre}</strong> — {usuario.email} — <em>Rol:</em> {usuario.rol}
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-warning" onClick={() => editarUsuario(usuario)}>Editar</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GestionUsuarios;

