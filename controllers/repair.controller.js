const Repair = require('../models/repairs.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepair = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });

  res.status(200).json({
    message: 'query has been done successs',
    results: repairs.length,
    repairs,
  });
});

exports.repairById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      userId: id,
      status: 'pending',
    },
  });

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'Repair not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Query has been done success',
    repair,
    user,
  });
});

exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'completed',
  });

  res.json({
    message: 'Repair has been update',
  });
});

exports.createRepair = catchAsync(async (req, res) => {
  const { date, userId, description, motorsNumber } = req.body;

  const repair = await Repair.create({
    date,
    userId,
    description,
    motorsNumber,
  });

  res.status(201).json({
    status: 'success',
    message: 'Repair has been created!',
    repair,
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'cancelled',
  });

  res.json({
    message: 'repair has been deleted',
  });
});
