import React from 'react';
import Sidebar from './PaginaPrincipal.jsx'; // Tu barra lateral
import { Outlet } from 'react-router-dom';
import './layout.css';

const Layout = () => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>
      
      {/* Contenido dinámico */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
