import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const ProductosCategoria = () => {
    const { nombreCategoria } = useParams(); // Captura el parámetro de la URL (el nombre de la categoría)
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);

    // Cargar las categorías
    const cargarCategorias = async () => {
        try {
            const response = await fetch('http://localhost:4001/categoria');
            if (!response.ok) {
                throw new Error('Error al cargar las categorías: ' + response.status);
            }
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error('Error en la solicitud de categorías:', error);
        }
    };

    // Función para cargar los productos filtrados por nombre de categoría
    const cargarProductos = async () => {
        try {
            const response = await fetch('http://localhost:4001/producto'); // Trae todos los productos
            if (!response.ok) {
                throw new Error('Error al cargar los productos: ' + response.status);
            }
            const data = await response.json();

            // Buscar el id de la categoría correspondiente al nombreCategoria de la URL
            const categoriaSeleccionada = categorias.find(categoria => categoria.nombre.toLowerCase() === nombreCategoria.toLowerCase());

            if (categoriaSeleccionada) {
                // Filtra los productos por el id de la categoría
                const productosFiltrados = data.filter(producto => producto.id_categoria === categoriaSeleccionada.id);
                setProductos(productosFiltrados); // Guarda los productos filtrados
            } else {
                setProductos([]); // Si no se encuentra la categoría, no hay productos para mostrar
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };

    // Ejecutar cuando el parámetro de categoría cambia
    useEffect(() => {
        cargarCategorias(); // Cargar las categorías al principio
    }, []);

    // Ejecuta cuando las categorías se cargan y el parámetro 'nombreCategoria' cambia
    useEffect(() => {
        if (categorias.length > 0 && nombreCategoria) {
            cargarProductos(); // Cargar los productos para la categoría seleccionada
        }
    }, [categorias, nombreCategoria]); // Dependencias: se recargan los productos si cambia el nombreCategoria o las categorias

    return (
        <>
            <header id="main-header">
    <a href='/' id="logo-link">
        <img src="../../imagenes/Imagen1.jpg" alt="Logo" id="logo-image" />
    </a>
    <ul id="menu">
        <li class="menu-item">
        <a href="/categorias" className="menu-link">📁 CATEGORÍAS</a>
        </li>
        <li class="menu-item">
        <a href="/categorias/Pre-venta" className="menu-link">🔜 PRE-VENTA</a>
        </li>
        <li class="menu-item">💰 MASTER POINTS</li>
        <li class="menu-item">🤖 CLUB TOYS MASTER</li>
        <li class="menu-item">🙂 RESEÑAS</li>
    </ul>
    <ul id="social-icons">
        <li><img src="../../imagenes/Imagen29.jpg" alt="Social 1" class="social-icon" /></li>
        <li><img src="../../imagenes/Imagen30.jpg" alt="Social 2" class="social-icon" /></li>
        <li><img src="../../imagenes/Imagen31.jpg" alt="Social 3" class="social-icon" /></li>
        <li><img src="../../imagenes/Imagen32.jpg" alt="Social 4" class="social-icon" /></li>
    </ul>
</header>
            <div style={{ padding: '20px' }}>
                <h2>Productos en la categoría: {nombreCategoria}</h2>
                <div className="productos-grid">
                    {productos.length > 0 ? (
                        productos.map((producto, index) => (
                            <div key={index} className="producto-item">
                                <h3>{producto.nombre}</h3>
                                <p>{producto.descripcion}</p>
                                <p>Precio: ${producto.precio}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos en esta categoría.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductosCategoria;
