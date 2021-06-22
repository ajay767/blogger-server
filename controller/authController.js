const User = require('./../models/userModel');
const { promisify } = require('util');
const AppError = require('./../utils/AppError');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm, first_name, last_name } =
      req.body;

    if (password !== passwordConfirm) {
      return next(
        new AppError('Password and Password confirm do not match!', 400)
      );
    }
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      passwordConfirm,
    });

    res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });

    if (!email || !password) {
      return next(new AppError('Please provide Email and Password!', 400));
    }

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Email or Password Invalid!', 400));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new AppError('You are not logged in!', 400));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  res.status(200).json({ authorization: 'passed', user: req.user });
};
