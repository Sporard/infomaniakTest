const express = require('express');
const solController = require('../controllers/solController');
const solRouter = express.Router();
solRouter.get("/",function(req, res,next){
    res.send("hello world solution");
})

solRouter.post("/", solController.Solution);



module.exports = solRouter;