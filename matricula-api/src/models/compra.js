import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import usuario from "./usuario.js";
import carrito from "./carrito.js";

const compra = sequelize.define('compra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carritos',
            key: 'id'
        }
    },

    tipoPago: {
        type: DataTypes.STRING,
        allowNull: false
    },

    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false // Deshabilita createdAt y updatedAt
});

// Relaciones
compra.belongsTo(usuario, { foreignKey: 'id_usuario' });
compra.belongsTo(carrito, { foreignKey: 'id_carrito' });

export default compra;
