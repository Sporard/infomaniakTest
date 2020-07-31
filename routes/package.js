const express = require('express');
const packageController = require('../controllers/packageController');
const packageRouter = express.Router();


packageRouter.get("/", packageController.getPackages);

packageRouter.get("/:idPackage", packageController.getPackage);

packageRouter.get("/waiting", packageController.getWaiting);

packageRouter.get("/waiting/:idWaiting", packageController.getWaitingPack);
module.exports = packageRouter;