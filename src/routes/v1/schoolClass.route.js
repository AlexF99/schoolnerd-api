const express = require('express');
const auth = require('../../middlewares/auth');
const schoolClassController = require('../../controllers/schoolClass.controller');

const router = express.Router();

router.route('/').post(auth(), schoolClassController.createClass).get(auth(), schoolClassController.getClasses);

module.exports = router;
