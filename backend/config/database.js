import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("pemilihan_istar_putri_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
