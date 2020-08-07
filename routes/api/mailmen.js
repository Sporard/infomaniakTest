const express = require('express');
const mailmenController = require('../../controllers/api/mailmenController');
const mailmenRouter = express.Router();


/**
 * @typedef Mailmen
 * @property {string} uid - mailmen's id
 * @property {integer} x - home X position
 * @property {integer} y - home Y position
 */
/**
 * This function is used to have all the mailmens stocked by the API
 * @route GET /api/mailmen
 * @group mailmen - operation on mailmen
 * @returns {object} 200 - an array of all the mailmen
 */
mailmenRouter.get("/", mailmenController.getMailmens);


/**
 * This function is used to get on specific mailmen in all the mailmen stocked by the api
 * @route GET /api/mailmen/:idMailmen
 * @group mailmen - operation on mailmen
 * @param {string} idMailMen.query.required - id of the mailmen
 * @returns {object} 200 - the mailmen
 * @returns {Error} 404 - the mailmen has not been found
 */
mailmenRouter.get("/:idMailmen", mailmenController.getMailmen);





module.exports = mailmenRouter;
