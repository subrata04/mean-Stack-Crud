const express = require('express');
const bodyparser = require('body-parser');
const { mongoose } = require('./db.js');
const cors = require('cors');
var employeeController = require('./controllers/employeeControllers.js');


var app = express();
var port = 3000;
app.use(cors({ origin: 'http://localhost:2000' }));
app.use(bodyparser.json());
app.listen(port, () => console.log('Server Connected at Port ' + port));

app.use('/employees', employeeController);
