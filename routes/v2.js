const express = require('express');
const v2Controller = require('../controllers/v2Controller');
const v2Router = express.Router();
v2Router.get("/",function(req, res,next){
    res.send("hello world v2 ");
})

v2Router.post("/solution", v2Controller.Solution);



module.exports = v2Router;