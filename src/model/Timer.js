const
    assert = require('@fua/core.assert'),
    util   = require('../util.js');

class Timer {

    constructor() {
        Object.defineProperties(this, {
            // the currently measured time in nanoseconds
            _time: {value: 0, enumerable: false, configurable: false, writable: true},
            // the last timestamp as [seconds, nanoseconds] tupel
            _ts: {value: null, enumerable: false, configurable: false, writable: true}
        });
    }

    reset() {
        this._time = 0;
        this._ts   = null;
        return this;
    }

    start() {
        this._ts = this._ts || process.hrtime();
        return this;
    }

    stop() {
        const [sec, nsec] = process.hrtime(this._ts);
        this._time += 1e9 * sec + nsec;
        this._ts          = null;
        return this;
    }

    /**
     * @returns {number}
     */
    get sec() {
        return 1e-9 * this._time;
    }

    /**
     * @returns {number}
     */
    get msec() {
        return 1e-6 * this._time;
    }

    /**
     * @returns {number}
     */
    get nsec() {
        return this._time;
    }

    /**
     * @param {string} [locale='en']
     * @returns {string}
     */
    toString(locale = 'en') {
        assert.string(locale);
        return util.prettyFormatNumber(this.sec, 4, 's', .5, locale);
    }

}

module.exports = Timer;
