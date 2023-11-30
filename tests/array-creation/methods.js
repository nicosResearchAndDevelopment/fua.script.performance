exports['empty array - push values'] = function (size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(i);
    }
    return arr;
};

exports['fixed array - fill and map values'] = function (size) {
    return new Array(size).fill(0).map((v, i) => i);
};

exports['fixed array - assign values'] = function (size) {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = i;
    }
    return arr;
};

exports['array from - map values'] = function (size) {
    return Array.from({length: size}, (v, i) => i);
};

exports['array from - value generator'] = function (size) {
    return Array.from((function* () {
        for (let i = 0; i < size; i++) {
            yield i;
        }
    })());
};
