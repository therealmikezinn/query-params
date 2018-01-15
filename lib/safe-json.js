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
    let stringifiedVal;

    try {
        stringifiedVal = JSON.stringify(val)
    } catch(e) {
        stringifiedVal = val;
    } finally {
        return val;
    }

}