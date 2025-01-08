const
    assert = require('@fua/core.assert'),
    Test   = require('./Test.js');

/**
 * @template T
 * @extends {Test<T>}
 */
class AsyncTest extends Test {

    /**
     * @param {Array<T>} dataArr
     * @returns {Promise<this>}
     */
    async exec(dataArr) {
        assert.array(dataArr, null, 1);
        for (let data of dataArr) {
            this._timer.start();
            await this._func.call(null, data);
            this._timer.stop();
            this._runs++;
        }
        return this;
    }

}

module.exports = AsyncTest;
