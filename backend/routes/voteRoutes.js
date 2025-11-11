import express from "express";
import { voteCandidate, getVoteCount, getVoteHistory } from "../controllers/voteController.js";

const router = express.Router();

router.post("/vote", voteCandidate);
router.get("/results", getVoteCount);
router.get("/history", getVoteHistory);

export default router;
