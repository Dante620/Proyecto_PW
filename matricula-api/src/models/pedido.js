import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import usuario from "./usuario.js";
import carrito from "./carrito.js";

const pedido = sequelize.define('pedido', {
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
    
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    metodoPago: {
        type: DataTypes.STRING,
        allowNull: false
    },

    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
});

// Relaciones
pedido.belongsTo(usuario, { foreignKey: 'id_usuario' });
pedido.belongsTo(carrito, { foreignKey: 'id_carrito' });

export default pedido;
