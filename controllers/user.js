const User = require('../models/user');
const bcrypt = require('bcryptjs');
const image = require('../utils/image');

async function readMe(req, res) {
  try {
    const { user_id } = req.user;
    const foundUser = await User.findById(user_id);
    if (!foundUser) {
      return res.status(400).send('Cant find user');
    }
    res.status(200).send(foundUser);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function readUsers(req, res) {
  try {
    const { active } = req.query;

    let response = null;

    if (active === undefined) {
      response = await User.find();
    } else {
      response = await User.find({ active });
    }

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function createUser(req, res) {
  try {
    const { password } = req.body;
    const user = new User({
      ...req.body,
      active: false,
    });

    const existingUser = await User.findOne({
      email: user.email,
    });

    if (existingUser) {
      return res.status(400).send({ msg: 'Email already in use' });
    }
    if (req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);
      user.avatar = imagePath;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashPassword;
    } else {
      delete userData.password;
    }

    if (req.files.avatar) {
      const imagePath = image.getFilePath(req.files.avatar);

      userData.avatar = imagePath;
    }

    const foundUser = await User.findByIdAndUpdate(id, userData);

    res.status(200).send(foundUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const foundUser = await User.findByIdAndDelete(id);

    res.status(200).send(foundUser);
  } catch (error) {
    res.status(400).send(error);
  }
}
module.exports = {
  readMe,
  readUsers,
  createUser,
  updateUser,
  deleteUser,
};
