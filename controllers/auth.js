const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const User = require('../models/user');

async function register(req, res) {
  const { firstname, lastname, password, email } = req.body;

  try {
    const user = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      role: 'user',
      active: true,
    });

    const findExistingUser = await User.findOne({
      email: email,
    });

    if (findExistingUser) {
      return res.status(400).send('User Already Exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function obtain(req, res) {
  try {
    const user = await User.find();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send('Email and password required');
    }
    const emailLowerCase = email.toLowerCase();

    const user = await User.findOne({
      email: emailLowerCase,
    });

    if (!user) {
      return res.status(404).send('Verify Email and/or Password');
    }

    const userPassword = user.password || '';
    const checkPassword = await bcrypt.compare(password, userPassword);

    if (!checkPassword) {
      res.status(400).send('Verify your password');
    } else if (!user.active) {
      res.status(401).send('User Inactive');
    } else {
      res.status(200).send({
        access: jwt.createAccessToken(user),
        refresh: jwt.createRefreshToken(user),
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function refreshAccessToken(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).send('token required');
    }

    const { user_id } = jwt.verifyToken(token);
    const foundUser = await User.findById({
      _id: user_id,
    });

    if (!foundUser) {
      res.status(404).send('Cant Find User');
    } else {
      res.status(200).send({
        accessToken: jwt.createAccessToken(foundUser),
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  register,
  obtain,
  login,
  refreshAccessToken,
};
