const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(routes);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('MongoDB Connected');
    app.listen(8080, () => {
        console.log('Server running on 8080');
    });
})