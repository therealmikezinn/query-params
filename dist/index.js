'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var typeChecker = require('js-type-checker');

var _require = require('./encoder'),
    decode = _require.decode;

var _require2 = require('./query-builder'),
    objToQueryString = _require2.objToQueryString;

function QueryParams(uri) {
    if (!(this instanceof QueryParams)) {
        return new QueryParams(uri);
    }

    uri = typeChecker.isString(uri) ? uri : "";

    var self = this;

    self.params = {};

    var hashRegex = /#.*/;

    var queryParser = /[?&]([^=?&]+)=?([^=?&]*)/g;

    var hashStart = uri.search(hashRegex);

    if (hashStart !== -1) {
        uri = uri.slice(0, hashStart);
    }

    var result = void 0;

    while ((result = queryParser.exec(uri)) !== null) {
        var _result = result,
            _result2 = _slicedToArray(_result, 3),
            key = _result2[1],
            value = _result2[2];

        self.setOrAppend(decode(key), decode(value));
    }
}

QueryParams.prototype = {
    append: function append(key, value) {
        var self = this;

        if (!self.has(key)) {
            self.params[key] = [value];
        } else if (typeChecker.isArray(self.get(key))) {
            self.get(key).push(value);
        } else {
            self.set(key, [self.get(key), value]);
        }

        return self;
    },
    contains: function contains(keys) {
        var self = this;

        if (!typeChecker.isArray(keys)) {
            keys = [keys];
        }

        for (var i = 0, len = keys.length; i < len; i++) {
            var cur = keys[i];

            if (!self.has(cur)) {
                return false;
            }
        }

        return true;
    },
    has: function has(key) {
        var self = this;

        return self.params ? {}.hasOwnProperty.call(self.params, key) : false;
    },
    get: function get(key) {
        var self = this;

        if (typeChecker.isArray(self.params[key])) {
            return self.params[key].slice(0);
        } else if (typeChecker.isObject(self.params[key])) {
            return Object.assign({}, self.params[key]);
        } else {
            return self.params[key];
        }
    },
    getAll: function getAll() {
        var self = this;

        return Object.assign({}, self.params);
    },
    merge: function merge(obj) {
        var self = this;

        if (!typeChecker.isObject(obj)) {
            throw {
                error: "Parameter Obj Must Be An Object"
            };
        }

        Object.assign(self.params, obj);

        return self;
    },
    pick: function pick(keys) {
        var self = this;

        var temp = {};

        for (var i = 0, len = keys.length; i < len; i++) {
            var cur = keys[i];

            if (self.has(cur)) {
                temp[cur] = self.get(cur);
            }
        }

        return temp;
    },
    set: function set(key, value) {
        var self = this;

        if (typeChecker.isArray(value)) {
            self.params[key] = value.slice(0);
        } else if (typeChecker.isObject(value)) {
            self.params[key] = Object.assign({}, value);
        } else {
            self.params[key] = value;
        }

        return self;
    },
    setOrAppend: function setOrAppend(key, value) {
        var self = this;

        if (self.has(key)) {
            self.append(key, value);
        } else {
            self.set(key, value);
        }

        return self;
    },
    toString: function toString() {
        var self = this;

        return objToQueryString(self.params, 0, 0);
    },
    toUrl: function toUrl(base) {
        var self = this;

        return [base, self.toString()].join("");
    }
};

QueryParams.toQueryString = function toQueryString(base, obj) {
    return QueryParams().merge(obj).toUrl(base);
};

QueryParams.parseQuery = function parseQuery(url) {
    return QueryParams(url).getAll();
};

QueryParams.queryBuilder = function queryBuilder(obj) {
    return QueryParams().merge(obj);
};

module.exports = QueryParams;