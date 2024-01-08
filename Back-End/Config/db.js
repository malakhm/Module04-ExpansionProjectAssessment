import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
//  connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  port:process.env.DB_PORT,
});


// testing connection
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize