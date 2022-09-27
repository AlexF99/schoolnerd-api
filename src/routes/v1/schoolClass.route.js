const express = require('express');
const auth = require('../../middlewares/auth');
const schoolClassController = require('../../controllers/schoolClass.controller');

const router = express.Router();

router.route('/').post(auth(), schoolClassController.create).get(auth(), schoolClassController.list);

router.route('/:id').get(auth(), schoolClassController.get);

module.exports = router;
