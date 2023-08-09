const
    methods          = require('./methods.js'),
    methodNames      = Object.keys(methods),
    {Test, Runtime}  = require('../../src/model.js'),
    dataGenerator    = () => 1000,
    methodComparison = new Runtime(dataGenerator);

for (let name of methodNames) {
    const test = new Test(name, methods[name]);
    methodComparison.register(test);
}

methodComparison.exec(1000, 1000).print();
