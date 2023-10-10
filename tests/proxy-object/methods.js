const nativeObject = {
    'a': 'a',
    'b': 'b',
    'c': 'c',
    'd': 'd',
    'e': 'e',
    'f': 'f'
};

exports.accessObject = function (key) {
    return nativeObject[key];
};

const proxyHandler = {
    get(target, property, receiver) {
        return target[property];
    },
    set(target, property, value, receiver) {
        target[property] = value;
        return true;
    }
};

const proxyWrapper = new Proxy(nativeObject, proxyHandler);

exports.accessProxy = function (key) {
    return proxyWrapper[key];
};
