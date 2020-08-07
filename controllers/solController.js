
const utils = require('../utils/utils');

//So we need to find the mailmen with the min length
//Then we need to find the package not traited closest to this mailmen 

exports.Solution = (req, res, next) => {
    //Data
    let packages = req.body.packages;
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
    while (index_pack < packages.length) {
        index_mail = utils.smallest_mailmen(mailmens);
        pack_to_delivred = utils.closetPackage(mailmens,index_mail,packages,index_pack);
        
        if(pack_to_delivred){
            new_distance = utils.distance(mailmens[index_mail].x,mailmens[index_mail].y,packages[pack_to_delivred].x,packages[pack_to_delivred].y);
            mailmens[index_mail].packages.push(packages[pack_to_delivred].uid);
            mailmens[index_mail].x = packages[pack_to_delivred].x;
            mailmens[index_mail].y = packages[pack_to_delivred].y;
            mailmens[index_mail].length += new_distance;
            packages.splice(pack_to_delivred,1);
        } else {
            index_pack++;
        }
        
        
    }

    // Building of the answer as asked in the subject
    mailmens.forEach(mailmen =>{
        sol.push({
            "uid":mailmen.uid,
            "tour":mailmen.packages,
            "length":mailmen.length
        })
    })
    res.status(200).json(sol)
}
