const express = require('express');
const schoolClassController = require('../../controllers/schoolClass.controller');

const router = express.Router();

router.route('/').post(schoolClassController.createClass).get(schoolClassController.getClasses);

module.exports = router;
