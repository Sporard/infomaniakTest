const express = require('express');
const packageController = require('../../controllers/api/packageController');
const packageRouter = express.Router();
/**
 * @typedef Package
 * @property {string} uid - pacakge's id
 * @property {integer} x - package X position
 * @property {integer} y - package Y position
 */
/**
 * This function is used to have all the package delivered  by the API
 * @route GET /api/packages
 * @group packages - operation on packages
 * @returns {object} 200 - an array of all the mailmen
 */
packageRouter.get("/", packageController.getPackages);

/**
 * This function is used to get on specific package delivered by the api
 * @route GET /api/packages/:idPackage
 * @group packages - operation on packages
 * @param {string} idPackage.query.required - id of the package
 * @returns {object} 200 - the package
 * @returns {Error} 404 - the package has not been found
 */
packageRouter.get("/:idPackage", packageController.getPackage);

module.exports = packageRouter;