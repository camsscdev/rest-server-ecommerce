const { Router } = require('express');
const { check } = require('express-validator');

const {
  registerPost,
  registerPut,
  registerGet,
} = require('../controllers/register');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  isRoleValid,
  emailExist,
  numberIdExist,
  existeUsuarioPorId,
} = require('../helpers/db-validators');

const router = Router();

router.get(
  '/',

  registerGet
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  registerPut
);

router.post(
  '/',
  [
    check('name', 'El nombre el obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExist),
    check('password', 'Contraseña - Longitud minima de 6 caracteres').isLength({
      min: 6,
    }),
    check('typeDocument', 'Tipo de documentos permitido CC/CE/PST').isIn([
      'CC',
      'CE',
      'PST',
    ]),
    check('idNumber').custom(numberIdExist),
    // check('role').custom(isRoleValid),
    validarCampos,
  ],
  registerPost
);

module.exports = router;
