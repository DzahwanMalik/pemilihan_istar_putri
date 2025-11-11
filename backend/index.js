import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import UserRoute from "./routes/UserRoutes.js";
import AdminRoute from "./routes/AdminRoutes.js";
import CandidateRoute from "./routes/CandidateRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: "https://pemilihan-istar-putra.vercel.app",
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));
app.use(express.json());

app.use(UserRoute);
app.use(AdminRoute);
app.use(CandidateRoute);
app.use(voteRoutes);

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.log("Database not connected...", error.message);
}

app.get("/", (req, res) => {
  res.send("Backend running successfully!");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
