import { Sequelize } from "sequelize";

const sequelize = new Sequelize('article', 'root', 'Mysqls1234', {
    host: 'localhost',
    dialect: "mysql"
});

export default sequelize