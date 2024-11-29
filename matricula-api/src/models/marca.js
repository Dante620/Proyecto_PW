
import sequelize from "../config/database.js";

import { DataTypes } from "sequelize";

const marca = sequelize.define('marca', {
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

export default marca;