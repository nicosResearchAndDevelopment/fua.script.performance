const
    methods          = require('./methods.js'),
    methodNames      = Object.keys(methods),
    {Test, Runtime}  = require('../../src/model.js'),
    dataGenerator    = () => new Date(Math.floor(2e12 * Math.random())),
    methodComparison = new Runtime(dataGenerator);

for (let name of methodNames) {
    const test = new Test(name, methods[name]);
    methodComparison.register(test);
}

methodComparison.exec(5000, 2000).print();
