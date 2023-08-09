const
    methods                   = require('./methods.js'),
    methodNames               = Object.keys(methods),
    {AsyncTest, AsyncRuntime} = require('../../src/model.js'),
    testDelay                 = 100,
    dataGenerator             = () => new Promise(resolve => setTimeout(resolve, testDelay, 2)),
    methodComparison          = new AsyncRuntime(dataGenerator);

for (let name of methodNames) {
    const test = new AsyncTest(name, methods[name]);
    methodComparison.register(test);
}

// methodComparison.exec(100, 100)
methodComparison.exec(1000, 1000)
    .then(runtime => runtime.print())
    .catch(console.error);
