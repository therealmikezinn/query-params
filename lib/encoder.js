exports = module.exports = {
    encode: function(item){
        return encodeURIComponent(item);
    },
    encodeArr: function(arr){
        for(let i = 0, len = arr.length; i < len; i++){
            let cur = arr[i];

            if(cur !== '&' && cur !== '=' && cur !== '?'){
                arr[i] = encodeURIComponent(arr[i]);
            }

            if(cur === '&'){
                arr[i] = ''
            }
        }
    },
    decodeArr: function(arr){
        return arr.map((element) => {
            return decodeURIComponent(element);
        });
    },
    decode: function(element){
        return decodeURIComponent(element);
    },
};