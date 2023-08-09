exports.buildInDateToISOString = function (date) {
    return date.toISOString();
} // buildInDateToISOString

exports.customDateToISOString = function (date) {
    return date.getUTCFullYear().toString() + '-' +
        (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' +
        date.getUTCDate().toString().padStart(2, '0') + 'T' +
        date.getUTCHours().toString().padStart(2, '0') + ':' +
        date.getUTCMinutes().toString().padStart(2, '0') + ':' +
        date.getUTCSeconds().toString().padStart(2, '0') + '.' +
        date.getUTCMilliseconds().toString().padStart(3, '0') + 'Z';
} // customDateToISOString

exports.customDateToISOStringTemplate = function (date) {
    return `${
        date.getUTCFullYear().toString()
    }-${
        (date.getUTCMonth() + 1).toString().padStart(2, '0')
    }-${
        date.getUTCDate().toString().padStart(2, '0')
    }T${
        date.getUTCHours().toString().padStart(2, '0')
    }:${
        date.getUTCMinutes().toString().padStart(2, '0')
    }:${
        date.getUTCSeconds().toString().padStart(2, '0')
    }.${
        date.getUTCMilliseconds().toString().padStart(3, '0')
    }Z`;
} // customDateToISOStringTemplate
