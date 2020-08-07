const express = require('express');
const waitingController = require('../../controllers/api/waitingController');
const waitingRouter = express.Router();

/**
 * This function is used to have all the package waiting to be delivered
 * @route GET /api/waiting
 * @group waiting - operation on waiting packages
 * @returns {object} 200 - an array of all the package waiting in the waiting room
 */
waitingRouter.get("/", waitingController.getWaiting);

/**
 * This function is used to have all the package waiting to be delivered
 * @route GET /api/waiting/:idWaiting
 * @group waiting - operation on waiting package
 * @param {string} idWaiting.query.required - id of the waiting package
 * @returns {object} 200 - the package
 * @returns {Error} 404 - the package has not been found in the waiting room
 */
waitingRouter.get("/:idWaiting", waitingController.getWaitingPack);

module.exports = waitingRouter;