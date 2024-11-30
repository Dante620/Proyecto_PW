import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FormularioPago.css';
import Header from './Header';

const FormularioPago = () => {
    const navigate = useNavigate();
    const { idusuario, idcarrito } = useParams();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [formData, setFormData] = useState({
        metodoPago: '',
        direccion: '',
        // Add additional fields for each payment method
        numeroCuenta: '',
        banco: '',
        numeroTarjeta: '',
        fechaVencimiento: '',
        correoPypal: ''
    });

    const API_BASE_URL = 'https://webprogra-api-anhyamamfkdebbcg.eastus2-01.azurewebsites.net';

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartResponse = await fetch(`${API_BASE_URL}/itemcarrito/${idcarrito}`);
                const cartItems = await cartResponse.json();

                const itemsWithDetails = await Promise.all(cartItems.map(async (item) => {
                    const productResponse = await fetch(`${API_BASE_URL}/producto/${item.id_producto}`);
                    const productDetails = await productResponse.json();

                    return {
                        ...item,
                        nombre: productDetails.nombre,
                        precio: productDetails.precio
                    };
                }));

                setItems(itemsWithDetails);

                const totalCarrito = itemsWithDetails.reduce((acc, item) =>
                    acc + item.precio * item.cantidad, 0);
                setTotal(totalCarrito);
            } catch (err) {
                console.error('Error al obtener los detalles del carrito:', err);
            }
        };

        fetchCartItems();
    }, [idcarrito]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pedidoData = {
            id_usuario: idusuario,
            id_carrito: idcarrito,
            total,
            metodoPago: formData.metodoPago,
            direccion: formData.direccion
        };

        fetch(`${API_BASE_URL}/pedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidoData)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Pedido creado:', data);
                alert('Pedido realizado exitosamente');
                navigate('/');
            })
            .catch((err) => console.error('Error al crear el pedido:', err));
    };

    return (
        <div className="header">
            <Header />
            <div className="payment-container">
                <div className="cart-details">
                    <h2>Detalles del Carrito</h2>
                    <ul className="cart-items">
                        {items.map((item) => (
                            <li key={item.id} className="cart-item">
                                <span className="item-name">{item.nombre}</span>
                                <div className="item-details">
                                    <span>Cantidad: {item.cantidad}</span>
                                    <span>Precio: S/ {item.precio}</span>
                                    <span>Subtotal: S/ {item.cantidad * item.precio}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <h3>Total: S/ {total.toFixed(2)}</h3>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="payment-form">
                    <h2>Confirmación de Pago</h2>
                    <div className="form-group">
                        <label htmlFor="metodoPago">Método de Pago</label>
                        <select
                            id="metodoPago"
                            name="metodoPago"
                            value={formData.metodoPago}
                            onChange={handleChange}
                            required
                            className="form-input"
                        >
                            <option value="">Seleccione un método</option>
                            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                            <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
                            <option value="Tarjeta de Debito">Tarjeta de Débito</option>
                            <option value="Paypal">Paypal</option>
                        </select>
                    </div>

                    {formData.metodoPago && (
                        <div className="payment-details">
                            {formData.metodoPago === 'Transferencia Bancaria' && (
                                <div className="method-details">
                                    <h4>Detalles para Transferencia Bancaria</h4>
                                    <input
                                        type="text"
                                        name="numeroCuenta"
                                        placeholder="Número de cuenta"
                                        value={formData.numeroCuenta}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    <input
                                        type="text"
                                        name="banco"
                                        placeholder="Banco"
                                        value={formData.banco}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            )}
                            {(formData.metodoPago === 'Tarjeta de Credito' || formData.metodoPago === 'Tarjeta de Debito') && (
                                <div className="method-details">
                                    <h4>{formData.metodoPago === 'Tarjeta de Credito' ? 'Detalles para Tarjeta de Crédito' : 'Detalles para Tarjeta de Débito'}</h4>
                                    <input
                                        type="text"
                                        name="numeroTarjeta"
                                        placeholder="Número de Tarjeta"
                                        value={formData.numeroTarjeta}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    <input
                                        type="text"
                                        name="fechaVencimiento"
                                        placeholder="Fecha de Vencimiento (MM/YY)"
                                        value={formData.fechaVencimiento}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            )}
                            {formData.metodoPago === 'Paypal' && (
                                <div className="method-details">
                                    <h4>Detalles para Paypal</h4>
                                    <input
                                        type="email"
                                        name="correoPypal"
                                        placeholder="Correo de Paypal"
                                        value={formData.correoPypal}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="submit-button">Realizar Pedido</button>
                </form>
            </div>
        </div>
    );
};

export default FormularioPago;
