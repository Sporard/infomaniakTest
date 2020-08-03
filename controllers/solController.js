const distance = function (Xa,Ya,Xb,Yb){
    let Xab =  (Xb - Xa) ** 2;
    let Yab =  (Yb - Ya) ** 2;
    return Math.sqrt(Xab + Yab);
}
const smallest_mailmen = function (mailmens) {
    min_indice = 0;
    min_length = mailmens[min_indice].length;
    for (i = 0; i < mailmens.length; i++) {
        if (mailmens[i].length < min_length) {
            min_indice = i;
            min_length = mailmens[i].length;
        }
    }
    return min_indice;
}

const closetPackage = function (mailmens, closeMailmen, packages, startPack) {
    min_indice = startPack;
    min_length = distance(mailmens[closeMailmen].x,mailmens[closeMailmen].y,packages[startPack].x,packages[startPack].y);;
    for (i = startPack; i < packages.length; i++){
        new_distance = distance(mailmens[closeMailmen].x,mailmens[closeMailmen].y,packages[i].x,packages[i].y);
        new_to_home_length = distance(packages[i].x,packages[i].y,mailmens[closeMailmen].homeX,mailmens[closeMailmen].homeY);
        if ( (mailmens[closeMailmen].length + new_distance + new_to_home_length ) < 240 ) {
            if (new_distance < min_length) {
                min_length = new_distance;
                min_indice = i;
            }
        }
    }
    new_to_home_length = distance(packages[min_indice].x,packages[min_indice].y,mailmens[closeMailmen].homeX,mailmens[closeMailmen].homeY);
    if ((mailmens[closeMailmen].length + new_distance + new_to_home_length) > 240.0){
        return undefined;
    }
    return min_indice;
}

//So we need to find the mailmen with the min length
//Then we need to find the package not traited closest to this mailmen 

exports.Solution = (req, res, next) => {
    //Data
    let packages = req.body.packages;
    let mailmens = req.body.mailmen;

    //We need to keep the home of mailmen in order
    //to came back after the delivery
    console.log(req);
    mailmens.forEach(mailmen => {
        mailmen.homeX = mailmen.x;
        mailmen.homeY = mailmen.y;
        mailmen.length = 0.0;
        mailmen.packages = [];
    })
    let sol = [];


    let indice_pack = 0;
    let indice_mail = 0;
    while (indice_pack < packages.length) {
        indice_mail = smallest_mailmen(mailmens);
        pack_to_delivred = closetPackage(mailmens,indice_mail,packages,indice_pack);
        
        if(pack_to_delivred){
            new_distance = distance(mailmens[indice_mail].x,mailmens[indice_mail].y,packages[pack_to_delivred].x,packages[pack_to_delivred].y);
            mailmens[indice_mail].packages.push(packages[pack_to_delivred].uid);
            mailmens[indice_mail].x = packages[pack_to_delivred].x;
            mailmens[indice_mail].y = packages[pack_to_delivred].y;
            mailmens[indice_mail].length += new_distance;
            packages.splice(pack_to_delivred,1);
        } else {
            indice_pack++;
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
