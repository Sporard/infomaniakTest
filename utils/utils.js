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


// Find the nearest package of the mailmen with the le smallest lenght
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

module.exports = {distance, smallest_mailmen, closetPackage}