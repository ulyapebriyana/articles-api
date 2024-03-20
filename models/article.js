import { DataTypes, Model } from "sequelize";

import sequelize from "../libs/sequelize.js";

class Article extends Model {}

Article.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: "Article"
})

export default Article