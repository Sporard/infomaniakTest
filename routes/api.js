const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();


apiRouter.get("/", apiController.getAllData);

apiRouter.post("/solution", apiController.Solution);

apiRouter.get('/clear', apiController.clear);

module.exports = apiRouter;