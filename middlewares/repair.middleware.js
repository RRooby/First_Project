const Repair = require('../models/repairs.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.validExistRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'Repair not found',
    });
  }
  req.repair = repair;
  next();
});

exports.validExistRepairById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password', 'status'],
        },
      },
    ],
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'Repair not found',
    });
  }
  req.repair = repair;
  next();
});
