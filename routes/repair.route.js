const express = require('express');

const repairController = require('../controllers/repair.controller');
const validExistRepair = require('../middlewares/repair.middleware');
const validFieldRepair = require('../middlewares/repairValidation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('employee'));

router
  .route('/')
  .get(repairController.findAllRepair)
  .post(
    validFieldRepair.createRepairValidation,
    repairController.createRepair
  );

router
  .route('/:id')
  .get(
    validExistRepair.validExistRepairById,
    repairController.findOneRepair
  )
  .patch(
    validExistRepair.validExistRepair,
    repairController.updateRepair
  )
  .delete(
    validExistRepair.validExistRepair,
    repairController.deleteRepair
  );

module.exports = router;
