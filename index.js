const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

require('./models');
app.use('/api',require('./api'));


app.listen(5000,() => {
    console.log("Server started");
});