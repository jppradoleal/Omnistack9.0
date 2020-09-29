const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(8080, () => {
    console.log('Server running on 8080');
});