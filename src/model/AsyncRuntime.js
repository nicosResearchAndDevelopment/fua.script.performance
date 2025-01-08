const
    assert    = require('@fua/core.assert'),
    AsyncTest = require('./AsyncTest.js'),
    Runtime   = require('./Runtime.js');

/**
 * @template T
 * @extends {Runtime<T>}
 */
class AsyncRuntime extends Runtime {

    /**
     * @param {AsyncTest<T>} test
     * @returns {this}
     */
    register(test) {
        assert.instance(test, AsyncTest);
        this._tests.push(test);
        return this;
    }

    /**
     * @param {number} [repetitions=1]
     * @param {number} [length=1]
     * @returns {Promise<this>}
     */
    async exec(repetitions = 1, length = 1) {
        assert.number.integer(repetitions, 1);
        assert.number.integer(length, 1);
        const dataArr = await Promise.all(Array.from({length}, this._generator));
        this._progress.start(repetitions * this._tests.length, 0);
        for (let k = 0; k < repetitions; k++) {
            const testArr = this._tests.map(val => val).sort(() => Math.random() - .5);
            for (let test of testArr) {
                await test.exec(dataArr);
                this._progress.increment();
            }
        }
        this._progress.stop();
        return this;
    }

}

module.exports = AsyncRuntime;
