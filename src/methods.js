exports.prettyFormatNumber = function (value, precision = 3, unit = '', shift = 0, locale = 'en') {
    const
        decimal_value     = Number(value),
        log_magnitude     = Math.log10(decimal_value),
        magnitude_integer = Math.floor(log_magnitude),
        magnitude_rest    = (10 ** (log_magnitude - magnitude_integer) - 1) / 9,
        magnitude         = magnitude_integer + magnitude_rest,
        decimal_precision = 10 ** (magnitude_integer - precision),
        rounded_value     = Math.round(decimal_value / decimal_precision) * decimal_precision,
        unit_list         = ['p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T'],
        unit_factor       = 3 * Math.floor(Math.max(-4, Math.min(4, (magnitude - shift) / 3))),
        unit_prefix       = unit_list[4 + unit_factor / 3],
        value_prefix      = (Math.abs(decimal_value - rounded_value) <= Number.EPSILON ? '' : '~ '),
        value_suffix      = (unit_prefix || unit ? ' ' + unit_prefix + unit : ''),
        value_formatted   = (rounded_value / 10 ** unit_factor)
            .toLocaleString(locale, {maximumSignificantDigits: precision + 1});

    return value_prefix + value_formatted + value_suffix;

};
