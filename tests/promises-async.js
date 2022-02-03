const
    promisesAsync             = require('../code/promises-async.js'),
    methods                   = Object.keys(promisesAsync),
    {AsyncTest, AsyncRuntime} = require('../src/index.js'),
    testDelay                 = 100,
    dataGenerator             = () => new Promise(resolve => setTimeout(resolve, testDelay, 2)),
    methodComparison          = new AsyncRuntime(dataGenerator);

for (let name of methods) {
    const test = new AsyncTest(name, promisesAsync[name]);
    methodComparison.register(test);
}

// methodComparison.exec(100, 100)
methodComparison.exec(1000, 1000)
    .then(runtime => runtime.print())
    .catch(console.error);
