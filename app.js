//inicializacion
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user.route');
const repairRouter = require('./routes/repair.route');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

app.use('api/v1/users', userRouter);
app.use('api/v1/repairs', repairRouter);

module.exports = app;
