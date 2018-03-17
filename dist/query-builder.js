'use strict';

var typeChecker = require('js-type-checker');

var _require = require('./encoder'),
    encode = _require.encode,
    decodeArr = _require.decodeArr;

function buildQueryVar(key, val, leadingAmp) {
    var temp = [];

    if (leadingAmp != null && leadingAmp === true) {
        temp.push('&');
    }

    temp.push(encode(key));

    if (val != null && val !== '') {
        temp.push('=', encode(val));
    }

    return temp;
}

function objToQueryString(value, depth, position, key) {
    depth = depth + 1;

    if (typeChecker.isObject(value) && depth === 1) {
        var keys = Object.keys(value);

        var temp = [];

        for (var i = 0, len = keys.length; i < len; i++) {
            var currentKey = keys[i];

            if (i === 0) {
                temp.push('?');
            }

            var item = value[currentKey];

            Array.prototype.push.apply(temp, objToQueryString(item, depth, position, currentKey));

            position = position + 1;
        }

        return temp.join("");
    } else if (typeChecker.isObject(value) && depth !== 1 || typeChecker.isArray(value) && depth > 2) {
        return buildQueryVar(key, JSON.stringify(value), position !== 0);
    } else if (typeChecker.isArray(value)) {
        var _temp = [];

        for (var _i = 0, _len = value.length; _i < _len; _i++) {
            var _item = value[_i];

            Array.prototype.push.apply(_temp, objToQueryString(_item, depth, position, key));

            position = position + 1;
        }

        return _temp;
    } else {
        return buildQueryVar(key, value, position !== 0);
    }
}

module.exports = {
    buildQueryVar: buildQueryVar,
    objToQueryString: objToQueryString
};