const express = require('express');
const mailmenController = require('../controllers/mailmenController');
const mailmenRouter = express.Router();


mailmenRouter.get("/mailmen", mailmenController.getMailmens);

mailmenRouter.get("/mailmen/:idMailmen", mailmenController.getMailmen);

mailmenRouter.post("/mailmen/", mailmentController.postMailmen);



module.exports = mailmenRouter;
