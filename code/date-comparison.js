const DEPTH = Object.freeze({NONE: 0, YEARS: 1, MONTHS: 2, DAYS: 3, HOURS: 4, MINUTES: 5, SECONDS: 6, MILLISECOND: 7});

function createTimeline(minYear = 1970, maxYear = 1970, depth = DEPTH.NONE) {
    const timeline     = Object.create(null);
    timeline.beginning = new Date(minYear, 0);
    timeline.end       = new Date(maxYear + 1, 0);
    if (depth >= DEPTH.YEARS) {
        const years = timeline.years = Object.create(null);
        for (let currYear = minYear; currYear <= maxYear; currYear++) {
            const year     = years[currYear] = Object.create(null);
            year.year      = currYear;
            year.beginning = new Date(currYear, 0);
            year.end       = new Date(currYear + 1, 0);
            if (depth >= DEPTH.MONTHS) {
                const months = year.months = new Array(12);
                for (let currMonth = 0; currMonth < months.length; currMonth++) {
                    const month     = months[currMonth] = Object.create(null);
                    month.month     = currMonth;
                    month.beginning = new Date(currYear, currMonth, 1);
                    month.end       = new Date(currYear, currMonth + 1, 1);
                    if (depth >= DEPTH.DAYS) {
                        const days = month.days = new Array(new Date(currYear, currMonth + 1, 0).getDate());
                        for (let currDay = 0; currDay < days.length; currDay++) {
                            const day     = days[currDay] = Object.create(null);
                            day.day       = currDay;
                            day.beginning = new Date(currYear, currMonth, 1 + currDay);
                            day.end       = new Date(currYear, currMonth, 1 + currDay + 1);
                            if (depth >= DEPTH.HOURS) {
                                const hours = day.hours = new Array(24);
                                for (let currHour = 0; currHour < hours.length; currHour++) {
                                    const hour     = hours[currHour] = Object.create(null);
                                    hour.hour      = currHour;
                                    hour.beginning = new Date(currYear, currMonth, 1 + currDay, currHour);
                                    hour.end       = new Date(currYear, currMonth, 1 + currDay, currHour + 1);
                                    if (depth >= DEPTH.MINUTES) {
                                        const minutes = hour.minutes = new Array(60);
                                        for (let currMinute = 0; currMinute < minutes.length; currMinute++) {
                                            const minute     = minutes[currMinute] = Object.create(null);
                                            minute.minute    = currMinute;
                                            minute.beginning = new Date(currYear, currMonth, 1 + currDay, currHour, currMinute);
                                            minute.end       = new Date(currYear, currMonth, 1 + currDay, currHour, currMinute + 1);
                                            if (depth >= DEPTH.SECONDS) {
                                                const seconds = minute.seconds = new Array(60);
                                                for (let currSecond = 0; currSecond < seconds.length; currSecond++) {
                                                    const second     = seconds[currSecond] = Object.create(null);
                                                    second.second    = currSecond;
                                                    second.beginning = new Date(currYear, currMonth, 1 + currDay, currHour, currMinute, currSecond);
                                                    second.end       = new Date(currYear, currMonth, 1 + currDay, currHour, currMinute, currSecond + 1);
                                                    if (depth >= DEPTH.MILLISECOND) {
                                                        const milliseconds = second.milliseconds = new Array(1000);
                                                        for (let currMillisecond = 0; currMillisecond < milliseconds.length; currMillisecond++) {
                                                            const millisecond       = milliseconds[currMillisecond] = Object.create(null);
                                                            millisecond.millisecond = currMillisecond;
                                                            millisecond.beginning   = new Date(currYear, currMonth, 1 + currDay, currHour, currMinute, currSecond, currMillisecond);
                                                            millisecond.end         = new Date(currYear, currMonth, 1 + currDay, currHour, currMinute, currSecond, currMillisecond + 1);
                                                            debugger;
                                                        }
                                                    } // if (depth >= DEPTH.MILLISECOND)
                                                }
                                            } // if (depth >= DEPTH.SECONDS)
                                        }
                                    } // if (depth >= DEPTH.MINUTES)
                                }
                            } // if (depth >= DEPTH.HOURS)
                        }
                    } // if (depth >= DEPTH.DAYS)
                }
                const quarters = year.quarters = new Array(4);
                for (let currQuarter = 0; currQuarter < quarters.length; currQuarter++) {
                    const quarter     = quarters[currQuarter] = Object.create(null);
                    quarter.quarter   = currQuarter;
                    quarter.beginning = new Date(currYear, 3 * currQuarter, 1);
                    quarter.end       = new Date(currYear, 3 * (currQuarter + 1), 1);
                    quarter.months    = months.slice(3 * currQuarter, 3 * (currQuarter + 1));
                }
                const halves = year.halves = new Array(2);
                for (let currHalf = 0; currHalf < halves.length; currHalf++) {
                    const half     = halves[currHalf] = Object.create(null);
                    half.half      = currHalf;
                    half.beginning = new Date(currYear, 6 * currHalf, 1);
                    half.end       = new Date(currYear, 6 * (currHalf + 1), 1);
                    half.months    = months.slice(6 * currHalf, 6 * (currHalf + 1));
                    half.quarters  = quarters.slice(2 * currHalf, 2 * (currHalf + 1));
                }
            } // if (depth >= DEPTH.MONTHS)
        }
    } // if (depth >= DEPTH.YEARS)
    return timeline;
} // createTimeline

