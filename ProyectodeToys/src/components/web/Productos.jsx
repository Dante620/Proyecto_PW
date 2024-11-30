import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import './Productos.css';

import Header from './Header.jsx';
const Productos = () => {
    const { nombreProducto } = useParams();
    const nombreDecodificado = decodeURIComponent(nombreProducto);
    const [producto, setProducto] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [marca, setMarca] = useState(null);
    const [imagenPrincipal, setImagenPrincipal] = useState('');
    const [showSearchModal, setShowSearchModal] = useState(false);


    // Cargar las imágenes del producto
    const cargarImagenes = async () => {
        try {
            const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/imagenesproductos');
            if (!response.ok) {
                throw new Error('Error al cargar las imágenes');
            }
            const data = await response.json();
            setImagenes(data);

            // Filtrar las imágenes que pertenecen al producto y establecer la primera como la imagen principal
            const imagenesProducto = data.filter(img => img.id_producto === producto?.id);
            if (imagenesProducto.length > 0 && !imagenPrincipal) {
                setImagenPrincipal(imagenesProducto[0].url); // Establecer la primera imagen del producto como la principal
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Cargar los detalles del producto
    const cargarProducto = async () => {
        try {
            const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/producto');
            if (!response.ok) {
                throw new Error('Error al cargar el producto');
            }
            const data = await response.json();

            const productoSeleccionado = data.find(p => p.nombre.toLowerCase() === nombreDecodificado.toLowerCase());
            if (productoSeleccionado) {
                setProducto(productoSeleccionado);
                const marcaResponse = await fetch(`https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/marca/${productoSeleccionado.id_marca}`);
                const marcaData = await marcaResponse.json();
                setMarca(marcaData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarProducto();
    }, [nombreDecodificado]);

    useEffect(() => {
        if (producto) {
            cargarImagenes();
        }
    }, [producto]);

    if (!producto) {
        return <p>Cargando producto...</p>;
    }

    return (
        <div>

            <Header showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal} />

             
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

            <div className="producto-contenedor">
                {/* Sección de imágenes */}
                <div className="imagenes-seccion">
                    <div className="imagen-principal">
                        {imagenPrincipal && <img src={`../${imagenPrincipal}`} alt={producto.nombre} />}
                    </div>
                    <div className="imagenes-secundarias">
                        {imagenes
                            .filter(img => img.id_producto === producto.id)
                            .map(img => (
                                <img
                                    key={img.id}
                                    src={`../${img.url}`}
                                    alt={producto.nombre}
                                    onClick={() => setImagenPrincipal(img.url)}
                                    className="miniatura"
                                />
                            ))}
                    </div>
                </div>

                {/* Sección de información del producto */}
                <div className="producto-info">
                    <h2>{producto.nombre}</h2>
                    <p><strong>Marca:</strong> {marca ? marca.nombre : 'Desconocida'}</p>
                    <p><strong>Precio:</strong> S/ {producto.precio}</p>
                    <button className="btn-agregar-carrito">Agregar al carrito</button>
                    <div className="descripcion">
                        <h3>Descripción</h3>
                        <p>{producto.descripcion || 'No disponible.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productos;
