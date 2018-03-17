"use strict";

function safeParse(val) {
    var parsedVal = void 0;

    try {
        parsedVal = JSON.parse(val);
    } catch (e) {
        parsedVal = val;
    }

    return val;
}

function safeStringify(val) {
    var stringifiedVal = void 0;

    try {
        stringifiedVal = JSON.stringify(val);
    } catch (e) {
        stringifiedVal = val;
    }

    return stringifiedVal;
}

module.exports = {
    safeParse: safeParse,
    safeStringify: safeStringify
};