const express = require('express');
const app = express.Router();

app.use('/auth',require('./auth.api'));
app.use('/todo',require('./todo.api'))

module.exports = app