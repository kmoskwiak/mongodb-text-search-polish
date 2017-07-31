'use strict';

/**
 * Stemmer based on python project https://github.com/Tutanchamon/pl_stemmer
 * by @Tutanchamon
 * JS and improvents by @kmoskwiak
 */

function removeGeneralEnds(word){
    if(word.length > 4 && ( ['ia', 'ie'].indexOf(word.slice(-2)) > -1 )){
        return word.slice(0, -2);
    }
    if(word.length > 4 && ( ['u', 'ą', 'i', 'a', 'ę', 'y', 'ł'].indexOf(word.slice(-1)) > -1 )){
        return word.slice(0, -1);
    }
    return word;
}

function removeDiminutive(word){
    if(word.length > 6){
        if(['eczek', 'iczek', 'iszek', 'aszek', 'uszek'].indexOf(word.slice(-5)) > -1){
            return word.slice(0, -5);
        }
        if(['enek', 'ejek', 'erek'].indexOf(word.slice(-4)) > -1){
            return word.slice(0, -2);
        }
    }
    if(word.length > 4 && (['ek', 'al'].indexOf(word.slice(-2)) > -1)){
        return word.slice(0, -2);
    }
    return word;
}

function removeVerbsEnds(word){
    if(word.length > 5 && ( ['bym'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -3);
    }
    if(word.length > 5 && ( ['esz', 'asz', 'cie', 'eść', 'aść', 'łem', 'amy', 'emy'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -3);
    }
    if(word.length > 3 && ( ['esz', 'asz', 'eść', 'aść'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -2);
    }
    if(word.length > 4 && ( ['aj', 'eć'].indexOf(word.slice(-2)) > -1 )){
        return word.slice(0, -1);
    }
    if(word.length > 4 && ( ['ać', 'em', 'am', 'ał', 'ił', 'ić', 'ąc'].indexOf(word.slice(-2)) > -1 )){
        return word.slice(0, -2);
    }
    return word;
}

function removeNouns(word){
    if(word.length > 7 && ( ['zacja', 'zacją', 'zacje', 'zacji'].indexOf(word.slice(-5)) > -1 )){
        return word.slice(0, -4);
    }
    if(word.length > 6 && ( ['acja', 'acji', 'acją', 'acje', 'tach', 'anie', 'enie', 'eniu', 'aniu'].indexOf(word.slice(-5)) > -1 )){
        return word.slice(0, -4);
    }
    if(word.length > 6 && ( ['tyka'].indexOf(word.slice(-1)) > -1 )){
        return word.slice(0, -2);
    }
    if(word.length > 5 && ( ['ach', 'ami', 'nia', 'niu', 'cia', 'ciu'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -3);
    }
    if(word.length > 5 && ( ['cji', 'cja', 'cją'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -2);
    }
    if(word.length > 5 && ( ['ce', 'ta', 'eń'].indexOf(word.slice(-2)) > -1 )){
        return word.slice(0, -2);
    }
    return word;
}

function removeAdjectiveEnds(word){
    if(word.length > 7 && ( ['naj'].indexOf(word.slice(0,3)) > -1 ) && ( ( ['sze'].indexOf(word.slice(-3)) > -1 ) || ( ['szy'].indexOf(word.slice(-3)) > -1 ) )){
        return word.slice(3, -4);
    }
    if(word.length > 7 && ( ['naj'].indexOf(word.slice(0,3)) > -1 ) && ( ( ['szych'].indexOf(word.slice(-5)) > -1 ) )){
        return word.slice(3, -5);
    }
    if(word.length > 6 && ( ['czny'].indexOf(word.slice(-4)) > -1 )){
        return word.slice(0, -4);
    }
    if(word.length > 5 && ( ['owy', 'owa', 'owe', 'ych', 'ego'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -3);
    }
    if(word.length > 5 && ( ['ej'].indexOf(word.slice(-2)) > -1 )){
        return word.slice(0, -2);
    }
    return word;
}

function removeAdverbsEnds(word){
    if(word.length > 4 && ( ['nie', 'wie'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -2);
    }
    if(word.length > 4 && ( ['rze'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -2);
    }
    return word;
}

function removePluralForms(word){
    if(word.length > 4 && ( ['ów', 'om'].indexOf(word.slice(-2)) > -1 )){
        return word.slice(0, -2);
    }
    if(word.length > 4 && ( ['ami'].indexOf(word.slice(-3)) > -1 )){
        return word.slice(0, -3);
    }
    return word;
}

function stem(word){
    word = word.toLowerCase();
    word = removeNouns(word);
    word = removeDiminutive(word);
    word = removeAdjectiveEnds(word);
    word = removeVerbsEnds(word);
    word = removeAdverbsEnds(word);
    word = removePluralForms(word);
    word = removeGeneralEnds(word);
    return word;
}

export default stem;