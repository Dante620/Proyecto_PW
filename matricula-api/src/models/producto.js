
import sequelize from "../config/database.js";

import { DataTypes } from "sequelize";
import categoria from "./categoria.js";
import marca from "./marca.js";

const producto = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    precio:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_categoria:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categoria',
            key: 'id'
        }
    },
    id_marca:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'marcas',
            key: 'id'
        }
    }

    
}, {
    timestamps: false // Deshabilita createdAt y updatedAt
});

// Establecer la relación
producto.belongsTo(categoria, { foreignKey: 'id_categoria' });
producto.belongsTo(marca, { foreignKey: 'id_marca' });

export default producto;