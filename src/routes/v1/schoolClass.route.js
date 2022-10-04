const express = require('express');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/schoolClass.controller');

const router = express.Router();

router.route('/').post(auth(), controller.create).get(auth(), controller.list);

router.route('/:id').get(auth(), controller.get).patch(auth(), controller.update).delete(auth(), controller.remove);

module.exports = router;
