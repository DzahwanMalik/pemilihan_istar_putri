import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { User } from "./index.js";

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
      type: DataTypes.STRING,
      allowNull: false,
    },
    motto: {
      type: DataTypes.STRING,
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

Candidate.addHook("afterDestroy", async (candidate) => {
  await User.update(
    { candidateId: null, hasVoted: false, votedAt: null },
    { where: { candidateId: candidate.id } }
  );
});

export default Candidate;

(async () => {
  await db.sync();
})();
