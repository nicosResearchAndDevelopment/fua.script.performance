const
    dateComparison         = require('../code/date-comparison.js'),
    methods                = Object.keys(dateComparison),
    {Test, Runtime}        = require('../src/index.js'),
    randomDate             = () => new Date(Math.floor(Math.random() * 3155756400000)),
    randomValueGenerators  = {
        Year:        () => (1970 + Math.floor(Math.random() * 100)).toString(),
        YearWeekISO: () => (1 + Math.floor(Math.random() * 52)).toString(),
        YearMonth:   () => (1 + Math.floor(Math.random() * 12)).toString(),
        YearQuarter: () => (1 + Math.floor(Math.random() * 4)).toString(),
        YearHalf:    () => (1 + Math.floor(Math.random() * 2)).toString()
    },
    dataGenerators         = {
        Year:        () => ({date: randomDate(), type: 'Year', value: randomValueGenerators.Year()}),
        YearWeekISO: () => ({date: randomDate(), type: 'YearWeekISO', value: randomValueGenerators.YearWeekISO()}),
        YearMonth:   () => ({date: randomDate(), type: 'YearMonth', value: randomValueGenerators.YearMonth()}),
        YearQuarter: () => ({date: randomDate(), type: 'YearQuarter', value: randomValueGenerators.YearQuarter()}),
        YearHalf:    () => ({date: randomDate(), type: 'YearHalf', value: randomValueGenerators.YearHalf()})
    },
    methodComparisons      = {
        Year:        new Runtime(dataGenerators.Year),
        YearWeekISO: new Runtime(dataGenerators.YearWeekISO),
        YearMonth:   new Runtime(dataGenerators.YearMonth),
        YearQuarter: new Runtime(dataGenerators.YearQuarter),
        YearHalf:    new Runtime(dataGenerators.YearHalf)
    },
    comparisonTypes        = Object.keys(methodComparisons),
    randomDataGenerator    = () => dataGenerators[comparisonTypes[Math.floor(Math.random() * comparisonTypes.length)]](),
    randomMethodComparison = new Runtime(randomDataGenerator);

for (let name of methods) {
    const test = new Test(name, dateComparison[name]);
    randomMethodComparison.register(test);
    for (let type of comparisonTypes) {
        methodComparisons[type].register(test);
    }
}

console.log('\nRandom:');
randomMethodComparison.exec(5000, 2000).print();

for (let type of comparisonTypes) {
    console.log('\n' + type + ':');
    methodComparisons[type].reset().exec(2000, 1000).print();
}
