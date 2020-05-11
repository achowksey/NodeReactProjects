const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParse: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to Database");
})

const usersRouter = require('./routes/users');

app.use('/users',usersRouter);

const foodsRouter = require('./routes/foods');

app.use('/foods',foodsRouter);

const foodEntriesRouter = require('./routes/foodEntries');

app.use('/foodEntries',foodEntriesRouter);

const postsRouter = require('./routes/posts');

app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});