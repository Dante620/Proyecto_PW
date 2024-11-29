
import sequelize from "../config/database.js";

import { DataTypes } from "sequelize";

const categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false // Deshabilita createdAt y updatedAt
});

export default categoria;