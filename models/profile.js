import { DataTypes, Model } from "sequelize";

import sequelize from "../libs/sequelize.js";

class Profile extends Model { }

Profile.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uniqueId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.TEXT,
    }
}, {
    sequelize,
    modelName: "Profile"
})

export default Profile