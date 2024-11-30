import React, { useState, useEffect } from 'react';
import './ProductoTabla.css';

const ProductoComponent = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [currentProducto, setCurrentProducto] = useState({
        id: null,
        nombre: '',
        descripcion: '',
        precio: '',
        id_categoria: '',
        id_marca: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch all products
    const findAll = async () => {
        try {
            const productosResponse = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/producto');
            const categoriasResponse = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/categoria');
            const marcasResponse = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/marca');

            if (!productosResponse.ok) throw new Error('Network response was not ok');
            if (!categoriasResponse.ok) throw new Error('Network response was not ok');
            if (!marcasResponse.ok) throw new Error('Network response was not ok');

            const productosData = await productosResponse.json();
            const categoriasData = await categoriasResponse.json();
            const marcasData = await marcasResponse.json();

            setProductos(productosData);
            setCategorias(categoriasData);
            setMarcas(marcasData);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data');
        }
    };

    // Create a new product
    const create = async () => {
        try {
            const maxId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) : 0;

            const newProducto = {
                ...currentProducto,
                id: maxId + 1
            };

            const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProducto)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            
            setProductos([...productos, newProducto]);
            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product');
        }
    };

    // Update an existing product
    const update = async () => {
        try {
            const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/producto', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentProducto)
            });
            if (!response.ok) throw new Error('Network response was not ok');

            // Update product in the local state without changing the order
            setProductos(productos.map(p => (p.id === currentProducto.id ? currentProducto : p)));
            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };

    // Remove a product
    const remove = async (id) => {
        try {
            const response = await fetch(`https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/producto/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setProductos(productos.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    // Reset form to initial state
    const resetForm = () => {
        setCurrentProducto({
            id: null,
            nombre: '',
            descripcion: '',
            precio: '',
            id_categoria: '',
            id_marca: ''
        });
        setIsEditing(false);
    };

    // Open modal for adding/editing product
    const openModal = (producto = null) => {
        if (producto) {
            setCurrentProducto(producto);
            setIsEditing(true);
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProducto((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Load products on component mount
    useEffect(() => {
        findAll();
    }, []);

    // Get category name
    const getCategoryName = (id_categoria) => {
        const categoria = categorias.find(cat => cat.id === Number(id_categoria));
        return categoria ? categoria.nombre : 'N/A';
    };

    // Get brand name
    const getMarcaName = (id_marca) => {
        const marca = marcas.find(marc => marc.id === Number(id_marca));
        return marca ? marca.nombre : 'N/A';
    };

    return (
        <div className="producto-container">
            <div className="producto-header">
                <h1>Productos</h1>
                <button onClick={() => openModal()} className="btn-add">
                    Agregar Nuevo Producto
                </button>
            </div>

            <table className="producto-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Marca</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>${producto.precio}</td>
                            <td>{getCategoryName(producto.id_categoria)}</td>
                            <td>{getMarcaName(producto.id_marca)}</td>
                            <td>
                                <div className="action-buttons">
                                    <button
                                        onClick={() => openModal(producto)}
                                        className="btn-edit"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => remove(producto.id)}
                                        className="btn-delete"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                isEditing ? update() : create();
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    value={currentProducto.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion">Descripción</label>
                                <input
                                    id="descripcion"
                                    name="descripcion"
                                    value={currentProducto.descripcion}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio">Precio</label>
                                <input
                                    id="precio"
                                    name="precio"
                                    type="number"
                                    value={currentProducto.precio}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="id_categoria">Categoría</label>
                                <select
                                    id="id_categoria"
                                    name="id_categoria"
                                    value={currentProducto.id_categoria}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione Categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="id_marca">Marca</label>
                                <select
                                    id="id_marca"
                                    name="id_marca"
                                    value={currentProducto.id_marca}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione Marca</option>
                                    {marcas.map((marca) => (
                                        <option key={marca.id} value={marca.id}>
                                            {marca.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn-cancel"
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-submit">
                                    {isEditing ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductoComponent;