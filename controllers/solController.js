
//Classic distance formula
const distance = function (Xa,Ya,Xb,Yb){
    let Xab =  (Xb - Xa) ** 2;
    let Yab =  (Yb - Ya) ** 2;
    return Math.sqrt(Xab + Yab);
}

//Find the mailmen with the smallest length
const smallest_mailmen = function (mailmens) {
    min_index = 0;
    min_length = mailmens[min_index].length;
    for (i = 0; i < mailmens.length; i++) {
        if (mailmens[i].length < min_length) {
            min_index = i;
            min_length = mailmens[i].length;
        }
    }
    return min_index;
}
//Find the nearest package of the mailmen with the le smallest lenght
// mailmens = list of all mailmen
// closeMailemen = index of the mailmen with the smallest lenght
// packages = list of all package
// startPack = index of the package to start assuming that every package before have been taken care of 

const closetPackage = function (mailmens, closeMailmen, packages, startPack) {
    min_index = startPack;
    min_length = distance(mailmens[closeMailmen].x,mailmens[closeMailmen].y,packages[startPack].x,packages[startPack].y);;
    for (i = startPack; i < packages.length; i++){
        new_distance = distance(mailmens[closeMailmen].x,mailmens[closeMailmen].y,packages[i].x,packages[i].y);
        new_to_home_length = distance(packages[i].x,packages[i].y,mailmens[closeMailmen].homeX,mailmens[closeMailmen].homeY);
        if ( (mailmens[closeMailmen].length + new_distance + new_to_home_length ) < 240 ) {
            if (new_distance < min_length) {
                min_length = new_distance;
                min_index = i;
            }
        }
    }
    new_to_home_length = distance(packages[min_index].x,packages[min_index].y,mailmens[closeMailmen].homeX,mailmens[closeMailmen].homeY);
    if ((mailmens[closeMailmen].length + new_distance + new_to_home_length) >= 240.0){
        return undefined;
    }
    return min_index;
}

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
        index_mail = smallest_mailmen(mailmens);
        pack_to_delivred = closetPackage(mailmens,index_mail,packages,index_pack);
        
        if(pack_to_delivred){
            new_distance = distance(mailmens[index_mail].x,mailmens[index_mail].y,packages[pack_to_delivred].x,packages[pack_to_delivred].y);
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
