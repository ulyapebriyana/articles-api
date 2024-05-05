import { DataTypes, Model } from "sequelize";

import sequelize from "../libs/sequelize.js";

class Like extends Model { }

Like.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
}, {
    sequelize,
    modelName: "Like"
})

export default Like


