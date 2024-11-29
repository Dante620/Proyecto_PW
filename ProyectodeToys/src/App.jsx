import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/web/Inicio';
import Sesion from './components/Sesion';
import Crear from './components/Usuario/Crear';
import Categorias from './components/web/categorias.jsx'
import ProductosCategoria from './components/web/ProductosCategoria.jsx'
import Productos from './components/web/Productos.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Register" element={<Crear />} />
        <Route path="/login" element={<Sesion />} />
        <Route path="/categorias" element={<Categorias />}/>
        <Route path="/categorias/:nombreCategoria" element={<ProductosCategoria />}/>
        <Route path="/productos/:nombreProducto" element={<Productos />}/>

      </Routes>
    </Router>
  );
}

export default App;
