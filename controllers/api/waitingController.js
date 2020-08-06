waiting = require("../../models/waiting");

exports.getWaiting = (req,res,next) => {
    console.log(waiting);
    return res.status(200).json(waiting);
}

exports.getWaitingPack = (req, res, next) => {
    waiting = packages.waiting.find(wait => wait.uid === req.params.idWaiting);

    if (waiting) {
        return res.status(200).json(waiting);
    } else {
        return res.status(404).json({
            "error" : "Package waiting to be delivered not found"
        })
    }
}