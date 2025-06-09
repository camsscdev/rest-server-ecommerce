const Role = require('../models/role');

const Register = require('../models/register');
const Product = require('../models/products');
const bcrypt = require('bcryptjs');

const isRoleValid = async (role = '') => {
  const existRol = await Role.findOne({ role });
  if (!existRol) {
    throw new Error(`El rol ${role} no esta registrado en la base de datos`);
  }
};

const emailExist = async (email = '') => {
  existEmail = await Register.findOne({ email });
  if (existEmail) {
    throw new Error(`El correo ${email} ya existe`);
  }
};

const numberIdExist = async (idNumber = '') => {
  const idNumberExist = await Register.findOne({ idNumber });

  if (idNumberExist) {
    throw new Error(`El numero de identificación  ${idNumber} ya existe`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Register.findById(id);

  if (!existeUsuario) {
    throw new Error(`El ID ${id} no existe `);
  }
};

const productExist = async (nameProduct = '') => {
  const productNameExist = await Product.findOne({ nameProduct });

  if (productNameExist) {
    throw new Error(`El producto   ${nameProduct} ya existe`);
  }
};

const encryptPassword = (password, body) => {
  const salt = bcrypt.genSaltSync();
  return (body.password = bcrypt.hashSync(password, salt));
};

module.exports = {
  isRoleValid,
  emailExist,
  numberIdExist,
  existeUsuarioPorId,
  encryptPassword,
  productExist,
};
