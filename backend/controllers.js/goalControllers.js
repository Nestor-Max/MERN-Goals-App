const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');
//@desc  Get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });
	res.status(200).json(goals);
});

//@desc  Post goal
//@route POST /api/goals
//@access private
const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(404);
		throw new Error('Please add a text field');
	}

	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});

	res.status(200).json(goal);
});

//@desc  Put goal
//@route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(404);
		throw new Error('Please add a goal');
	}

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedGoal);
});

//@desc  Delete goal
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(404);
		throw new Error('Please add a goal');
	}

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
	res.status(200).json(deletedGoal);
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
