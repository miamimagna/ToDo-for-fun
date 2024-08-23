const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser= require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const cors =require('cors');
const ItemRouter = require('./routes/ItemRouter');
const AuthRouter = require('./routes/AuthRouter');

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('database connected'));
const port = process.env.PORT;

app.use(cors({ 
    origin: ['https://todo-for-fun-1.onrender.com/'], methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use('/api', ItemRouter);
app.use('/auth', AuthRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log('Listening to the port: ', port);
})

