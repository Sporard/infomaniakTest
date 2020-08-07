const express = require('express');
const bodyparser = require('body-parser');
const path = require('path')
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
let optionSwagger = {
    swaggerDefinition: {
        info: {
            description: 'This is the API made for the infomaniak Test',
            title: 'Infomaniak Test',
            version: '1.0.0'
        },
        host: 'https://infomaniaktest.herokuapp.com/',
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http','https'],
    },
    basedir: __dirname,
    files: ['./routes/**/*.js']
};
expressSwagger(optionSwagger);
const optionsURL = {
    inflate: true,
    limit: '50mb',
    extended: true,
    type: ["application/x-www-form-urlencoded","application/json"]
}


//First version of the algorithm
const v1Routes = require('./routes/v1');
//Second version of the algorithm
const v2Routes = require('./routes/v2');
//Last version of the algorithm
const solutionRoute = require('./routes/v3')

//API ROUTES

const apiRoutes = require('./routes/api');
const mailmenRoutes = require('./routes/api/mailmen');
const packageRoutes = require('./routes/api/package');
const waitingRoutes = require('./routes/api/waiting');




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
app.use("/v3", solutionRoute);

// API

app.use("/api",apiRoutes);
app.use("/api/mailmen",mailmenRoutes);
app.use("/api/packages",packageRoutes);
app.use("/api/waiting",waitingRoutes);

/**
 * STATIC FILES
 */

 app.use("/",express.static(path.join(__dirname,'public')));
 app.get('*',function(req,res){
    res.set('Content-Type', 'text/html')
    res.sendFile(path.join(__dirname,'/public/README.html'))
 })
module.exports = app;