const { response } = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/register');
const generarJWT = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // validar si existe el email //
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / pasword no correctos',
      });
    }

    //   si el usuario esta activo //
    if (!user.estado) {
      return res.status(400).json({
        msg: 'Usuario / pasword no correctos estado false   ',
      });
    }

    //   verificar la contraseña //

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      res.status(400).json();
    }

    //   generar el jwt token//

    const token = await generarJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el admin',
    });
  }
};

module.exports = {
  login,
};
