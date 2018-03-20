# query-params

## API

* Class: QueryParams
    * QueryParams.parseQuery
    * QueryParams.queryBuilder
    * QueryParams.toQueryString
    * queryParams.append
    * queryParams.contains
    * queryParams.get
    * queryParams.getAll
    * queryParams.has
    * queryParams.merge
    * queryParams.pick
    * queryParams.set
    * queryParams.setOrAppend
    * queryParams.toString
    * queryParams.toUrl

### ```QueryParams([uri]) ```

* uri ```<string>```

Parses a query string into an object, and
wraps it in a QueryParams instance.

### ```QueryParams.parseQuery(uri)```

* uri ```<string>```

Parses a query string into an object

### ```QueryParams.queryBuilder(obj)```

* obj ```<object>```

### ```QueryParams.toQueryString(obj[, prefix[, postfix]])```

* obj
* base

### ```queryParams.append(key, value)```

*  key ```<string>``` -
*  value ```<any>```  -

A class method that appends a value to the array for
property key. If the property key does not exist
or is not an array, append replaces the value stored at
key with an array containg the existing element, and the new
element(value).

Return a reference to QueryParams.

### ```queryParams.contains(keys)```

* keys ```<array>``` - array of property names

Return Boolean

### ```queryParams.get(key)```

Returns the value at the specified key

### ```queryParams.getAll()```

Returns the object containing the values
of the query string

### ```queryParams.has(key)```

* key ```<string>```

### ```queryParams.merge(obj)```

* obj ```<object>```

### ```queryParams.pick(keys)```

* keys ```<array>```

### ```queryParams.set(key, value)```

* key ```<string>```
* value ```<any>```

### ```queryParams.setOrAppend(key, value)```

* key ```<string>```
* value ```<any>```

### ```queryParams.stringify()```

Converts the QueryParams object into a query string

Returns a String

### ```queryParams.toUrl([prefix [, postfix]])```

* prefix ```<string>```
* postfix ```<string>```