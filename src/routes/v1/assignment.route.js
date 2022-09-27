const express = require('express');
const auth = require('../../middlewares/auth');
const assignmentController = require('../../controllers/assignment.controller');

const router = express.Router();

router.route('/').post(auth(), assignmentController.create).get(auth(), assignmentController.list);

module.exports = router;