console.time('createTimeline');
const timeline = createTimeline(1970, 2069, DEPTH.DAYS);
console.timeEnd('createTimeline');
// console.log(timeline);
// debugger;

exports.precachedComparison = function ({date, type, value}) {
    if (type === 'Year') {
        const
            compare_year = timeline.years[parseInt(value)];
        return date >= compare_year.beginning && date <= compare_year.end;
    } else if (type === 'YearWeekISO') {
        // TODO
    } else if (type === 'YearMonth') {
        const
            compare_year  = timeline.years[date.getFullYear()],
            compare_month = compare_year.months[parseInt(value) - 1];
        return date >= compare_month.beginning && date <= compare_month.end;
    } else if (type === 'YearQuarter') {
        const
            compare_year    = timeline.years[date.getFullYear()],
            compare_quarter = compare_year.quarters[parseInt(value) - 1];
        return date >= compare_quarter.beginning && date <= compare_quarter.end;
    } else if (type === 'YearHalf') {
        const
            compare_year = timeline.years[date.getFullYear()],
            compare_half = compare_year.halves[parseInt(value) - 1];
        return date >= compare_half.beginning && date <= compare_half.end;
    } else {
        throw new Error('unknown type');
    }
} // precachedComparison

exports.calculatedComparison = function ({date, type, value}) {
    if (type === 'Year') {
        const
            date_year    = date.getFullYear(),
            compare_year = parseInt(value);
        return date_year === compare_year;
    } else if (type === 'YearWeekISO') {
        const
            date_month   = date.getMonth() + 1,
            date_day     = date.getDate(),
            compare_week = parseInt(value);
        // TODO
    } else if (type === 'YearMonth') {
        const
            date_month    = date.getMonth() + 1,
            compare_month = parseInt(value);
        return date_month === compare_month;
    } else if (type === 'YearQuarter') {
        const
            date_month        = date.getMonth() + 1,
            compare_quarter   = parseInt(value),
            compare_month_min = 3 * (compare_quarter - 1) + 1,
            compare_month_max = compare_month_min + 2;
        return date_month >= compare_month_min && date_month <= compare_month_max;
    } else if (type === 'YearHalf') {
        const
            date_month        = date.getMonth() + 1,
            compare_half      = parseInt(value),
            compare_month_min = 6 * (compare_half - 1) + 1,
            compare_month_max = compare_month_min + 5;
        return date_month >= compare_month_min && date_month <= compare_month_max;
    } else {
        throw new Error('unknown type');
    }
} // calculatedComparison
