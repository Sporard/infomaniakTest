packages = require("../models/package");


exports.getPackages = (req,res,next) => {
    return res.status(200).json(packages.packages);
}

exports.getPackage = (req,res,next) => {
    pack = packages.packages.find(pack => pack.uid === req.params.idPackage);

    if (pack) {
        return res.status(200).json(pack)
    } else {
        return res.status(404).json({
            "error" : "Package not found"
        })
    }
}

exports.getWaiting = (req,res,next) => {
    return res.status(200).json(packages.waiting);
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