import React from 'react';
import './Sesion.css';
import { Link } from 'react-router-dom'; 


const Sesion = () => {
  return (
    <div className="login-page">
      <header id="main-header">
        <a href='/'>
          <img src="../../imagenes/Imagen1.jpg" alt="Logo" className="logo" />
        </a>
        <ul id="menu">
          <li className="menu-item">📁 CATEGORÍAS</li>
          <li className="menu-item">🔜 PRE-VENTA</li>
          <li className="menu-item">💰 MASTER POINTS</li>
          <li className="menu-item">🤖 CLUB TOYS MASTER</li>
          <li className="menu-item">🙂 RESEÑAS</li>
        </ul>
        <ul id="social-icons">
                <li><img src="../../imagenes/Imagen29.jpg" alt="Social 1" className="social-icon" /></li>
                    <li>
                        
                        <Link to="/login">
                            <img src="../../imagenes/Imagen30.jpg" alt="User Icon" className="social-icon" />
                        </Link>
                    </li>
                    
                    <li><img src="../../imagenes/Imagen31.jpg" alt="Social 3" className="social-icon" /></li>
                    <li><img src="../../imagenes/Imagen32.jpg" alt="Social 4" className="social-icon" /></li>
                </ul>
      </header>
      <div className="login-container">
        <h1>Inicio de sesión</h1>
        <form>
          <input type="email" placeholder="Correo electrónico" required />
          <input type="password" placeholder="Contraseña" required />
          <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          <button type="submit" className="login-button">Iniciar sesión</button>
          <Link to="/Register"><p>Crear cuenta</p></Link>
        </form>
      </div>
      <footer>
        <p>© 2024, Toys Master Tecnología de Shopify</p>
        <p>Notifications Powered by RocketPush</p>
      </footer>
    </div>
  );
};

export default Sesion;
