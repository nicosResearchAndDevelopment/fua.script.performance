const
    assert      = require('@nrd/fua.core.assert'),
    cliProgress = require('cli-progress'),
    Test        = require('./Test.js'),
    SGR         = (value) => `\x1b[${value}m`,
    _barChars   = ['\u2800', '\u2840', '\u2844', '\u2846', '\u2847', '\u28c7', '\u28e7', '\u28f7', '\u28ff'];

/**
 * @template T
 */
class Runtime {

    /**
     * @param {function(value: undefined, index: number): T} [generator]
     */
    constructor(generator = () => null) {
        assert.function(generator);
        const progress = new cliProgress.SingleBar({
            stream:     process.stdout,
            fps:        30,
            etaBuffer:  300,
            barsize:    60,
            hideCursor: true,
            linewrap:   true,
            format:     [
                            `progress: [${SGR(1)}${SGR(32)}{bar}${SGR(39)}${SGR(22)}] ${SGR(1)}{percentage}%${SGR(22)}`,
                            // `time: ${SGR(1)}{duration}s${SGR(22)} + ${SGR(1)}{eta}s${SGR(22)}`
                            `time: ${SGR(1)}{duration}s${SGR(22)}`,
                            `eta: ${SGR(1)}{eta}s${SGR(22)}`
                            // `tests: ${SGR(1)}{value}${SGR(22)}/${SGR(1)}{total}${SGR(22)}`
                        ].join(' | '),
            formatBar(progress, options) {
                const base    = _barChars.length - 1;
                const total   = base * options.barsize;
                const current = Math.round(progress * total);
                if (current === total) return ''.padStart(options.barsize, _barChars.at(-1));
                const filled = Math.floor(current / base);
                const rest   = current % base;
                return _barChars[rest].padStart(filled + 1, _barChars.at(-1)).padEnd(options.barsize, _barChars.at(0));
            }
        });
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
