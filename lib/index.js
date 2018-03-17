const typeChecker = require('js-type-checker');

const { decode } = require('./encoder');

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
    append(key, value) {
        const self = this;

        if(!self.has(key)) {
            self.params[key] = [value];
        } else if (typeChecker.isArray(self.get(key))) {
            self.get(key).push(value);
        } else {
            self.set(key, [self.get(key), value]);
        }

        return self;
    },
    contains(keys) {
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
    has(key) {
        const self = this;

        return self.params ? {}.hasOwnProperty.call(self.params, key) : false;
    },
    get(key) {
        const self = this;

        if (typeChecker.isArray(self.params[key])) {
            return self.params[key].slice(0);
        } else if (typeChecker.isObject(self.params[key])) {
            return Object.assign({}, self.params[key]);
        } else {
            return self.params[key];
        }
    },
    getAll() {
        const self = this;

        return Object.assign({}, self.params);
    },
    merge(obj) {
        const self = this;

        if (!typeChecker.isObject(obj)) {
           throw {
               error: "Parameter Obj Must Be An Object",
           }
        }

        Object.assign(self.params, obj);

        return self;
    },
    pick(keys) {
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
    set(key, value) {
        const self = this;

        if (typeChecker.isArray(value)) {
            self.params[key] = value.slice(0);
        } else if (typeChecker.isObject(value)) {
            self.params[key] = Object.assign({}, value);
        } else {
            self.params[key] = value;
        }

        return self;
    },
    setOrAppend(key, value) {
        const self = this;

        if(self.has(key)){
            self.append(key, value);
        } else {
            self.set(key, value);
        }

        return self;
    },
    toString() {
        const self = this;

        return objToQueryString(self.params, 0, 0);
    },
    toUrl(base) {
        const self = this;

        return [
            base,
            self.toString(),
        ].join("");
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
