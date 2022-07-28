const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());

app.use('/', require('../routes'));



module.exports = app;


