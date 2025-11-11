import express from "express";
import {
  getCandidates,
  getCandidateById,
  removeCandidateById,
  removeCandidates,
  createCandidate,
  updateCandidate,
} from "../controllers/CandidateController.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.get("/candidates", getCandidates);
router.get("/candidates/:id", getCandidateById);
router.post("/candidates", uploadImage.single("image"), createCandidate);
router.patch("/candidates/:id", uploadImage.single("image"), updateCandidate);
router.delete("/candidates/:id", removeCandidateById);
router.delete("/candidates", removeCandidates);

export default router;
