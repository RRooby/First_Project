const Repair = require('../models/repairs.model');

exports.findOneRepair = async (req, res) => {
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
      message: 'the repair not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'The query has been done success',
    repair,
  });
};

exports.findAllRepair = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });

  res.status(200).json({
    message: 'The query has been done successs',
    results: repairs.length,
    repairs,
  });
};

exports.updateRepair = async (req, res) => {
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

  await repair.update({
    status: 'completed',
  });

  res.json({
    message: 'Repair was updated',
  });
};

exports.createRepair = async (req, res) => {
  const { date, userId } = req.body;

  const repair = await Repair.create({
    date,
    userId,
  });

  res.status(201).json({
    status: 'success',
    message: 'Repair was created!',
    repair,
  });
};

exports.deleteRepair = async (req, res) => {
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

  await repair.update({
    status: 'cancelled',
  });

  res.json({
    message: 'Repair was deleted',
  });
};
