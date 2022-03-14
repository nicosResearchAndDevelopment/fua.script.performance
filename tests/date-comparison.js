const
    dateComparison   = require('../code/date-comparison.js'),
    methods          = Object.keys(dateComparison),
    {Test, Runtime}  = require('../src/index.js'),
    comparisonTypes  = [
        'Year',
        // 'YearWeekISO',
        'YearMonth',
        'YearQuarter',
        'YearHalf'
    ],
    dataGenerator    = () => {
        let
            date  = new Date(Math.floor(Math.random() * 3155756400000)),
            type  = comparisonTypes[Math.floor(Math.random() * comparisonTypes.length)],
            value = '';
        switch (type) {
            case 'Year':
                value = (1970 + Math.floor(Math.random() * 100)).toString();
                break;
            case 'YearWeekISO':
                value = (1 + Math.floor(Math.random() * 52)).toString();
                break;
            case 'YearMonth':
                value = (1 + Math.floor(Math.random() * 12)).toString();
                break;
            case 'YearQuarter':
                value = (1 + Math.floor(Math.random() * 4)).toString();
                break;
            case 'YearHalf':
                value = (1 + Math.floor(Math.random() * 2)).toString();
                break;
        }
        return {date, type, value};
    },
    methodComparison = new Runtime(dataGenerator);

for (let name of methods) {
    const test = new Test(name, dateComparison[name]);
    methodComparison.register(test);
}

methodComparison.exec(5000, 2000).print();
