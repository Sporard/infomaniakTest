const express = require('express');
const packageController = require('../controllers/packageController');
const packageRouter = express.Router();


packageRouter.get("/packages", packageController.getPackages);

packageRouter.get("/packages/:idPackage", packageController.getPackage);

packageRouter.post("/packages",packageController.postPackage)


module.exports = packageRouter;