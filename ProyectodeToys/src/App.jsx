import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';  // Importa el AuthProvider
import Inicio from './components/web/Inicio.jsx';
import PrivateRoute from './PrivateRoute.jsx';

import Categorias from './components/web/Categorias.jsx';
import ProductosCategoria from './components/web/ProductosCategoria.jsx';
import Productos from './components/web/Productos.jsx';
import Usuarios from './components/administrador/TablaUsuarios.jsx';  
import ProductoComponent from './components/administrador/TablaProductos.jsx';
import CarritoComponent from './components/administrador/TablaCarritos.jsx';
import PedidoComponent from './components/administrador/TablaPedidos.jsx';
import CompraComponent from './components/administrador/TablaCompras.jsx';
import CarritoItemsComponent from './components/administrador/TablaItemCarrito.jsx';
import Layout from './components/administrador/Layout.jsx';
import GestionImagenesProductos from './components/administrador/TablaImagenes.jsx';
import PurchaseHistory from './components/web/Historial.jsx';
import OrderHistory from './components/web/Pedidos.jsx';
import FormularioPago from './components/web/FormularioPago.jsx';
import Sesion from './sesion.jsx';
import Header from './components/web/Header.jsx';
import UserProfile from './components/web/Perfil.jsx';
import CrearCuenta from './crear.jsx';

function App() {
  return (
    <AuthProvider>  {/* Envuelve la aplicación en el AuthProvider */}
    <Router>
    
      <Routes>
      
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Sesion />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:nombreCategoria" element={<ProductosCategoria />} />
        <Route path="/productos/:nombreProducto" element={<Productos />} />

        
        <Route path="/admin" element={<PrivateRoute requiredRole="admin"><Layout /></PrivateRoute>}>
          <Route index element={<Usuarios />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
          <Route path="/admin/productos" element={<ProductoComponent />} />
          <Route path="/admin/carritos" element={<CarritoComponent />} />
          <Route path="/admin/pedidos" element={<PedidoComponent />} />
          <Route path="/admin/compras" element={<CompraComponent />} />
          <Route path="/admin/itemcarrito/:id" element={<CarritoItemsComponent />} />
          <Route path="/admin/imagenes" element={<GestionImagenesProductos />} />
        </Route>
        
        <Route path="/perfil" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/historial" element={<PrivateRoute><PurchaseHistory /></PrivateRoute>} />
        <Route path="/pedidos" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
        
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
