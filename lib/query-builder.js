const typeChecker = require('js-type-checker');

const { encode, decodeArr } = require('./encoder');

function buildQueryVar(key, val, leadingAmp){
    const temp = [];

    if(leadingAmp != null && leadingAmp === true){
        temp.push('&')
    }

    temp.push(encode(key));

    if (val != null && val !== '') {
        temp.push('=', encode(val));
    }

    return temp;
}

function objToQueryString(value, depth, position, key){
    depth = depth + 1;

    if(typeChecker.isObject(value) && depth === 1){
        const keys = Object.keys(value);

        let temp = [];

        for(let i = 0, len = keys.length; i < len; i++) {
            const currentKey = keys[i];

            if (i === 0) {
                temp.push('?')
            }

            const item = value[currentKey];

            Array.prototype.push.apply(temp, objToQueryString(item, depth, position, currentKey));

            position = position + 1;
        }

        return temp.join("");
    } else if((typeChecker.isObject(value) && depth !== 1) || (typeChecker.isArray(value) && depth > 2)) {
        return buildQueryVar(key, JSON.stringify(value), position !== 0);
    } else if(typeChecker.isArray(value)){
        const temp = [];

        for(let i = 0, len = value.length; i < len; i++) {
            const item = value[i];

            Array.prototype.push.apply(temp, objToQueryString(item, depth, position, key));

            position = position + 1;
        }

        return temp;
    } else {
        return buildQueryVar(key, value, position !== 0);
    }
}

exports = module.exports = {
    buildQueryVar,
    objToQueryString,
};
