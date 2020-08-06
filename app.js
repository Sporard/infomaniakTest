const express = require('express');
const bodyparser = require('body-parser');
const optionsURL = {
    inflate: true,
    limit: '50mb',
    extended: true,
    type: ["application/x-www-form-urlencoded","application/json"]
}
const optionJSON = {
    inflate: true,
    limit: '50mb',
    extended: true,
    type: "application/json"
}

//First version of the algorithm
const v1Routes = require('./routes/v1');
//Second version of the algorithm
const v2Routes = require('./routes/v2');
//Last version of the algorithm
const solutionRoute = require('./routes/solution')

//API ROUTES


const apiRoutes = require('./routes/api');
const mailmenRoutes = require('./routes/api/mailmen');
const packageRoutes = require('./routes/api/package');
const waitingRoutes = require('./routes/api/waiting');


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
app.use(bodyparser.json(optionsURL));
app.use(bodyparser.urlencoded(optionsURL));


//First version
app.use("/v1", v1Routes);

//Seconde version

app.use("/v2", v2Routes);

//Main solution
app.use("/", solutionRoute);

// API

app.use("/api",apiRoutes);
app.use("/api/mailmen",mailmenRoutes);
app.use("/api/packages",packageRoutes);
app.use("/api/waiting",waitingRoutes);
module.exports = app;