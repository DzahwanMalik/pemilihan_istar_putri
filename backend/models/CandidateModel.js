import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Candidate = db.define(
  "candidate",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagePublicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mission: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    motto: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Candidate;
