const distance = function (Xa,Ya,Xb,Yb){
    let Xab =  (Xb - Xa) ** 2;
    let Yab =  (Yb - Ya) ** 2;
    return Math.sqrt(Xab + Yab);
}

exports.Solution = (req, res, next) => {
    //Data
    let packages = req.body.packages;
    let mailmens = req.body.mailmen;

    //We need to keep the home of mailmen in order
    //to came back after the delivery

    mailmens.forEach(mailmen => {
        mailmen.homeX = mailmen.x;
        mailmen.homeY = mailmen.y;
        mailmen.length = 0.0;
        mailmen.packages = [];
    })
    let sol = [];


    let indice_pack = 0;
    let indice_mail = 0;
    let pack_delivred;
    let new_distance;
    let new_to_home_length;
    indice_pack = 0;
    indice_mail = 0;
    while (indice_pack < packages.length) {

        pack_delivred = false;
        new_distance = distance(mailmens[indice_mail].x,mailmens[indice_mail].y,packages[indice_pack].x,packages[indice_pack].y);
        new_to_home_length = distance(packages[indice_pack].x,packages[indice_pack].y,mailmens[indice_mail].homeX,mailmens[indice_mail].homeY);
        // If we go over 240 km with the package 
        if (mailmens[indice_mail].length + new_distance > 240.00) {
            
            pack_delivred = false;
        }
        //If we go over 240km by returning home
        else if (indice_mail < mailmens.length &&(mailmens[indice_mail].length + new_distance + new_to_home_length) > 240.00  ) {
            pack_delivred = false;

        }
        //If the package hasn't been delivred we put it into waiting room
        else if (indice_mail >= mailmens.length && !pack_delivred) {
            waiting.push(packages[indice_pack]);
            pack_delivred = false;
        }
        // Package delivred
        else {
            pack_delivred = true;
        }
        //If the package is delivred so we update the data of the mailmen
        //We go to the next package and mailmen in order to distribute
        //package equitably
        if (pack_delivred) {
            mailmens[indice_mail].packages.push(packages[indice_pack].uid);
            mailmens[indice_mail].x = packages[indice_pack].x;
            mailmens[indice_mail].y = packages[indice_pack].y;
            mailmens[indice_mail].length += new_distance;
            indice_pack++;
            indice_mail++;
        } else {
            //If the package is not delivred we go to the next one and the next mailmen
            indice_mail ++;
            indice_pack ++;
        }
        //If we have try every mailmen but not every package we go back to the first mailmen
        if (indice_mail >= mailmens.length) {
            indice_mail = 0;
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
