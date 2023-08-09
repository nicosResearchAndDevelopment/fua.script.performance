const
    cliProgress = require('cli-progress');

class Runtime {

    constructor(generator) {
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

    register(test) {
        this._tests.push(test);
    }

    async exec(repetitions = 1, length = 1) {
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

    print() {
        const testArr = this._tests.map(val => val).sort((a, b) => a.time - b.time);
        console.table(testArr.map(test => test.result()));
    }

}

module.exports = Runtime;
