'use strict';

module.exports = {
    encode: function encode(item) {
        return encodeURIComponent(item);
    },
    encodeArr: function encodeArr(arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            var cur = arr[i];

            if (cur !== '&' && cur !== '=' && cur !== '?') {
                arr[i] = encodeURIComponent(arr[i]);
            }

            if (cur === '&') {
                arr[i] = '';
            }
        }
    },
    decodeArr: function decodeArr(arr) {
        return arr.map(function (element) {
            return decodeURIComponent(element);
        });
    },
    decode: function decode(element) {
        return decodeURIComponent(element);
    }
};