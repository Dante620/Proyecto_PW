// src/models/carrito.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import usuario from './usuario.js';  // Asegúrate de que la ruta al modelo Usuario esté correcta

const carrito = sequelize.define('carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',  // Cambia 'usuario' por 'usuarios' si es necesario
            key: 'id'
        },
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false // Deshabilita createdAt y updatedAt
});

// Establecer la relación
carrito.belongsTo(usuario, { foreignKey: 'id_usuario' });

export default carrito;
