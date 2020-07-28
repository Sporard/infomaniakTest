const packages = []
const mailmen = [];



// Post Ressources

exports.postData = (req,res,next) => {
    packages = req.body.packages;
    mailmen = req.body.mailmen;
}

exports.solution = (req, res, next) => {
    //Récupération des data
    packages = req.body.packages;
    mailmens = req.body.mailmen;
    //On garde les points de départ des mailmens
    //On ajoute aussi la distance parcouru par le mailmen au fur et a mesure

    mailmens.forEach(mailmen => {
        mailmen.homeX = mailmen.x;
        mailmen.homeY = mailmen.y;
        mailmen.length = 0;
        mailmen.packages = [];
    })
    sol = [];
    //On distribue chaque package
    //on donne un packet par livreur et on boucle sur les livreurs pour etre équitable 
    indice_pack = 0;
    indice_mail = 0;
    while(current_pack < packages.length) {
        mailmen = mailmens[indice_mail];
        pack = packages[indice_pack];
        distanceX = (pack.x - mailmen.x)**2;
        distanceY = (pack.y - mailmen.y)**2;
        new_distance = Math.sqrt(distanceX + distanceY);
        new_to_homeX = (mailmen.homeX - pack.x) **2;
        new_to_homeY = (mailmen.homeY - pack.y) **2;
        new_to_home_length = Math.sqrt(new_to_homeX + new_to_homeY);
        
        //Si on dépasse les 240 avant d'arriver au colis en cours
        if(mailmen.length + new_distance > 240){
            //TODO
            mailmen.packages.push(pack.uid);
            mailmen.x = pack.x
            mailmen.y = pack.y
            mailmen.length += new_distance;
            indice_pack += 1;
            indice_mail +=1;
        
        }
        //Si on dépasse en rentrant à la maison apres
        if ((mailmen.length + new_distance + new_to_home_length) > 240){
            //TODO
        } else {
            //Sinon on ajoute le package au mailmen
            mailmen.packages.push(pack.uid);
            mailmen.x = pack.x
            mailmen.y = pack.y
            mailmen.length += new_distance;
            indice_pack += 1;
            indice_mail +=1;
        
        }
        
        
        //On boucle sur les livreurs pour bien redistribuer les packages

        if (indice_mail>mailmens.length) {
            indice_mail = 0;
        }
        
    }
    packages.forEach(package => {
        
        distanceX = (package.x - mailmen.x)**2;
        distanceY = (package.y - mailmen.y)**2;
        distance = Math.sqrt(distanceX + distanceY);
        if(current_mailmen.length + distance > 240){

        }

        
    });
}
