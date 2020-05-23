const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cookieParser());
app.use(express());
app.use(express.json());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('Mongo Database has connected!'))
    .catch(err => console.log(err));


const User = require('./models/User');

const userRouter = require('./routes/User');
app.use('/user', userRouter);

const port = 5000;

app.listen(port, () => {
    console.log(`app is listening on PORT: ${port}`)
});