const
    methods          = require('./methods.js'),
    methodNames      = Object.keys(methods).filter(key => !key.startsWith('_')),
    {Test, Runtime}  = require('../../src/model.js'),
    methodComparison = new Runtime(methods._randomKeyVariant),
    testRepetitions  = 5000,
    sampleSize       = 2000;

console.log('nestingDepth:', methods._nestingDepth);
console.log('keyParts:', methods._keyParts);
console.log('keyVariants:', methods._keyVariants);
console.log('testRepetitions:', testRepetitions);
console.log('sampleSize:', sampleSize);

for (let name of methodNames) {
    const test = new Test(name, methods[name]);
    methodComparison.register(test);
}

setTimeout(() => methodComparison.exec(testRepetitions, sampleSize).print(), 200);
