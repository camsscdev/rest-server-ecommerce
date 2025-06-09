const { response } = require('express');

const Register = require('../models/register');
const { encryptPassword } = require('../helpers/db-validators');

const registerGet = async (req, res = response) => {
  const { limit = 5, desde = 0 } = req.query;

  const query = { estado: true };
  const usuarios = await Register.find()
    .skip(Number(desde))
    .limit(Number(limit));

  const total = await Register.countDocuments(query);
  res.json({ total, usuarios });
};

const registerPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, idNumber, typeDocument, password, email, ...resto } = req.body;

  if (password) {
    encryptPassword(password, resto);
  }

  const user = await Register.findByIdAndUpdate(id, resto);
  res.json(user);
};

const registerPost = async (req, res = response) => {
  const { name, email, idNumber, typeDocument, password, phoneNumber, estado } =
    req.body;

  const register = new Register({
    name,
    email,
    idNumber,
    typeDocument,
    password,
    phoneNumber,
    estado,
  });

  encryptPassword(password, register);

  await register.save();
  res.status(200).json({ register, msg: 'Registro creado correctamente' });
};

module.exports = {
  registerPost,
  registerPut,
  registerGet,
};
