const { encode, decodeArr } = require('./encoder');

const typeChecker = require('js-type-checker');

const { objToQueryString } = require('./query-builder');

function QueryParams(uri){
    if(!(this instanceof QueryParams)){
        return new QueryParams(uri);
    }

    uri = typeChecker.isString(uri) ? uri : "";

    const self = this;

    const queryRegex = /\?.*/;

    const hashRegex = /#.*/;

    const queryStart = uri.search(queryRegex);

    const hashStart = uri.search(hashRegex);

    self.params = {};

    self.uri = uri;

    self.query = '';

    if (queryStart === -1) {
        return;
    }

    self.query = (hashStart === -1) ? uri.slice(queryStart + 1) : uri.slice(queryStart + 1, hashStart - 1);

    const splitParams =  self.query.split('&');

    for (let i = 0, len = splitParams.length; i < len && self.query !== ''; i++) {
        const currentParams = splitParams[i];

        const tempArr = decodeArr(currentParams.split('=') || []);

        self.setOrAppend(tempArr[0], tempArr[1]);
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
    has: function(key){
        const self = this;

        return self.params ? {}.hasOwnProperty.call(self.params, key) : false;
    },
    get: function(key){
        const self = this;

        return self.params[key];
    },
    contains: function(keys){
        const self = this;

        if (!typeChecker.isArray(keys)) {
            keys = [keys];
        }

        for(let i = 0, len = keys.length; i < len; i++){
            const cur = keys[i];

            if(!self.has(cur)){
                return false;
            }
        }

        return true;
    },
    pick: function(keys){
        const self = this;

        const temp = {};

        for(let i = 0, len = keys.length; i < len; i++){
            const cur = keys[i];

            if(this.has(cur)) {
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

exports = module.exports = QueryParams;
