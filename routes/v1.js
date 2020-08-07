const express = require('express');
const v1Controller = require('../controllers/v1Controller');
const v1Router = express.Router();
v1Router.get("/",function(req, res,next){
    res.send("hello world v1");
})
/**
 * This function is used to get a solution of the problem with the first version of the algorithm
 * @route POST /v1
 * @group algorithm - the algorithm to solve the problem
 * @param {Request.model} request.body.required - the data for the current day
 * @returns {Array<Solution>} 200 - the list of package delivered by each mailmen
 * @returns {Error} 400 - the data is not correct
 */
v1Router.post("/", v1Controller.Solution);



module.exports = v1Router;