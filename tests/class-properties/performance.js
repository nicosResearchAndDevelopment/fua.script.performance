const
    methods          = require('./methods.js'),
    methodNames      = Object.keys(methods),
    {Test, Runtime}  = require('../../src/model.js'),
    randomInt        = (min, max) => min + Math.floor((max - min + 1) * Math.random()),
    valueGenerators  = {
        propA: () => randomInt(100, 999).toString(),
        propB: () => [randomInt(100, 999)],
        propC: () => ({value: randomInt(100, 999)})
    },
    dataGenerator    = () => {
        const keys  = Object.keys(valueGenerators);
        const key   = keys[randomInt(0, keys.length - 1)];
        const value = valueGenerators[key]();
        return {key, value};
    },
    methodComparison = new Runtime(dataGenerator);

for (let name of methodNames) {
    const test = new Test(name, methods[name]);
    methodComparison.register(test);
}

methodComparison.exec(2000, 2000).print();
