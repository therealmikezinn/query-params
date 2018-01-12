const { decode } = require('./encoder');

const typeChecker = require('js-type-checker');

const { objToQueryString } = require('./query-builder');

function QueryParams(uri){
    if(!(this instanceof QueryParams)){
        return new QueryParams(uri);
    }

    uri = typeChecker.isString(uri) ? uri : "";

    const self = this;

    self.params = {};

    const hashRegex = /#.*/;

    const queryParser = /[?&]([^=?&]+)=?([^=?&]*)/g;

    const hashStart = uri.search(hashRegex);

    if (hashStart !== -1) {
        uri = uri.slice(0, hashStart);
    }

    let result;

    while ((result = queryParser.exec(uri)) !== null) {
        const [, key, value] = result;

        self.setOrAppend(decode(key), decode(value));
    }
}

QueryParams.prototype = {
    append: function(base){
        const self = this;

        return [
            base,
            self.toString(),
        ].join("");
    },
    contains: function(keys){
        const self = this;

        if (!typeChecker.isArray(keys)) {
            keys = [keys];
        }

        for (let i = 0, len = keys.length; i < len; i++) {
            const cur = keys[i];

            if(!self.has(cur)){
                return false;
            }
        }

        return true;
    },
    has: function(key){
        const self = this;

        return self.params ? {}.hasOwnProperty.call(self.params, key) : false;
    },
    get: function(key){
        const self = this;

        return self.params[key];
    },
    pick: function(keys){
        const self = this;

        const temp = {};

        for (let i = 0, len = keys.length; i < len; i++) {
            const cur = keys[i];

            if(self.has(cur)) {
                temp[cur] = self.get(cur);
            }
        }

        return temp;
    },
    set: function(key, value){
        const self = this;

        if (typeChecker.isArray(value)) {
            self.params[key] = value.slice(0);
        } else if (typeChecker.isObject(value)) {
            self.params[key] = Object.assign({}, value);
        } else {
            self.params[key] = value;
        }
    },
    setOrAppend: function(key, value){
        const self = this;

        if(self.has(key)){
            if(typeChecker.isArray(this.params[key])){
                self.params[key].push(value);
            } else {
                self.params[key] = [self.params[key], value];
            }
        } else {
            self.params[key] = value;
        }

        return this;
    },
    toString: function(){
        const self = this;

        return objToQueryString(self.params, 0, 0);
    },
};

QueryParams.toQueryString = function(obj, base){
    if (!typeChecker.isObject(obj)) {
        throw {
            error: "Parameter Must Be An Object",
        }
    }

    return [
        base || '',
        objToQueryString(obj, 0, 0),
    ].join("");
};

exports = module.exports = QueryParams;
