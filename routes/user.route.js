const express = require('express');
const userController = require('./../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.findOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
