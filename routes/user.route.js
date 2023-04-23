const express = require('express');

const userController = require('../controllers/user.controller');
const validExistUser = require('../middlewares/user.middleware');
const validFieldUser = require('../middlewares/userValidation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/',
  validFieldUser.createUserValidation,
  userController.createUser
);

router.post('/login', userController.loginUser);

router.use(authMiddleware.protect);

router.route('/').get(userController.findAll);

router
  .route('/:id')
  .get(validExistUser.validExistUser, userController.userById)
  .patch(
    validExistUser.validExistUser,
    authMiddleware.protectAccountOwner,
    validFieldUser.updateUser,
    userController.upDateUser
  )
  .delete(
    validExistUser.validExistUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = router;
