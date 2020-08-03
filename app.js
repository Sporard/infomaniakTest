const express = require('express');
const bodyparser = require('body-parser');
const options = {
    inflate: true,
    limit: '50mb',
    extended: true,
    type: "application/x-www-form-urlencoded"
}


const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');
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
app.use(bodyparser.json(options));
app.use(bodyparser.urlencoded(options));


//Solution v1 straightforward way
app.use("/v1", v1Routes);

//Solution v2 priorizitation of the mailmen with the smallest length

app.use("/v2", v2Routes);
//Mailmen
app.use("/mailmen", mailmensRoutes);

//Packages
app.use("/package", packageRoutes);

// waiting

app.use("/waiting", waitingRoutes);

module.exports = app;