import './App.css';
import Navbar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Pokedex from './pages/Pokedex';
import Admin from './pages/Admin';
import Error from './pages/Error';
import AdminRoute from './components/AdminRoute';
import RutaProtegida from './components/RutaProtegida';
import GestionUsuarios from './pages/GestionUsuarios';
import TestPoke from './pages/TestPoke';
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testpoke" element={<TestPoke />} />

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
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } 
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
