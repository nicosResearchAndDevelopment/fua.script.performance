exports.branched = function (max) {
    let tmp = true;
    for (let i = 0; i < max; i++) {
        if (tmp) tmp = false;
        else tmp = true;
    }
};

exports.branched_specific = function (max) {
    let tmp = true;
    for (let i = 0; i < max; i++) {
        if (tmp === true) tmp = false;
        else tmp = true;
    }
};

exports.conditional_operator = function (max) {
    let tmp = true;
    for (let i = 0; i < max; i++) {
        tmp = tmp ? false : true;
    }
};

exports.branchless = function (max) {
    let tmp = true;
    for (let i = 0; i < max; i++) {
        tmp = !tmp;
    }
};
