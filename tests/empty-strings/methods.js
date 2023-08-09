exports.arrayJoin = function (length) {
    return new Array(length + 1).join(' ');
};

exports.arrayFillJoin = function (length) {
    return new Array(length).fill(' ').join('');
};

exports.padStart = function (length) {
    return ''.padStart(length, ' ');
};

exports.padEnd = function (length) {
    return ''.padEnd(length, ' ');
};

exports.concatLoop = function (length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += ' ';
    }
    return result;
};

exports.concatRecursion = function _recurse(length) {
    return length > 0 && _recurse(length - 1) + ' ' || '';
};

exports.halvingRecursion = function _recurse(length) {
    if (length === 1) return ' ';
    if (length === 0) return '';
    const tmp = _recurse(Math.floor(length / 2));
    return (length % 2 > 0) ? (tmp + tmp + ' ') : (tmp + tmp);
};

exports.bufferAlloc = function (length) {
    return Buffer.alloc(length, ' ').toString();
};
