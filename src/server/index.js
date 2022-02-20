const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ status: 'success', message: 'Welcome' });
});

app.all('*', (req, res) => {
  return res.status(404).send({
    status: 'failed',
    code: 404,
    msg: 'Resource not found',
  });
});

app.use((err, req, res, next) => {
  const code = err.code || 500;
  res.status(code).send({
    code,
    status: 'error',
    msg: err.msg,
  });
});

module.exports = app;
