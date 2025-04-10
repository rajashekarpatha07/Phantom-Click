const User = require('../models/User.js');
const Joi = require('joi');
const { generateToken } = require('../utils/jwt.js');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ error: 'User already exists' });

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  // Set token as an HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  });

  res.status(201).json({ user: { id: user._id, name, email } });
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user._id);

  // Set token as an HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 1000,
  });

  res.json({ user: { id: user._id, name: user.name, email } });
};

module.exports = { register, login };