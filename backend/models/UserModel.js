import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenisKelamin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasVoted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    votedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    candidateId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

User.addHook("afterDestroy", async (user) => {
  const { Candidate } = await import("./index.js");
  if (user.candidateId) {
    const candidate = await Candidate.findByPk(user.candidateId);
    if (candidate && candidate.votes > 0) {
      await Candidate.decrement("votes", { where: { id: user.candidateId } });
    }
  }
});

export default User;
