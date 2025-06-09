const { Schema, model } = require('mongoose');

const LoginSchema = Schema({
  email: {
    type: String,
    required: [true, 'el correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
  },
});

LoginSchema.methods.toJSON = function () {
  const { __v, password, ...userRegister } = this.toObject();
  return userRegister;
};

module.exports = model('login', LoginSchema);
