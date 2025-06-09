const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { productPost, productGet } = require('../controllers/product');
const { productExist } = require('../helpers/db-validators');

const router = Router();

router.get(
  '/product',

  productGet
);

router.post(
  '/product',
  [
    check('nameProduct', 'Nombre de prodcuto es obligatorio').not().isEmpty(),
    check('nameProduct').custom(productExist),
    check('description', 'Descripción es obligatoria').not().isEmpty(),
    check('precio', 'Precio es obligatorio').not().isEmpty(),
    check('moneda', 'Moneda es obligatorio').not().isEmpty(),
    check('moneda', 'Tipo de Moneda permitido COP/USD/QTZ').isIn([
      'COP',
      'USD',
      'QTZ',
    ]),
    validarCampos,
  ],
  productPost
);

module.exports = router;
