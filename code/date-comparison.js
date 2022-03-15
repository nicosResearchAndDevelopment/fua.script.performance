const DEPTH = Object.freeze({
    NONE:        0,
    YEARS:       1,
    HALVES:      2,
    QUARTERS:    3,
    MONTHS:      4,
    WEEKS:       5,
    DAYS:        6,
    HOURS:       7,
    MINUTES:     8,
    SECONDS:     9,
    MILLISECOND: 10
});

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
            } // if (depth >= DEPTH.MONTHS)
            if (depth >= DEPTH.WEEKS) {
                const
                    beginningDay    = (year.beginning.getDay() + 6) % 7,
                    endDay          = (year.end.getDay() + 5) % 7,
                    beginningOffset = beginningDay <= 3 ? -beginningDay : 7 - beginningDay,
                    endOffset       = endDay >= 3 ? 6 - endDay : -1 - endDay,
                    yearWeekDays    = (year.end - year.beginning) / 86400000 + endOffset - beginningOffset,
                    weeks           = year.weeks = new Array(yearWeekDays / 7);
                for (let currWeek = 0; currWeek < weeks.length; currWeek++) {
                    const week     = weeks[currWeek] = Object.create(null);
                    week.beginning = new Date(currYear, 0, 1 + beginningOffset + 7 * currWeek);
                    week.end       = new Date(currYear, 0, 1 + beginningOffset + 7 * (currWeek + 1));
                }
            } // if (depth >= DEPTH.WEEKS)
            if (depth >= DEPTH.QUARTERS) {
                const quarters = year.quarters = new Array(4);
                for (let currQuarter = 0; currQuarter < quarters.length; currQuarter++) {
                    const quarter     = quarters[currQuarter] = Object.create(null);
                    quarter.quarter   = currQuarter;
                    quarter.beginning = new Date(currYear, 3 * currQuarter, 1);
                    quarter.end       = new Date(currYear, 3 * (currQuarter + 1), 1);
                    if (depth >= DEPTH.MONTHS) quarter.months = year.months.slice(3 * currQuarter, 3 * (currQuarter + 1));
                }
            } // if (depth >= DEPTH.QUARTERS)
            if (depth >= DEPTH.HALVES) {
                const halves = year.halves = new Array(2);
                for (let currHalf = 0; currHalf < halves.length; currHalf++) {
                    const half     = halves[currHalf] = Object.create(null);
                    half.half      = currHalf;
                    half.beginning = new Date(currYear, 6 * currHalf, 1);
                    half.end       = new Date(currYear, 6 * (currHalf + 1), 1);
                    if (depth >= DEPTH.MONTHS) half.months = year.months.slice(6 * currHalf, 6 * (currHalf + 1));
                    if (depth >= DEPTH.QUARTERS) half.quarters = year.quarters.slice(2 * currHalf, 2 * (currHalf + 1));
                }
            } // if (depth >= DEPTH.HALVES)
        }
    } // if (depth >= DEPTH.YEARS)
    return timeline;
} // createTimeline

console.time('createTimeline');
// const timeline = createTimeline(1970, 2069, DEPTH.DAYS);
const timeline = createTimeline(1969, 2070, DEPTH.DAYS);
console.timeEnd('createTimeline');
// console.log(timeline);
// debugger;

const precachedTypes = {
    Year(date, value) {
        const
            compare_year = timeline.years[parseInt(value)];
        return date >= compare_year.beginning && date <= compare_year.end;
    },
    YearWeekISO(date, value) {
        const
            compare_week_index = parseInt(value) - 1,
            compare_year_index = date.getFullYear(),
            compare_year       = timeline.years[compare_year_index];

        // NOTE year start or year end might not match the right year for the calendar week

        if (compare_week_index === 0) {
            const
                compare_next_year = timeline.years[compare_year_index + 1],
                compare_week      = compare_next_year.weeks[compare_week_index];
            if (date >= compare_week.beginning && date <= compare_week.end)
                return true;
        }

        if (compare_week_index === compare_year.weeks.length - 1) {
            const
                compare_prev_year = timeline.years[compare_year_index - 1],
                compare_week      = compare_prev_year.weeks[compare_week_index];
            if (compare_prev_year.weeks.length > compare_week_index && date >= compare_week.beginning && date <= compare_week.end)
                return true;
        }

        if (compare_year.weeks.length <= compare_week_index) return false;
        const compare_week = compare_year.weeks[compare_week_index];
        return date >= compare_week.beginning && date <= compare_week.end;
    },
    YearMonth(date, value) {
        const
            compare_year  = timeline.years[date.getFullYear()],
            compare_month = compare_year.months[parseInt(value) - 1];
        return date >= compare_month.beginning && date <= compare_month.end;
    },
    YearQuarter(date, value) {
        const
            compare_year    = timeline.years[date.getFullYear()],
            compare_quarter = compare_year.quarters[parseInt(value) - 1];
        return date >= compare_quarter.beginning && date <= compare_quarter.end;
    },
    YearHalf(date, value) {
        const
            compare_year = timeline.years[date.getFullYear()],
            compare_half = compare_year.halves[parseInt(value) - 1];
        return date >= compare_half.beginning && date <= compare_half.end;
    }
}; // precachedTypes

exports.precachedComparison = function ({date, type, value}) {
    if (!(type in precachedTypes)) throw new Error('unknown type');
    return precachedTypes[type](date, value);
} // precachedComparison

const calculatedTypes = {
    Year(date, value) {
        const
            date_year    = date.getFullYear(),
            compare_year = parseInt(value);
        return date_year === compare_year;
    },
    /**
     * For a given date, get the ISO week number
     *
     * Based on information at:
     *
     *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
     *
     * Algorithm is to find nearest thursday, it's year
     * is the year of the week number. Then get weeks
     * between that date and the first day of that year.
     *
     * Note that dates in one year can be weeks of previous
     * or next year, overlap is up to 3 days.
     *
     * e.g. 2014/12/29 is Monday in week  1 of 2015
     *      2012/1/1   is Sunday in week 52 of 2011
     *
     * @see https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php#answers
     */
    YearWeekISO(date, value) {
        // Copy date so don't modify original
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        const weekNo    = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return whether weekNo matches the expected value.
        return weekNo === parseInt(value);
    },
    YearMonth(date, value) {
        const
            date_month    = date.getMonth() + 1,
            compare_month = parseInt(value);
        return date_month === compare_month;
    },
    YearQuarter(date, value) {
        const
            date_month        = date.getMonth() + 1,
            compare_quarter   = parseInt(value),
            compare_month_min = 3 * (compare_quarter - 1) + 1,
            compare_month_max = compare_month_min + 2;
        return date_month >= compare_month_min && date_month <= compare_month_max;
    },
    YearHalf(date, value) {
        const
            date_month        = date.getMonth() + 1,
            compare_half      = parseInt(value),
            compare_month_min = 6 * (compare_half - 1) + 1,
            compare_month_max = compare_month_min + 5;
        return date_month >= compare_month_min && date_month <= compare_month_max;
    }
}; // calculatedTypes

exports.calculatedComparison = function ({date, type, value}) {
    if (!(type in calculatedTypes)) throw new Error('unknown type');
    return calculatedTypes[type](date, value);
} // calculatedComparison
