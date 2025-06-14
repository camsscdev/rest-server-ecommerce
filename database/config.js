const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('DB online...!');
  } catch (error) {
    console.log(error);
    throw new Error('No se inicializo la DB');
  }
};

module.exports = {
  dbConnection,
};
