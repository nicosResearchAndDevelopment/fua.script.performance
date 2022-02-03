const
    methods = require('./methods.js'),
    Timer   = require('./Timer.js');

class Test {

    constructor(name, func) {
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

    async exec(dataArr) {
        for (let data of dataArr) {
            this._timer.start();
            await this._func.call(null, data);
            this._timer.stop();
            this._runs++;
        }
        return this;
    }

    get time() {
        return this._timer.sec;
    }

    get runs() {
        return this._runs;
    }

    result(locale = 'en') {
        return {
            test:    this._name,
            runs:    this._runs.toLocaleString(locale),
            time:    methods.prettyFormatNumber(this._timer.sec, 3, 's', 0, locale),
            average: methods.prettyFormatNumber(this._runs > 0 ? this._timer.sec / this._runs : 0, 3, 's', 0, locale)
        };
    }

}

module.exports = Test;
