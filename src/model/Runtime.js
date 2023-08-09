const
    assert      = require('@nrd/fua.core.assert'),
    cliProgress = require('cli-progress'),
    Test        = require('./Test.js');

/**
 * @template T
 */
class Runtime {

    /**
     * @param {function(value: undefined, index: number): T} generator
     */
    constructor(generator) {
        assert.function(generator);
        const progress = new cliProgress.SingleBar({
            stream:          process.stdout,
            clearOnComplete: true,
            etaBuffer:       100
        }, cliProgress.Presets.rect);
        Object.defineProperties(this, {
            _tests:     {value: [], enumerable: false, configurable: false, writable: false},
            _generator: {value: generator, enumerable: false, configurable: false, writable: false},
            _progress:  {value: progress, enumerable: false, configurable: false, writable: false}
        });
    }

    reset() {
        for (let test of this._tests) {
            test.reset();
        }
        return this;
    }

    /**
     * @param {Test<T>} test
     * @returns {this}
     */
    register(test) {
        assert.instance(test, Test);
        this._tests.push(test);
        return this;
    }

    /**
     * @param {number} [repetitions=1]
     * @param {number} [length=1]
     * @returns {this}
     */
    exec(repetitions = 1, length = 1) {
        assert.number.integer(repetitions, 1);
        assert.number.integer(length, 1);
        const dataArr = Array.from({length}, this._generator);
        this._progress.start(repetitions * this._tests.length, 0);
        for (let k = 0; k < repetitions; k++) {
            const testArr = this._tests.map(val => val).sort(() => Math.random() - .5);
            for (let test of testArr) {
                test.exec(dataArr);
                this._progress.increment();
            }
        }
        this._progress.stop();
        return this;
    }

    /**
     * @param {string} [locale='en']
     * @returns {void}
     */
    print(locale = 'en') {
        assert.string(locale);
        const testArr = this._tests.map(val => val).sort((a, b) => a.time - b.time);
        console.table(testArr.map(test => test.result(locale)));
    }

}

module.exports = Runtime;
