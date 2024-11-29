
import sequelize from "../config/database.js";
import producto from "./producto.js";
import { DataTypes } from "sequelize";

const imagenesproducto = sequelize.define('imagenesproducto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id'
        }
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, {
    timestamps: false // Deshabilita createdAt y updatedAt
});

imagenesproducto.belongsTo(producto, { foreignKey: 'id_producto' });

export default imagenesproducto;