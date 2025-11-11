import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteUsers,
  loginUser,
  importUsers,
} from "../controllers/UserController.js";
import uploadExcel from "../middleware/uploadExcel.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.post("/users/import", uploadExcel.single("file"), importUsers);
router.post("/users/login", loginUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.delete("/users", deleteUsers);


export default router;
