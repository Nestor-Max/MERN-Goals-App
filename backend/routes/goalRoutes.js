const express = require('express');
const {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers.js/goalControllers');
const router = express.Router();

router.route('/').get(getGoals).post(createGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
