const
    branchlessProgramming = require('../code/branchless-programming.js'),
    methods               = Object.keys(branchlessProgramming),
    {Test, Runtime}       = require('../src/index.js'),
    dataGenerator         = () => 1000,
    hashingPerformance    = new Runtime(dataGenerator);

for (let name of methods) {
    const test = new Test(name, branchlessProgramming[name]);
    hashingPerformance.register(test);
}

hashingPerformance.exec(1000, 1000).print();
