const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();


apiRouter.get("/", apiController.getAllData);

apiRouter.post("/solution", apiController.Solution);



module.exports = apiRouter;