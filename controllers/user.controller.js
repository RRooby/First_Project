const User = require('./../models/user.model');

exports.findOneUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id: id,
      status: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }
  res.status(200).json({
    status: 'success',
    user,
  });
};
exports.findAllUser = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'succes',
    message: 'The user has been created!',
    user,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  const { name, email } = req.body;

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user not found',
    });
  }

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'User updated',
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'the user not found',
    });
  }

  await user.update({
    status: 'disabled',
  });

  res.status(200).json({
    message: 'User has been deleted',
  });
};
