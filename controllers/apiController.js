packages = require("../models/package");
mailmens = require("../models/mailmen");
waiting = require("../models/waiting");


// Post Ressources

exports.postData = (req,res,next) => {
    packages = req.body.packages;
    mailmen = req.body.mailmen;
    return res.status(200);
}

exports.Solution = (req, res, next) => {
    //Récupération des data
    console.log(waiting);
    console.log(packages);
    console.log(mailmens);
    // packages = req.body.packages;
    // mailmens = req.body.mailmen;
    //On garde les points de départ des mailmens
    //On ajoute aussi la distance parcouru par le mailmen au fur et a mesure

    mailmens.forEach(mailmen => {
        mailmen.homeX = mailmen.x;
        mailmen.homeY = mailmen.y;
        mailmen.length = 0.0;
        mailmen.packages = [];
    })
    let sol = [];
    //On distribue chaque package
    //on donne un packet par livreur et on boucle sur les livreurs pour etre équitable 
    let indice_pack = 0;
    let indice_mail = 0;
    let pack_delivred;
    let pack;
    let distanceX;
    let distanceY;
    let new_distance;
    let new_to_homeX;
    let new_to_homeY;
    let new_to_home_length;
    while (indice_pack < packages.length) {
        //Si le pack a été pris pas un mailmen
        pack_delivred = false;
        distanceX = (packages[indice_pack].x - mailmens[indice_mail].x) ** 2;
        distanceY = (packages[indice_pack].y - mailmens[indice_mail].y) ** 2;
        new_distance = Math.sqrt(distanceX + distanceY);
        new_to_homeX = (mailmens[indice_mail].homeX - packages[indice_pack].x) ** 2;
        new_to_homeY = (mailmens[indice_mail].homeY - packages[indice_pack].y) ** 2;
        new_to_home_length = Math.sqrt(new_to_homeX + new_to_homeY);
        //Si on dépasse les 240 avant d'arriver au colis en cours
        //On passe au prochain mailmen
        if (mailmens[indice_mail].length + new_distance > 240) {
            indice_mail += 1;
        }
        //Si on dépasse en rentrant à la maison apres
        //on passe au prochain mailmen
        if ((mailmens[indice_mail].length + new_distance + new_to_home_length) > 240) {
            indice_mail += 1;
        }
        //Si le paquet n'a pas été livré et qu'on a tester sur
        // tout les mailmens alors on le mets en attente
        if (indice_mail >= mailmens.length && !pack_delivred) {
            wait.push(pack);
            indice_pack +=1;
        }
        // Le paquet est délivré
        else {
            //Sinon on ajoute le package au mailmen
            mailmens[indice_mail].packages.push(packages[indice_pack].uid);
            mailmens[indice_mail].x = packages[indice_pack].x;
            mailmens[indice_mail].y = packages[indice_pack].y;

            mailmens[indice_mail].length += new_distance;
            indice_pack += 1;
            indice_mail += 1;
            pack_delivred = true;

        }
        //On boucle sur les livreurs pour bien redistribuer les packages

        if (indice_mail >= mailmens.length) {
            indice_mail = 0;
        }
    }
    mailmens.forEach(mailmen =>{
      sol.push({
          "uid":mailmen.uid,
          "tour":mailmen.packages,
          "length":mailmen.length
      })
    })
    res.status(200).json(sol)
}
