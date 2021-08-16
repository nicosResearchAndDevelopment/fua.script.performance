// TODO: test and evaluate this prettifyNumber method -> maybe place it at a different location
function prettifyNumber(value) {
    const
        decimal_value     = Number(value),
        log_magnitude     = Math.log10(decimal_value),
        magnitude_integer = Math.floor(log_magnitude),
        // magnitude_rest    = (10 ** (log_magnitude - magnitude_integer) - 1) / 9,
        // magnitude         = magnitude_integer + magnitude_rest,
        precision         = 10 ** (magnitude_integer - 4),
        rounded_value     = Math.round(decimal_value / precision) * precision,
        metric_factor     = 3 * Math.floor(magnitude_integer / 3 + 1),
        metric_prefix     = ['f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P'][5 + metric_factor / 3] || '';

    return (decimal_value === rounded_value ? '' : '~ ') + rounded_value.toLocaleString() + ' ' + metric_prefix;
}

class Timer {

    constructor() {
        Object.defineProperties(this, {
            // _time: {value: 0, enumerable: false, configurable: false, writable: true},
            // _ts:   {value: null, enumerable: false, configurable: false, writable: true}
            _time: {value: 0n, enumerable: false, configurable: false, writable: true},
            _ts:   {value: 0n, enumerable: false, configurable: false, writable: true}
        });
    }

    reset() {
        // this._time = 0;
        // this._ts   = null;
        this._time = 0n;
        this._ts   = 0n;
        return this;
    }

    start() {
        // this._ts = process.hrtime();
        this._ts = process.hrtime.bigint();
        return this;
    }

    stop() {
        // const [sec, nsec] = process.hrtime(this._ts);
        // this._time += 1e3 * sec + 1e-6 * nsec;
        this._time += process.hrtime.bigint() - this._ts;
        return this;
    }

    get sec() {
        return 1e-9 * Number(this._time);
    }

    get msec() {
        return 1e-6 * Number(this._time);
    }

    get nsec() {
        return Number(this._time);
    }

    get time() {
        return prettifyNumber(this.sec) + 's';

        // const
        //     nanoseconds           = Number(this._time),
        //     log10_magnitude       = Math.log10(nanoseconds),
        //     decimal_magnitude     = Math.floor(log10_magnitude),
        //     log10_rest            = log10_magnitude - decimal_magnitude,
        //     rest_magnitude        = 10 ** log10_rest,
        //     scaled_rest_magnitude = (rest_magnitude - 1) / 9,
        //     magnitude             = decimal_magnitude + scaled_rest_magnitude,
        //     precision             = 10 ** Math.max(0, decimal_magnitude - 3),
        //     rounded_nanoseconds   = Math.round(nanoseconds / precision) * precision,
        //     unit_scale            = 0;
        //
        // if (magnitude > 9) return (1e-9 * rounded_nanoseconds).toLocaleString() + ' s';
        // else if (magnitude > 6) return (1e-6 * rounded_nanoseconds).toLocaleString() + ' ms';
        // else return (1e-6 * rounded_nanoseconds).toLocaleString() + ' ns';
    }

}

module.exports = Timer;

// const timer = new Timer();
//
// timer.start();
// // timer.stop();
// // console.log(timer.time);
// setTimeout(() => {
//     timer.stop();
//     console.log(timer.time);
// }, 100);
