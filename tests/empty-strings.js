const
    emptyStrings     = require('../code/empty-strings.js'),
    methods          = Object.keys(emptyStrings),
    {Test, Runtime}  = require('../src/index.js'),
    dataGenerator    = () => 50 + Math.floor(150 * Math.random()),
    methodComparison = new Runtime(dataGenerator);

for (let name of methods) {
    const test = new Test(name, emptyStrings[name]);
    methodComparison.register(test);
}

methodComparison.exec(1000, 1000).print();
