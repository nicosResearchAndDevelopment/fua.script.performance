const
    classProperties  = require('../code/class-properties.js'),
    methods          = Object.keys(classProperties),
    {Test, Runtime}  = require('../src/index.js'),
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

for (let name of methods) {
    const test = new Test(name, classProperties[name]);
    methodComparison.register(test);
}

methodComparison.exec(2000, 2000).print();
