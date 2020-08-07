const express = require('express');
const v2Controller = require('../controllers/v2Controller');
const v2Router = express.Router();
v2Router.get("/",function(req, res,next){
    res.send("hello world v2 ");
})
/**
 * This function is used to get a solution of the problem with the second version of the algorithm
 * @route POST /v2
 * @group algorithm - the algorithm to solve the problem
 * @param {Request.model} request.body.required - the data for the current day
 * @returns {Array<Solution>} 200 - the list of package delivered by each mailmen
 * @returns {Error} 400 - the data is not correct
 */
v2Router.post("/", v2Controller.Solution);



module.exports = v2Router;