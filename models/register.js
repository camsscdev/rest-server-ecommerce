const { Schema, model } = require('mongoose');

const RegisterSchema = Schema({
  name: {
    type: String,
    required: [true, 'el nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'el correo es obligatorio'],
    unique: true,
  },
  idNumber: {
    type: String,
    required: [true, 'La contraseña es obligatorio'],
  },
  typeDocument: {
    type: String,
    required: [true],
    enum: ['CC', 'CE', 'PST'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },
  phoneNumber: {
    type: String,
    default: true,
  },
  role: {
    type: String,
  },
  estado: {
    type: Boolean,
  },
});

RegisterSchema.methods.toJSON = function () {
  const { __v, password, _id, ...userRegister } = this.toObject();

  userRegister.uid = _id;
  return userRegister;
};

module.exports = model('register', RegisterSchema);
