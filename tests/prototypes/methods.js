const
    assert = require('@nrd/fua.core.assert');

const TestPrototype = {
    add(other) {
        return this.value + other;
    },
    mult(other) {
        return this.value * other;
    }
};

class ClassTest {
    constructor(value) {
        this.value = value;
    }

    add(other) {
        return this.value + other;
    }

    mult(other) {
        return this.value * other;
    }
}

function FuncTest(value) {
    this.value = value;
}

FuncTest.prototype = {constructor: FuncTest, ...TestPrototype};

exports.fromNone = function ({a, b}) {
    return a + b;
};

exports.fromClass = function ({a, b}) {
    const instance = new ClassTest(a);
    return instance.add(b);
};

exports.fromFunc = function ({a, b}) {
    const instance = new FuncTest(a);
    return instance.add(b);
};

exports.fromBuild = function ({a, b}) {
    const instance = Object.create(TestPrototype, {value: {value: a}});
    return instance.add(b);
};

// for (let key in exports) {
//     const a = 10, b = 20;
//     console.log(key, exports[key]({a, b}));
// }
