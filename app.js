const express = require('express');
const bodyparser = require('body-parser');

const apiRoutes = require('./routes/api');
const mailmensRoutes = require('./routes/mailmen');
const packageRoutes = require('./routes/packages');
const app = express();

// CORS HEADERS
app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With , Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// BODY TO JSON
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));


//API
app.use("/api", apiRoutes);


//Mailmen
app.use("/mailmen", mailmensRoutes);

// packages

app.use("/packages", packageRoutes);

// 404 HANDLER
app.use(function (req, res, next) {
    res.status(404).send("404 not found | Sorry can't find that !")
});

module.exports = app;