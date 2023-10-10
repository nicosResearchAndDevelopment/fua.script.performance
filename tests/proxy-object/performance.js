const
    methods          = require('./methods.js'),
    methodNames      = Object.keys(methods),
    {Test, Runtime}  = require('../../src/model.js'),
    randomInt        = (min, max) => min + Math.floor((max - min + 1) * Math.random()),
    objectKeys       = ['a', 'b', 'c', 'd', 'e', 'f'],
    dataGenerator    = () => objectKeys[randomInt(0, objectKeys.length - 1)],
    methodComparison = new Runtime(dataGenerator);

for (let name of methodNames) {
    const test = new Test(name, methods[name]);
    methodComparison.register(test);
}

methodComparison.exec(5000, 2000).print();
