const express = require('express');
const solController = require('../controllers/solController');
const solRouter = express.Router();


solRouter.get("/",function(req, res,next){
    res.send("hello world solution");
})
/**
 * This function is used to get a solution of the problem with the last version of the algorithm
 * @route POST /
 * @group algorithm - the algorithm to solve the problem
 * @param {Request.model} request.body.required - the data for the current day
 * @returns {Array<Solution>} 200 - the list of package delivered by each mailmen
 * @returns {Error} 400 - the data is not correct
 */
solRouter.post("/", solController.Solution);



module.exports = solRouter;