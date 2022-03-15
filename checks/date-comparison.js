const
    dateComparison        = require('../code/date-comparison.js'),
    randomDate            = () => new Date(Math.floor(Math.random() * 3155756400000)),
    randomValueGenerators = {
        Year:        () => (1970 + Math.floor(Math.random() * 100)).toString(),
        YearWeekISO: () => (1 + Math.floor(Math.random() * 52)).toString(),
        YearMonth:   () => (1 + Math.floor(Math.random() * 12)).toString(),
        YearQuarter: () => (1 + Math.floor(Math.random() * 4)).toString(),
        YearHalf:    () => (1 + Math.floor(Math.random() * 2)).toString()
    },
    dataGenerators        = {
        Year:        () => ({date: randomDate(), type: 'Year', value: randomValueGenerators.Year()}),
        YearWeekISO: () => ({date: randomDate(), type: 'YearWeekISO', value: randomValueGenerators.YearWeekISO()}),
        YearMonth:   () => ({date: randomDate(), type: 'YearMonth', value: randomValueGenerators.YearMonth()}),
        YearQuarter: () => ({date: randomDate(), type: 'YearQuarter', value: randomValueGenerators.YearQuarter()}),
        YearHalf:    () => ({date: randomDate(), type: 'YearHalf', value: randomValueGenerators.YearHalf()})
    },
    comparisonTypes       = Object.keys(dataGenerators);

for (let type of comparisonTypes) {
    console.log(`${type}:`);
    let allCheck = true;
    for (let index = 0; index < 1e6; index++) {
        const
            data             = dataGenerators[type](),
            precachedResult  = dateComparison.precachedComparison(data),
            calculatedResult = dateComparison.calculatedComparison(data);
        if (precachedResult !== calculatedResult) {
            allCheck = false;
            console.log(`- different results for ${JSON.stringify(data)}`);
        }
    }
    if (allCheck) {
        console.log(`- all check`);
    }
}
