packages = require("../../models/package");


exports.getPackages = (req,res,next) => {
    console.log(packages);
    return res.status(200).json({
        "packages": packages
    });
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

