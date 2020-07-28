const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();

apiRouter.post("/api", apiController.postData);

apiRouter.post("/api/solution", apiController.getSolution);



module.exports = apiRouter;