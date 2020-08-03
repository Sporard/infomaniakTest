const express = require('express');
const bodyparser = require('body-parser');
const options = {
    inflate: true,
    limit: 1000,
    extended: true
}
var qs = require('querystring');
const apiRoutes = require('./routes/api');
const mailmensRoutes = require('./routes/mailmen');
const packageRoutes = require('./routes/package');
const waitingRoutes = require('./routes/waiting');
const app = express();

// CORS HEADERS
app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With , Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Content-Type", "application/json")
    next();
});

// BODY TO JSON
app.use(bodyparser.json());
app.use(bodyparser.urlencoded(options));


//API
app.use("/", apiRoutes);

//Mailmen
app.use("/mailmen", mailmensRoutes);

//Packages
app.use("/package", packageRoutes);

// waiting

app.use("/waiting", waitingRoutes);

module.exports = app;