import './App.css';
import Navbar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Pokedex from './pages/Pokedex';
import Admin from './pages/Admin';
import Error from './pages/Error';
import AdminRuta from './components/AdminRuta';
import RutaProtegida from './components/RutaProtegida';
import GestionUsuarios from './pages/GestionUsuarios';
import { AuthProvider } from './context/AuthContext'; 
import VolverArriba from './components/VolverArriba';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/pokedex" 
            element={
              <RutaProtegida>
                <Pokedex />
              </RutaProtegida>
            } 
          />

          <Route path="/admin/usuarios" element={<GestionUsuarios />} />
          <Route 
            path="/admin" 
            element={
              <AdminRuta>
                <Admin />
              </AdminRuta>
            } 
          />

          <Route path="*" element={<Error />} />
        </Routes>
         <VolverArriba />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
