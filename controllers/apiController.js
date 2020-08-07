let packages = require('../models/package');
let mailmens = require('../models/mailmen');
let waiting = require('../models/waiting');
const utils = require('../utils/utils');



//Controller for the api based on the

exports.delivery = (req, res, next) => {
    //Data
    //New package to deliver 
    let packages_to_deliver = req.body.packages;
    //The mailmen who have to deliver the package for today
    let day_mailmens = req.body.mailmen;

    if (!packages_to_deliver) {
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
        index = mailmens.findIndex(mail => mail.uid === mailmen.uid);
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
                mailmens[index].homeX = mailmen.x
            }
            if(mailmen.y !== mailmens[index].y) {
                mailmens[index].y = mailmen.y
                mailmens[index].homeY = mailmen.y
            }
        }
        mailmen.homeX = mailmen.x;
        mailmen.homeY = mailmen.y;
        mailmen.packages = [];
        mailmen.delivred = [];
        mailmen.length = 0
    })
    let sol = [];


    let index_pack = 0;
    let index_mail = 0;

    //We try to send the waiting package before any new package
    if (waiting && waiting.length > 0) {
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

    //Now we can deliver the new packages
    index_mail = 0;
    index_pack = 0;
    while (index_pack < packages_to_deliver.length) {
        index_mail = utils.smallest_mailmen(day_mailmens);
        pack_to_delivred = utils.closetPackage(day_mailmens,index_mail,packages_to_deliver,index_pack);
        if(pack_to_delivred){
            new_distance = utils.distance(day_mailmens[index_mail].x,day_mailmens[index_mail].y,packages_to_deliver[pack_to_delivred].x,packages_to_deliver[pack_to_delivred].y);
            day_mailmens[index_mail].packages.push(packages_to_deliver[pack_to_delivred].uid);
            day_mailmens[index_mail].x = packages_to_deliver[pack_to_delivred].x;
            day_mailmens[index_mail].y = packages_to_deliver[pack_to_delivred].y;
            day_mailmens[index_mail].length += new_distance;
            //We need to add it to the package already delivered
            packages_to_deliver[pack_to_delivred].by = day_mailmens[index_mail].uid;
            packages.push(packages_to_deliver[pack_to_delivred]);
            packages_to_deliver.splice(pack_to_delivred,1);

        } else {
            waiting.push(packages_to_deliver[index_pack])
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
        mailmen.packages = [];
        mailmen.length = 0;
        //update the data
        index = mailmens.findIndex(mail => mail.uid === mailmen.uid);
        mailmens[index] = mailmen;
        
    })
    res.status(200).json(sol);
}

exports.getAllData = (req,res,next) => {
    return res.statuts(200).json({
        "packages" : packages,
        "mailmen" : maimens,
        "waiting" : waiting
    });
}

//Clear all data 
// ONLY because of heroku host
exports.clear = (req,res,next) => {
    waiting.splice(0,waiting.length);
    packages.splice(0,packages.length);
    mailmens.splice(0,mailmens.length);
    return res.status(200).json({
        'waiting': waiting,
        'packages': packages,
        'mailmens': mailmens
    });
}

//Finish the delivery of the waiting packages

exports.finishDelivery = (req,res,next) => {
    
    if (waiting.length <= 0) {
        return res.status(304).json({
            "message": "No waiting packages"
        });
    }
    day_mailmens = req.body.mailmen;
    if(!day_mailmens) {
        return res.status(403).json({
            'error': 'No mailmens in the data, you need to have mailmens to delivered the package'
        });
    }
        //We need to check if the mailmen is already in the data
    //We need to update his data if so
    //Or add him if he wasn't in it before
    day_mailmens.forEach(mailmen => {
        index = mailmens.findIndex(mail => mail.uid === mailmen.uid);
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
                mailmens[index].homeX = mailmen.x
            }
            if(mailmen.y !== mailmens[index].y) {
                mailmens[index].y = mailmen.y
                mailmens[index].homeY = mailmen.y
            }
        }
        mailmen.homeX = mailmen.x;
        mailmen.homeY = mailmen.y;
        mailmen.length = 0
        mailmen.packages = []
    })
    let sol = [];


    let index_pack = 0;
    let index_mail = 0;

    //We try to send the waiting package before any new package
    if (waiting && waiting.length > 0) {
        while (index_pack < waiting.length){
            index_mail = utils.smallest_mailmen(day_mailmens);
            pack_waiting = utils.closetPackage(day_mailmens,index_mail,waiting,index_pack);

            if(pack_waiting){
                new_distance = utils.distance(day_mailmens[index_mail].x,day_mailmens[index_mail].y,waiting[pack_waiting].x,waiting[pack_waiting].y);
                day_mailmens[index_mail].packages.push(waiting[pack_waiting].uid);
                day_mailmens[index_mail].x = waiting[pack_waiting].x;
                day_mailmens[index_mail].y = waiting[pack_waiting].y;
                day_mailmens[index_mail].length += new_distance;
                //We need to add it to the package already delivered
                waiting[pack_waiting].by = day_mailmens[index_mail].uid;
                packages.push(waiting[pack_waiting]);
                waiting.splice(pack_waiting,1);
            } else {
                index_pack++;
            }
        }
    // Mailmen returning home
    // Reseting the mailmen for the next day 
    // Building of the answer as asked in the subject
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
            index = mailmens.findIndex(mail => mail.uid === mailmen.uid);
            
            //Now we need to keep the package delivred but also reset for the next day
            mailmens[index].delivred.push(mailmen.packages);
            mailmens[index].packages = [];
            mailmens[index].length = 0;
            
        })
    }
    return res.status(200).json(sol);
}