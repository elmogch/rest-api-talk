const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require("./users");

const config = {
    name: 'rest-api-talk',
    port: 3000,
    host: '0.0.0.0',
};

/**
 * Inicialización del servidor
 */
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(config.port, config.host, (e)=> {
  if(e) {
      throw new Error('Internal Server Error');
  }
});

/**
 * Rutas Home API
 */
app.get('/', (req, res) => {
  res.redirect('/users');
});

/**
 * Rutas User API
 */
app.use("/users", usersRouter);