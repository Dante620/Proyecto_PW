import React, { useState, useEffect } from "react";
import './UsuarioTabla.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [currentUsuario, setCurrentUsuario] = useState({
      id: null,
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rol: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Fetch all users
    const findAll = async () => {
      try {
        const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/usuario');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users');
      }
    };
  
    // Find one user by ID
    const findOne = async (id) => {
      try {
        const response = await fetch(`https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/usuario/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCurrentUsuario(data);
        setIsEditing(true);
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error fetching user:', error);
        alert('Failed to fetch user');
      }
    };
  
    // Create a new user
    const create = async () => {
      try {
        const { id, ...userData } = currentUsuario;
        const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        findAll();
        resetForm();
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user');
      }
    };
  
    // Update an existing user
    const update = async () => {
      try {
        const response = await fetch('https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/usuario', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentUsuario)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        findAll();
        resetForm();
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update user');
      }
    };
  
    // Remove a user
    const remove = async (id) => {
      try {
        const response = await fetch(`https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net/usuario/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Network response was not ok');
        findAll();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    };
  
    // Reset form to initial state
    const resetForm = () => {
      setCurrentUsuario({
        id: null,
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: ''
      });
      setIsEditing(false);
    };
  
    // Open modal for adding/editing user
    const openModal = (usuario = null) => {
      if (usuario) {
        setCurrentUsuario(usuario);
        setIsEditing(true);
      } else {
        resetForm();
      }
      setIsModalOpen(true);
    };
  
    // Handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentUsuario((prev) => ({
        ...prev,
        [name]: value
      }));
    };
  
    // Load users on component mount
    useEffect(() => {
      findAll();
    }, []);
  
    return (
      <div className="usuario-container">
        <div className="usuario-header">
          <h1>Usuarios</h1>
          <button onClick={() => openModal()} className="btn-add">
            Agregar Nuevo Usuario
          </button>
        </div>
  
        <table className="usuario-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => findOne(usuario.id)}
                      className="btn-edit"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => remove(usuario.id)}
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
              <h2>{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
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
                    value={currentUsuario.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    id="apellido"
                    name="apellido"
                    value={currentUsuario.apellido}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={currentUsuario.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={currentUsuario.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rol">Rol</label>
                  <input
                    id="rol"
                    name="rol"
                    value={currentUsuario.rol}
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

export default Usuarios;
