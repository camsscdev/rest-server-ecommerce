const jwt = require('jsonwebtoken');
const generarJWT = (uid = '') => {
  return new Promise(
    (resolve,
    (reject) => {
      const payload = { uid };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: '4h',
        },
        (err, token) => {
          if (error) {
            reject('no se pudo geenerar el web token');
          } else {
            resolve(token);
          }
        }
      );
    })
  );
};

module.exports = generarJWT;
