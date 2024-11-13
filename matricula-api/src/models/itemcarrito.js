import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import carrito from "./carrito.js"; // Import your Carrito model
import producto from "./producto.js"; // Import your Producto model

const itemcarrito = sequelize.define('item_carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_carrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carritos',
            key: 'id'
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});



// Define the relationships
itemcarrito.belongsTo(carrito, { foreignKey: 'id_carrito' });
itemcarrito.belongsTo(producto, { foreignKey: 'id_producto' });



export default itemcarrito;
