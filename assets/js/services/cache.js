const cache = {};

function set(key, data){

    cache[key] = {
        data: data,
        expiredAt: new Date().getTime()
    }
}

function get(key){
    return cache[key] ? cache[key].data : null;
}

export default {
    set,
    get
}