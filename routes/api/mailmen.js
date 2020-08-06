const express = require('express');
const mailmenController = require('../../controllers/api/mailmenController');
const mailmenRouter = express.Router();


mailmenRouter.get("/mailmen", mailmenController.getMailmens);

mailmenRouter.get("/mailmen/:idMailmen", mailmenController.getMailmen);





module.exports = mailmenRouter;
