import React, { useState, useEffect } from 'react';
import './CarritoComponent.css';

const CarritoComponent = () => {
  const [carritos, setCarritos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCarrito, setNewCarrito] = useState({ id_usuario: '', estado: 'activo', total: 0 });

  // Fetch all carritos
  const fetchCarritos = async () => {
    try {
      const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/carrito');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setCarritos(data);
    } catch (error) {
      console.error('Error fetching carritos:', error);
      alert('Failed to fetch carritos');
    }
  };

  // Create a new carrito
  const createCarrito = async () => {
    try {
      const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCarrito),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      fetchCarritos(); // Refresh the list
      setShowModal(false); // Close modal
    } catch (error) {
      console.error('Error creating carrito:', error);
      alert('Failed to create carrito');
    }
  };

  // Load carritos on component mount
  useEffect(() => {
    fetchCarritos();
  }, []);

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h1>Gestión de Carritos</h1>
        <button onClick={() => setShowModal(true)} className="btn-add">
          Agregar Carrito
        </button>
      </div>

      <table className="carrito-table">
        <thead>
          <tr>
            <th>ID Carrito</th>
            <th>ID Usuario</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carritos.map((carrito) => (
            <tr key={carrito.id}>
              <td>{carrito.id}</td>
              <td>{carrito.id_usuario}</td>
              <td>{carrito.estado}</td>
              <td>${carrito.total}</td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => window.location.href = `/admin/itemcarrito/${carrito.id}`} className="btn-view">
                    Ver Items
                  </button>
                  {carrito.estado === 'activo' && (
                    <button onClick={() => updateCarritoStatus(carrito.id, 'completado')} className="btn-complete">
                      Completar
                    </button>
                  )}
                  <button onClick={() => removeCarrito(carrito.id)} className="btn-delete">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Nuevo Carrito</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createCarrito();
              }}
            >
              <div className="form-group">
                <label>ID Usuario</label>
                <input
                  type="number"
                  value={newCarrito.id_usuario}
                  onChange={(e) => setNewCarrito({ ...newCarrito, id_usuario: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Total</label>
                <input
                  type="number"
                  value={newCarrito.total}
                  onChange={(e) => setNewCarrito({ ...newCarrito, total: e.target.value })}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save">Guardar</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoComponent;
