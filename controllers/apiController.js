let packages = require('../models/package');
let mailmens = require('../models/mailmen');
let waiting = require('../models/waiting');
const utils = require('../utils/utils');



//Controller for the api based on the

exports.Solution = (req, res, next) => {
    //Data
    //New package to deliver 
    let packages_to_deliver = req.body.packages;
    //The mailmen who have to deliver the package for today
    let day_mailmens = req.body.mailmen;

    if (!packages) {
        return res.status(400).json({
            "error": "no new packages"
        })
    }
    if (!day_mailmens) {
        return res.status(400).json({
            "error": "no mailmens chosen for today "
        })
    }

    //We need to check if the mailmen is already in the data
    //We need to update his data if so
    //Or add him if he wasn't in it before
    day_mailmens.forEach(mailmen => {
        index = mailmens.findIndex(mail => mailmen.uid === mailmen.uid);
        if (index === -1 ) {
            mailmens.push({
                "uid" : mailmen.uid,
                "x" : mailmen.x,
                "y" : mailmen.y,
                "homeX": mailmen.x,
                "homeY": mailmen.y,
                "packages": [],
                "delivred": []
            })
        }else {
            //We update it 
            if(mailmen.x !== mailmens[index].x) {
                mailmens[index].x = mailmen.x
                mailmenss[index].homeX = mailmen.x
            }
            if(mailmen.y !== mailmens[index].y) {
                mailmens[index].y = mailmen.y
                mailmenss[index].homeY = mailmen.y
            }
        }
    })
    let sol = [];


    let index_pack = 0;
    let index_mail = 0;

    //We try to send the waiting package before any new package
    if (waiting && waiting.length) {
        while (index_pack < waiting.length){
            index_mail = utils.smallest_mailmen(day_mailmens);
            pack_waiting = utils.closetPackage(day_mailmens,index_mail,waiting,index_pack);
        
            if(pack_to_delivred){
                new_distance = utils.distance(day_mailmens[index_mail].x,day_mailmens[index_mail].y,waiting[index_pack].x,waiting[index_pack].y);
                day_mailmens[index_mail].packages.push(waiting[index_pack].uid);
                day_mailmens[index_mail].x = waiting[index_pack].x;
                day_mailmens[index_mail].y = waiting[index_pack].y;
                day_mailmens[index_mail].length += new_distance;
                //We need to add it to the package already delivered
                packages_to_deliver[index_pack].by = day_mailmens[index_mail].uid;
                packages.push(packages_to_deliver[index_pack]);
                waiting.splice(index_pack,1);
            } else {
                index_pack++;
            }
        }
    }

    //Now we can deliver the new package
    index_mail = 0;
    index_pack = 0;
    while (index_pack < packages_to_deliver.length) {
        index_mail = utils.smallest_mailmen(day_mailmens);
        pack_to_delivred = utils.closetPackage(day_mailmens,index_mail,packages_to_deliver,index_pack);
        
        if(pack_to_delivred){
            new_distance = utils.distance(day_mailmens[index_mail].x,day_mailmens[index_mail].y,packages_to_deliver[index_pack].x,packages_to_deliver[index_pack].y);
            day_mailmens[index_mail].packages.push(packages_to_deliver[index_pack].uid);
            day_mailmens[index_mail].x = packages_to_deliver[index_pack].x;
            day_mailmens[index_mail].y = packages_to_deliver[index_pack].y;
            day_mailmens[index_mail].length += new_distance;
            //We need to add it to the package already delivered
            packages_to_deliver[index_pack].by = day_mailmens[index_mail].uid;
            packages.push(packages_to_deliver[index_pack]);
            packages_to_deliver.splice(index_pack,1);

        } else {
            index_pack++;
        }
        
        
    }
    // Mailmen returning home
    // Reseting the mailmen for the next day 
    // Building of the answer as asked in the subject
    day_mailmens.forEach((mailmen) => {
        home_distance = utils.distance(mailmen.x,mailmen.y,mailmen.homeX,mailmen.homeY);
        mailmen.length += home_distance;
        mailmen.x = mailmen.homeX;
        mailmen.y = mailmen.homeY;
        sol.push({
            "uid":mailmen.uid,
            "tour":mailmen.packages,
            "length":mailmen.length
        })

        //Now we need to keep the package delivred but also reset for the next day
        mailmen.delivred.push(mailmen.packages);
        mailmen.packages = []
        mailmen.length = 0
        //update the data
        index = mailmens.findIndex(mail => mail.uid === mailmen.uid)
        mailmens[index] = mailmen
        
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

//Clear all data 
// ONLY because of heroku host
exports.clear = (req,res,next) => {
    waiting = [];
    packages = [];
    mailmens =[];
    return res.status(200);
}