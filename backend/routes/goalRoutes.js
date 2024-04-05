const express = require('express');
const {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers.js/goalControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getGoals).post(protect, createGoal);

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
