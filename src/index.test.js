const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {methods, Timer} = require('./index.js');

describe('methods', function () {

    test('prettyFormatNumber', function () {

        const {prettyFormatNumber} = methods;
        console.log(prettyFormatNumber(123456.789));
        console.log(prettyFormatNumber(123.456789));
        console.log(prettyFormatNumber(0.123456789));
    });

});

test('Timer', async function () {

    const timer = new Timer();
    timer.start();
    await new Promise(resolve => setTimeout(resolve, 123));
    timer.stop();
    console.log(timer.toString());

});
