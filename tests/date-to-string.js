const
    dateToString     = require('../code/date-to-string.js'),
    methods          = Object.keys(dateToString),
    {Test, Runtime}  = require('../src/index.js'),
    dataGenerator    = () => new Date(Math.floor(2e12 * Math.random())),
    methodComparison = new Runtime(dataGenerator);

for (let name of methods) {
    const test = new Test(name, dateToString[name]);
    methodComparison.register(test);
}

methodComparison.exec(5000, 2000).print();
