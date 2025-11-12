import User from "./UserModel.js";
import Candidate from "./CandidateModel.js";
import Admin from "./AdminModel.js";
import db from "../config/database.js";

// Setiap user hanya bisa memilih satu kandidat
User.belongsTo(Candidate, {
  as: "votedCandidate",
  foreignKey: "candidateId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

// Satu candidate bisa dipilih oleh banyak users
Candidate.hasMany(User, {
  as: "voters",
  foreignKey: "candidateId",
});

export { User, Candidate, Admin };

(async () => {
  await db.sync();
})();
