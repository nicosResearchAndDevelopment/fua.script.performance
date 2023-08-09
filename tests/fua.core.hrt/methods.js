const
    methods = exports,
    hrt     = require('@nrd/fua.core.hrt'),
    ts      = require('@nrd/fua.core.ts');

methods['static'] = function () {
    return 1337;
};

methods['Date.now'] = function () {
    return Date.now();
};

methods['process.hrtime'] = function () {
    const [sec, nsec] = process.hrtime();
    return sec / 1000 + nsec / 1000000;
};

methods['fua.core.hrt'] = function () {
    return hrt();
};

methods['fua.core.ts'] = function () {
    return ts();
};

methods['fua.core.ts.unix'] = function () {
    return ts.unix();
};
