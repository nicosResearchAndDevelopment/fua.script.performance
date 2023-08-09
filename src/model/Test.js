const
    assert = require('@nrd/fua.core.assert'),
    util   = require('../util.js'),
    Timer  = require('./Timer.js');

/**
 * @template T
 */
class Test {

    /**
     * @param {string} name
     * @param {function(value: T): any} func
     */
    constructor(name, func) {
        assert.string(name, null, 1);
        assert.function(func);
        Object.defineProperties(this, {
            _name:  {value: name, enumerable: false, configurable: false, writable: false},
            _func:  {value: func, enumerable: false, configurable: false, writable: false},
            _runs:  {value: 0, enumerable: false, configurable: false, writable: true},
            _timer: {value: new Timer(), enumerable: false, configurable: false, writable: false}
        });
    }

    reset() {
        this._runs = 0;
        this._timer.reset();
        return this;
    }

    /**
     * @param {Array<T>} dataArr
     * @returns {this}
     */
    exec(dataArr) {
        assert.array(dataArr, null, 1);
        for (let data of dataArr) {
            this._timer.start();
            this._func.call(null, data);
            this._timer.stop();
            this._runs++;
        }
        return this;
    }

    /**
     * @returns {number}
     */
    get time() {
        return this._timer.sec;
    }

    /**
     * @returns {number}
     */
    get runs() {
        return this._runs;
    }

    /**
     * @param {string} [locale='en']
     * @returns {{test: string, runs: string, time: string, average: string}}
     */
    result(locale = 'en') {
        assert.string(locale);
        return {
            test:    this._name,
            runs:    this._runs.toLocaleString(locale),
            time:    util.prettyFormatNumber(this._timer.sec, 3, 's', 0, locale),
            average: util.prettyFormatNumber(this._runs > 0 ? this._timer.sec / this._runs : 0, 3, 's', 0, locale)
        };
    }

}

module.exports = Test;
