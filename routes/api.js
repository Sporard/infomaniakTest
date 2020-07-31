const express = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = express.Router();
apiRouter.get("/",function(req, res,next){
    res.send("hello world");
})
apiRouter.post("/data", apiController.postData);
apiRouter.post("/solution", apiController.Solution);



module.exports = apiRouter;