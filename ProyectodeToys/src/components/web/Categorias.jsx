import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
import './categorias.css'
const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [showSearchModal, setShowSearchModal] = useState(false);


    const cargarCategorias = async () => {
        await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/categoria')
            .then(response => response.json())
            .then(data => setCategorias(data))
    }
    useEffect(() => {
        cargarCategorias();
    }, [])

    return (
        <>
             <header id="main-header">
                <a href='/' id="logo-link">
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
            <div id="categorias" style={{ padding: "20px" }}>
                <h2>Categorías</h2>
                <div className="categorias-grid">
                    {categorias.map((categoria, index) => (
                        <div key={index} className="categoria-item">
                            <a href={`/categorias/${categoria.nombre}`}>{categoria.nombre}</a>

                            {/* Reemplaza `nombre` con la propiedad que uses */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Categorias;