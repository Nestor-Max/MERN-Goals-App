const asyncHandler = require('express-async-handler');
//@desc  Get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: 'Get goals',
	});
});

//@desc  Post goal
//@route POST /api/goals
//@access private
const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(404);
		throw new Error('Please add a text field');
	}

	res.status(200).json({
		message: `Created goal ${req.body.text}`,
	});
});

//@desc  Put goal
//@route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `Update goal ${req.params.id}`,
	});
});

//@desc  Delete goal
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
	res.status(200).json({
		message: `Delete goal ${req.params.id}`,
	});
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
