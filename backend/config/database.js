import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  import.meta.env.DB_NAME,
  import.meta.env.DB_USER,
  import.meta.env.DB_PASSWORD,
  {
    host: import.meta.env.DB_HOST,
    dialect: "mysql",
  }
);

export default db;
