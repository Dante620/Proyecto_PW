import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './../../AuthContext.jsx'; // Import the custom hook

const Header = ({ setShowSearchModal }) => {
    const { user, logout } = useAuth();

    return (
        <header id="main-header">
            <Link to="/" id="logo-link">
                <img src="../../imagenes/Imagen1.jpg" alt="Logo" id="logo-image" />
            </Link>

            <nav>
                <ul id="menu">
                    <li className="menu-item">
                        <Link to="/categorias" className="menu-link">📁 CATEGORÍAS</Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/categorias/Pre-venta" className="menu-link">🔜 PRE-VENTA</Link>
                    </li>
                    <li className="menu-item">💰 MASTER POINTS</li>
                    <li className="menu-item">🤖 CLUB TOYS MASTER</li>
                    <li className="menu-item">🙂 RESEÑAS</li>
                </ul>
            </nav>

            <ul id="social-icons">
                <li onClick={() => setShowSearchModal(true)}>
                    <img src="../../imagenes/Imagen29.jpg" alt="Search Icon" className="social-icon" />
                </li>
                <li>
                    
                    <Link to="/perfil">
                        <img src="../../imagenes/Imagen30.jpg" alt="User Icon" className="social-icon" />
                    </Link>

                    
                </li>
                <li>
                    <img src="../../imagenes/Imagen31.jpg" alt="Social 3" className="social-icon" />
                </li>
                <li>
                    <img src="../../imagenes/Imagen32.jpg" alt="Social 4" className="social-icon" />
                </li>
                
                {user && user.rol === 'admin' && (
                        <li>
                            <Link to="/admin">Panel de administración</Link>  {/* Icono de Panel solo para admin */}
                        </li>
                    )}
                    {user ? (
                        <li>
                            <button onClick={logout}>Cerrar sesión</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Iniciar sesión</Link>
                        </li>
                    )}
                
            </ul>
        </header>
    );
};

export default Header;
