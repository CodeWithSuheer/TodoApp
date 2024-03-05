import asyncHandler from 'express-async-handler';
import { Goals } from '../models/goalsModel.js';
import { User } from '../models/userModel.js';

// @desc    Create goals
// @route   POST /api/goals
// @access  Private
export const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goals.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal)
})

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goals.find({ user: req.user.id });
    res.status(200).json(goals)
})

// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req, res) => {
    const goals = await Goals.findById(req.params.id);

    if (!goals) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // const user = await User.findById(req.user.id);

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goals.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoals = await Goals.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoals);
})

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req, res) => {
    const goals = await Goals.findById(req.params.id);

    if (!goals) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if (goals.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goals.deleteOne()

    res.status(200).json({
        id: req.params.id
    });
})