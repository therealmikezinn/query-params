function safeParse(val){
    let parsedVal;

    try {
        parsedVal = JSON.parse(val)
    } catch(e) {
        parsedVal = val;
    } finally {
        return val;
    }
}

function safeStringify(val){
    "use strict";

}