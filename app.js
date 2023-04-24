//inicializacion
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user.route');
const repairRouter = require('./routes/repair.route');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

app.use('api/v1/users', userRouter);
app.use('api/v1/repairs', repairRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `cannot find ${req.originalUrl} on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
