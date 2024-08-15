const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser= require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('database connected'));

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log('Listening to the port: ', port);
})

