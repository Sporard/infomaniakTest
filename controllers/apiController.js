let packages = require('../models/package');
let mailmen = require('../models/mailmen');
let waiting = require('../models/waiting');
const utils = require('../utils/utils');


//Controller for the api based on the

exports.Solution = (req, res, next) => {
    //Data
    let packages_to_deliver = req.body.packages;
    let mailmens = req.body.mailmen;

    if (!packages) {
        return res.status(400).json({
            "error": "no packages"
        })
    }
    if (!mailmens) {
        return res.status(400).json({
            "error": "no mailmens"
        })
    }

    //We need to keep the home of mailmen in order
    //to came back after the delivery
    mailmens.forEach(mailmen => {
        mailmen.homeX = mailmen.x;
        mailmen.homeY = mailmen.y;
        mailmen.length = 0.0;
        mailmen.packages = [];
    })
    let sol = [];


    let index_pack = 0;
    let index_mail = 0;
    while (index_pack < packages_to_deliver.length) {
        index_mail = utils.smallest_mailmen(mailmens);
        pack_to_delivred = utils.closetPackage(mailmens,index_mail,packages_to_deliver,index_pack);
        
        if(pack_to_delivred){
            new_distance = utils.distance(mailmens[index_mail].x,mailmens[index_mail].y,packages_to_deliver[pack_to_delivred].x,packages_to_deliver[pack_to_delivred].y);
            mailmens[index_mail].packages.push(packages_to_deliver[pack_to_delivred].uid);
            mailmens[index_mail].x = packages_to_deliver[pack_to_delivred].x;
            mailmens[index_mail].y = packages_to_deliver[pack_to_delivred].y;
            mailmens[index_mail].length += new_distance;
            packages_to_deliver.splice(pack_to_delivred,1);
        } else {
            index_pack++;
        }
        
        
    }
    // Mailmen returning home
    // Building of the answer as asked in the subject
    mailmens.forEach(mailmen =>{
        home_distance = utils.distance(mailmen.x,mailmen.y,mailmen.homeX,mailmen.homeY);
        mailmen.length += home_distance;
        mailmen.x = mailmen.homeX;
        mailmen.y = mailmen.homeY;
        sol.push({
            "uid":mailmen.uid,
            "tour":mailmen.packages,
            "length":mailmen.length
        })
    })
    res.status(200).json(sol)
}

exports.getAllData = (req,res,next) => {
    return res.statuts(200).json({
        "packages" : packages,
        "mailmen" : maimens,
        "waiting" : waiting
    })
}