mailmens = require("../models/mailmen")

exports.getMailmens = (req,res,next) => {
    return res.status(200).json(mailmens);
}

exports.getMailmen = (req,res,next) => {
    mailmen = mailmens.find(mailmen => mailmen.uid === req.params.idMailmen);

    if (mailmen) {
        return res.status(200).json(mailmen);
    } else {
        return res.status(404).json({
            "error": "Mailmen not found"
        })
    }
}