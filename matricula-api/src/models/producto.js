
import sequelize from "../config/database.js";

import { DataTypes } from "sequelize";

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

    
})

export default producto;