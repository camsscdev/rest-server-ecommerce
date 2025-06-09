const express = require('express');
const cors = require('cors');
const Path = require('./../path');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = new Path();

    this.connectDB();

    this.middlewares();

    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.autPath, require('../routes/auth'));
    this.app.use(this.paths.register, require('./../routes/register'));
    this.app.use(this.paths.product, require('./../routes/product'));
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
