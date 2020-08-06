const express = require('express');
const packageController = require('../../controllers/api/packageController');
const packageRouter = express.Router();


packageRouter.get("/", packageController.getPackages);

packageRouter.get("/:idPackage", packageController.getPackage);

module.exports = packageRouter;