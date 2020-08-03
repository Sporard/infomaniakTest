const express = require('express');
const v1Controller = require('../controllers/v1Controller');
const v1Router = express.Router();
v1Router.get("/",function(req, res,next){
    res.send("hello world v1");
})

v1Router.post("/", v1Controller.Solution);



module.exports = v1Router;