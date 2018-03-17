function safeParse(val){
    let parsedVal;

    try {
        parsedVal = JSON.parse(val)
    } catch(e) {
        parsedVal = val;
    }

    return val;
}

function safeStringify(val){
    let stringifiedVal;

    try {
        stringifiedVal = JSON.stringify(val)
    } catch(e) {
        stringifiedVal = val;
    }

    return stringifiedVal;
}

module.exports = {
    safeParse,
    safeStringify,
};