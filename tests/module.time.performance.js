const
    path              = require('path'),
    util              = require('@nrd/fua.core.util'),
    {Test, Runtime}   = require('../src/index.js'),
    time              = require(path.join(util.FUA_JS_LIB, 'module.time/src/module.time.js')),
    timeline          = require(path.join(util.FUA_JS_LIB, 'module.time/src/module.time.Year.js')),
    timeline_devl     = require(path.join(util.FUA_JS_LIB, 'module.time/src/module.time.timeline.DEVL.js')),
    dataGenerators    = {
        Year:  () => [
            1970 + Math.floor(Math.random() * 100)
        ],
        Month: () => [
            ...dataGenerators.Year(),
            Math.floor(Math.random() * 12)
        ],
        Day:   () => [
            ...dataGenerators.Month(),
            Math.floor(Math.random() * 28)
        ]
    },
    methodComparisons = {
        Year:  new Runtime(dataGenerators.Year),
        Month: new Runtime(dataGenerators.Month),
        Day:   new Runtime(dataGenerators.Day)
    };

methodComparisons.Year.register(new Test('timeline.Year', (args) => {
    return new timeline.Year(args[0]);
}));

methodComparisons.Month.register(new Test('timeline.Month', (args) => {
    const year = new timeline.Year(args[0]);
    return year.month(args[1]);
}));

methodComparisons.Day.register(new Test('timeline.Day', (args) => {
    const year  = new timeline.Year(args[0]);
    const month = year.month(args[1]);
    return month.day(args[2]);
}));

methodComparisons.Year.register(new Test('timeline_devl.Year', (args) => {
    return new timeline_devl.Year(args[0]);
}));

methodComparisons.Month.register(new Test('timeline_devl.Month', (args) => {
    const year = new timeline_devl.Year(args[0]);
    return year.month(args[1]);
}));

methodComparisons.Month.register(new Test('timeline_devl.Month_direct', (args) => {
    return new timeline_devl.Month(args[0], args[1]);
}));

methodComparisons.Day.register(new Test('timeline_devl.Day', (args) => {
    const year  = new timeline_devl.Year(args[0]);
    const month = year.month(args[1]);
    return month.day(args[2]);
}));

methodComparisons.Day.register(new Test('timeline_devl.Day_direct', (args) => {
    return new timeline_devl.Day(args[0], args[1], args[2]);
}));

methodComparisons.Year.exec(5000, 2000).print();
methodComparisons.Month.exec(5000, 2000).print();
methodComparisons.Day.exec(5000, 2000).print();
