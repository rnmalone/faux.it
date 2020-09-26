import {Timeframe} from "../@types/Stats/Timeframe";

export const dataPointsByTimeFrame = {
    [Timeframe.Week]: 7,
    [Timeframe.Month]: 31,
    [Timeframe.Quarter]: 12,
    [Timeframe.Half]: 6,
    [Timeframe.Year]: 12
}

export const dateFormatByTimeFrame = {
    [Timeframe.Week]: 'ddd',
    [Timeframe.Month]: 'ddd',
    [Timeframe.Quarter]: 'ww',
    [Timeframe.Half]: 'MMM',
    [Timeframe.Year]: 'MMM'
}
export const dateIteratorSubtractByTimeFrame = {
    [Timeframe.Week]: 'days',
    [Timeframe.Month]: 'days',
    [Timeframe.Quarter]: 'weeks',
    [Timeframe.Half]: 'months',
    [Timeframe.Year]: 'months'
}
