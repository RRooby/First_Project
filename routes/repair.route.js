const express = require('express');

const repairController = require('../controllers/repair.controller');

const repairRouter = express.Router();

repairRouter
  .route('/')
  .get(repairController.findAllRepair)
  .post(repairController.createRepair);

repairRouter
  .route('/:id')
  .get(repairController.findOneRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = repairRouter;
