import React, { useState, useEffect } from 'react';
import './ProductoTabla.css';
const ProductoComponent = () => {
  // State for managing products and form data
  const [productos, setProductos] = useState([]);
  const [currentProducto, setCurrentProducto] = useState({
    id: null,
    nombre: '',
    descripcion: '',
    precio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all products
  const findAll = async () => {
    try {
      const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/producto');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    }
  };

  // Find one product by ID
  const findOne = async (id) => {
    try {
      const response = await fetch(`https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/producto/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCurrentProducto(data);
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product');
    }
  };

  // Create a new product
  const create = async () => {
    try {
      const { id, ...productData } = currentProducto;
      const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      findAll();
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
      findAll();
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
      findAll();
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
      precio: ''
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
    setCurrentProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load products on component mount
  useEffect(() => {
    findAll();
  }, []);

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
              <td>
                <div className="action-buttons">
                  <button 
                    onClick={() => findOne(producto.id)} 
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
            <form onSubmit={(e) => {
              e.preventDefault();
              isEditing ? update() : create();
            }}>
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
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="btn-cancel"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                >
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