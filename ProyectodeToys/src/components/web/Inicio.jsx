import { Link } from 'react-router-dom'; 
import React, { useState } from 'react'; 

import './Inicio.css';

const Inicio = () => {
     const [showSearchModal, setShowSearchModal] = useState(false);


    return (
        <>
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
            <div className="banner-section">
                <ul>
                    <li><img src="../../imagenes/Arriba/Imagen2.jpg" alt="Banner 1" /></li>
                    <li><img src="../../imagenes/Arriba/Imagen4.jpg" alt="Banner 2" /></li>
                </ul>
            </div>

            <div class="novedades-section">
                <h2>NOVEDADES</h2>
                <ul>
                    <li><img src="../../imagenes/Novedades/Imagen5.jpg" alt="Novedad 1"></img></li>
                    <li><img src="../../imagenes/Novedades/Imagen10.jpg" alt="Novedad 2"></img></li>
                    <li><img src="../../imagenes/Novedades/Imagen11.jpg" alt="Novedad 3"></img></li>
                    <li><img src="../../imagenes/Novedades/Imagen12.jpg" alt="Novedad 4"></img></li>
                    <li><img src="../../imagenes/Novedades/Imagen13.jpg" alt="Novedad 5"></img></li>
                    <li><img src="../../imagenes/Novedades/Imagen14.jpg" alt="Novedad 6"></img></li>
                </ul>
            </div>

            <div class="categorias-section">
                <button>CATEGORIAS</button>
                <ul>
                    <li><img src="../../imagenes/Preorden/Imagen17.jpg" alt="Preorden 1"></img></li>
                    <li><img src="../../imagenes/Preorden/Imagen18.jpg" alt="Preorden 2"></img></li>
                    <li><img src="../../imagenes/Preorden/Imagen19.jpg" alt="Preorden 3"></img></li>
                </ul>
            </div>

            <div class="productos-section">
                <h2>PRODUCTOS A MENOS DE S/.100</h2>
                <ul>
                    <li><img src="../../imagenes/cien/Imagen20.png" alt="Producto 1"></img></li>
                    <li><img src="../../imagenes/cien/Imagen21.png" alt="Producto 2"></img></li>
                    <li><img src="../../imagenes/cien/Imagen22.png" alt="Producto 3"></img></li>
                    <li><img src="../../imagenes/cien/Imagen23.png" alt="Producto 4"></img></li>
                    <li><img src="../../imagenes/cien/Imagen24.png" alt="Producto 5"></img></li>
                </ul>
            </div>


            <div class ="ver-mas">
                <button>VER MÁS</button>
                <ul>
                    <li><img src="../../imagenes/videos/video 1.png" alt="Video 1"></img></li>
                    <li><img src="../../imagenes/videos/video 2.png" alt="Video 2"></img></li>
                    <li><img src="../../imagenes/videos/video 3.png" alt="Video 3"></img></li>
                    <li><img src="../../imagenes/videos/video 4.png" alt="Video 4"></img></li>
                    <li><img src="../../imagenes/videos/video 5.png" alt="Video 5"></img></li>
                    <li><img src="../../imagenes/videos/video 6.png" alt="Video 6"></img></li>
                </ul>
                <ul>
                    <li><img src="../../imagenes/videos/video 7.png" alt="Video 7"></img></li>
                    <li><img src="../../imagenes/videos/video 8.png" alt="Video 8"></img></li>
                    <li><img src="../../imagenes/videos/video 5.png" alt="Video 9"></img></li>
                    <li><img src="../../imagenes/videos/video 9.png" alt="Video 10"></img></li>
                    <li><img src="../../imagenes/videos/video 10.png" alt="Video 11"></img></li>
                    <li><img src="../../imagenes/videos/video 11.png" alt="Video 12"></img></li>
                </ul>
            </div>

            <div class="info">
                <section>
                    <img src="../../imagenes/Imagen12.jpg" alt="Banner"></img>
                </section>
                <aside>
                    <h3>Tambien puedes recibir informacion por correo Electronico</h3>
                    <input type="text" placeholder="Ingrese su correo"></input><button>Enviar</button>
                </aside>
            </div>

            <div class="productos-mas-vendidos">
                <h2>PRODUCTOS MAS VENDIDOS</h2>
                <ul>
                    <li><img src="../../imagenes/vendidos/Imagen33.jpg" alt="Producto vendido 1"></img></li>
                    <li><img src="../../imagenes/vendidos/Imagen34.jpg" alt="Producto vendido 2"></img></li>
                    <li><img src="../../imagenes/vendidos/Imagen35.jpg" alt="Producto vendido 3"></img></li>
                    <li><img src="../../imagenes/vendidos/Imagen36.jpg" alt="Producto vendido 4"></img></li>
                    <li><img src="../../imagenes/vendidos/Imagen37.jpg" alt="Producto vendido 5"></img></li>
                </ul>
            </div>

            <div class="ver-mas2">
                <button>VER MÁS</button>
                <ul>
                    <li><img src="../../imagenes/relleno/Imagen18.jpg" alt="Relleno 1"></img></li>
                    <li><img src="../../imagenes/relleno/Imagen19.jpg" alt="Relleno 2"></img></li>
                    <li><img src="../../imagenes/relleno/Imagen20.jpg" alt="Relleno 3"></img></li>
                </ul>
            </div>

            <div class="preventas">
                <h2>PRE-VENTAS</h2>
                <ul>
                    <li><img src="../../imagenes/preventas/Imagen21.jpg" alt="Preventa 1"></img></li>
                    <li><img src="../../imagenes/preventas/Imagen22.jpg" alt="Preventa 2"></img></li>
                    <li><img src="../../imagenes/preventas/Imagen23.jpg" alt="Preventa 3"></img></li>
                    <li><img src="../../imagenes/preventas/Imagen24.jpg" alt="Preventa 4"></img></li>
                    <li><img src="../../imagenes/preventas/Imagen25.jpg" alt="Preventa 5"></img></li>
                </ul>
            </div>

            <div class="ver-mas3">
                <button>VER MÁS</button>
            </div>

            <div class ="pie-pagina">
                <ul>
                    <li>
                        <ol>
                            <li><img src="../../imagenes/Imagen26.jpg" alt="Location"></img></li>
                            <li>Av.La Paz 138, Miraflores - Lima</li>
                            <li>01-4001815 / 966 323 587</li>
                            <li>contacto@toymaster.pe</li>
                        </ol>
                    </li>
                    <li>
                        <ol class="sub1">
                            <li>Sobre Toys Master</li>
                            <li>Programa de recompensa Master Points</li>
                            <li>Acerca de las preventas</li>
                        </ol>
                    </li>
                    <li>
                        <ol class="sub1"> 
                            <li>Libro de Reclamaciones Virtual</li>
                            <li>Términos del Servicio</li>
                            <li>Política de Privacidad de Datos</li>
                            <li>Políticas de Devolución y Reembolso</li>
                            <li>Políticas de Envíos</li>
                        </ol>
                    </li>
                </ul>
            </div>


        </>
    );
};

export default Inicio;
