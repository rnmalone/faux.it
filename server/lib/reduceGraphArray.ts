import moment from 'moment';
import {Timeframe} from "../@types/Stats/Timeframe";
import {
    dataPointsByTimeFrame,
    dateFormatByTimeFrame,
    dateIteratorSubtractByTimeFrame
} from "../config/timeframe.config";

export default function reduceGraphArray<T extends { date: string }>(timeframe: Timeframe, rawData: T[], mergeOnKeys: string[]) {

    const boilerplate = Array(dataPointsByTimeFrame[timeframe])
        .fill(null)
        .map((_: null, i: number) => ({
            // @ts-ignore
            date: moment()
                .subtract(i, dateIteratorSubtractByTimeFrame[timeframe])
                .format(dateFormatByTimeFrame[timeframe])
        }))


    return boilerplate.map((item) => ({
        ...item,
        ...mergeOnKeys.reduce((a, key) => ({
            ...a,
            // @ts-ignore
            [key]: rawData.reduce((b, point) => moment(point.date).format(dateFormatByTimeFrame[timeframe]) === item.date ? b + point[key] : b, 0)
        }), Object.create(null))
    }))
}