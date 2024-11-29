import React, {useState} from 'react';
import './Crear.css';
import { Link } from 'react-router-dom'; 

const Crear = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <div className="login-page">
       <header id="main-header">
                <a href='/App.jsx' id="logo-link">
                    <img src="../../imagenes/Imagen1.jpg" alt="Logo" id="logo-image" />
                </a>
                <ul id="menu">
                <a href="/categorias" className="menu-link">📁 CATEGORÍAS</a>
                <li class="menu-item">
                <a href="/categorias/Pre-venta" className="menu-link">🔜 PRE-VENTA</a>
                 </li>
                    <li className="menu-item">💰 MASTER POINTS</li>
                    <li className="menu-item">🤖 CLUB TOYS MASTER</li>
                    <li className="menu-item">🙂 RESEÑAS</li>
                </ul>
                <ul id="social-icons">
                <li onClick={() => setShowSearchModal(true)}>
                        <img src="../../imagenes/Imagen29.jpg" alt="Search Icon" className="social-icon" />
                    </li>
                    <li>
                        
                        <Link to="/login">
                            <img src="../../imagenes/Imagen30.jpg" alt="User Icon" className="social-icon" />
                        </Link>
                    </li>
                    
                    <li><img src="../../imagenes/Imagen31.jpg" alt="Social 3" className="social-icon" /></li>
                    <li><img src="../../imagenes/Imagen32.jpg" alt="Social 4" className="social-icon" /></li>
                </ul>
            </header>
            {showSearchModal && (
                <div className="search-overlay">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Búsqueda"
                            className="search-bar-input"
                        />
                        <button className="search-bar-close" onClick={() => setShowSearchModal(false)}>
                            X
                        </button>
                    </div>
                </div>
            )}
      <div className="login-container"> 
        <form>
        <input type="text" placeholder="Nombre"/>
        <input type="text" placeholder="Apellido"/>
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <input type="password" placeholder="Repetir contraseña" required />
        <button className="login-button">Crear</button>
        </form>
        
      </div>
      <footer>
        <p>© 2024, Toys Master Tecnología de Shopify</p>
        <p>Notifications Powered by RocketPush</p>
      </footer>
     </div>
     
  )}
  export default Crear;