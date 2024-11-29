import React, { useState, useEffect } from 'react';
import './ComprasTabla.css'; // Reusing the same CSS file for consistency

const CompraComponent = () => {
  const [compras, setCompras] = useState([]);
  const [carritoItems, setCarritoItems] = useState([]);
  const [currentCompra, setCurrentCompra] = useState({
    id_usuario: '',
    id_carrito: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

  // Fetch all compras
  const findAll = async () => {
    try {
      const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/compra');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error('Error fetching compras:', error);
      alert('Failed to fetch compras');
    }
  };

  // Fetch carrito total
  const fetchCarritoTotal = async (carritoId) => {
    try {
      const response = await fetch(`https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/carrito/${carritoId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.total;
    } catch (error) {
      console.error('Error fetching carrito total:', error);
      alert('Failed to fetch carrito total');
      return 0;
    }
  };

  // Fetch carrito items
  const fetchCarritoItems = async (carritoId) => {
    try {
      const response = await fetch(`https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/itemcarrito/${carritoId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCarritoItems(data);
      setIsItemsModalOpen(true);
    } catch (error) {
      console.error('Error fetching carrito items:', error);
      alert('Failed to fetch carrito items');
    }
  };

  // Create a new compra
  const create = async () => {
    try {
      // Fetch the total from the carrito
      const total = await fetchCarritoTotal(currentCompra.id_carrito);

      // Prepare compra data with total
      const compraData = {
        ...currentCompra,
        total: total
      };

      const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/compra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compraData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      findAll();
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating compra:', error);
      alert('Failed to create compra');
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setCurrentCompra({
      id_usuario: '',
      id_carrito: ''
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCompra((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Load compras on component mount
  useEffect(() => {
    findAll();
  }, []);

  return (
    <div className="pedido-container">
      <div className="pedido-header">
        <h1>Compras</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-add">
          Agregar Nueva Compra
        </button>
      </div>

      <table className="pedido-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Usuario</th>
            <th>ID Carrito</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.id}>
              <td>{compra.id}</td>
              <td>{compra.id_usuario}</td>
              <td>{compra.id_carrito}</td>
              <td>${compra.total}</td>
              <td>
                <div className="action-buttons">
                <button
                    onClick={() => (window.location.href = `/admin/itemcarrito/${compra.id_carrito}`)}
                    className="btn-view"
                  >
                    Ver Items
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nueva Compra Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Nueva Compra</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                create();
              }}
            >
              <div className="form-group">
                <label htmlFor="id_usuario">ID Usuario</label>
                <input
                  id="id_usuario"
                  name="id_usuario"
                  type="number"
                  value={currentCompra.id_usuario}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_carrito">ID Carrito</label>
                <input
                  id="id_carrito"
                  name="id_carrito"
                  type="number"
                  value={currentCompra.id_carrito}
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
                <button type="submit" className="btn-submit">
                  Crear Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
        
    </div>
  );
};

export default CompraComponent;