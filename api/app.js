const express = require('express');
const router =  require('../routes/student');
const tutorRoute = require('../routes/tutor')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-type,Authorization');
    next();
});

app.use(bodyParser.json());
app.use('/student', router);
app.use('/tutor', tutorRoute);
app.listen(5000);