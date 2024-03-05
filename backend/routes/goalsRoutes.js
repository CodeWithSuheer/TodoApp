import express from "express";
import { protect } from "../middlewares/userMiddleware.js";
import { createGoal, deleteGoal, getGoal, updateGoal } from "../controllers/goalsController.js";

const router = express.Router();

router.route('/').get(protect, getGoal).post(protect, createGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

export default router;