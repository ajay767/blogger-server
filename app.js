const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const expressFileUploader = require('express-fileupload');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./utils/globalErrorHandler');
const authRoute = require('./routes/authRoute');

const app = express();

//setup config.env file
dotenv.config({ path: './config.env' });

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//parse multipart/form-data
app.use(expressFileUploader());

//enable cors policy
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
