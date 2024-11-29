import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/web/Inicio';
import Sesion from './components/Sesion';
import Crear from './components/Usuario/Crear';
import Categorias from './components/web/Categorias.jsx'
import ProductosCategoria from './components/web/ProductosCategoria.jsx'
import Productos from './components/web/Productos.jsx'
import Usuarios from './components/administrador/TablaUsuarios.jsx';  
import ProductoComponent from './components/administrador/TablaProductos.jsx';
import CarritoComponent from './components/administrador/TablaCarritos.jsx';
import PedidoComponent from './components/administrador/TablaPedidos.jsx';
import CompraComponent from './components/administrador/TablaCompras.jsx';
import CarritoItemsComponent from './components/administrador/TablaItemCarrito.jsx';
import Layout from './components/administrador/Layout.jsx';
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
        <Route path="/admin" element={<Layout />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/productos" element={<ProductoComponent />} />
        <Route path="/admin/carritos" element={<CarritoComponent />} />
        <Route path="/admin/pedidos" element={<PedidoComponent />} />
        <Route path="/admin/compras" element={<CompraComponent />} />
        <Route path="/admin/itemcarrito/:id" element={<CarritoItemsComponent />} />

      </Routes>
    </Router>
  );
}

export default App;
