const express = require('express');
const waitingController = require('../controllers/waitingController');
const waitingRouter = express.Router();


waitingRouter.get("/", waitingController.getWaiting);

waitingRouter.get("/:idWaiting", waitingController.getWaitingPack);

module.exports = waitingRouter;