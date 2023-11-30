const
    methods               = require('./methods.js'),
    methodNames           = Object.keys(methods),
    {Test, Runtime}       = require('../../src/model.js'),
    createGenerator       = (min, max) => () => min + Math.floor((max - min + 1) * Math.random()),
    shortArrayComparison  = new Runtime(createGenerator(1, 9)),
    mediumArrayComparison = new Runtime(createGenerator(10, 99)),
    largeArrayComparison  = new Runtime(createGenerator(100, 999)),
    hugeArrayComparison   = new Runtime(createGenerator(1000, 9999));

for (let name of methodNames) {
    const test = new Test(name, methods[name]);
    shortArrayComparison.register(test);
    mediumArrayComparison.register(test);
    largeArrayComparison.register(test);
    hugeArrayComparison.register(test);
}

console.log('for short arrays of length 1 to 9');
shortArrayComparison.exec(1000, 2000).print();

console.log('for medium arrays of length 10 to 99');
mediumArrayComparison.exec(500, 1200).print();

console.log('for large arrays of length 100 to 999');
largeArrayComparison.exec(200, 500).print();

console.log('for huge arrays of length 1000 to 9999');
hugeArrayComparison.exec(50, 200).print();
