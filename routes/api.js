const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();
/**
 * @typedef Request
 * @property {Array.<Package>} packages - packages of the day
 * @property {Array.<Mailmen>} mailmen - mailmen working the current day
 */
/**
 * @typedef Solution
 * @property {string} uid
 * @property {Array<string>} tour
 * @property {integer} length
 */


/**
 * This function is used to get all the data stocked by the API
 * @route GET /api
 * @group api - global operation of the API
 * @returns {object} 200 - all the data
 */
apiRouter.get("/", apiController.getAllData);

apiRouter.post("/delivery", apiController.delivery);
/**
 * This function is used to get the list of delivery of the current day
 * @route POST /api/delivery
 * @group api - global operation of the API
 * @param {Request.model} request.body.required - the data for the current day
 * @returns {Array<Solution>} 200 - the list of package delivered by each mailmen
 * @returns {Error} 400 - the data is not correct
 */

apiRouter.get('/clear', apiController.clear);

apiRouter.post('/finishDelivery', apiController.finishDelivery);

module.exports = apiRouter;