import moment from "moment";
import {dataPointsByTimeFrame, dateIteratorSubtractByTimeFrame} from "../config/timeframe.config";

interface ITimeframeDates {
    dateFrom: string;
    dateTo: string;
    doubleTimeRangeMoment: string;
}

export default function createDatesFromTimeframe(timeframe: number): ITimeframeDates {
    const dateTo = moment().toISOString()
    // @ts-ignore
    const dateFrom = moment().subtract(dataPointsByTimeFrame[timeframe], dateIteratorSubtractByTimeFrame[timeframe]).toISOString()
    const dayRange = moment(dateTo).diff(moment(dateFrom), 'days')
    const doubleTimeRangeMoment = moment(dateFrom).subtract(dayRange, 'days').toISOString()

    return { dateFrom, dateTo, doubleTimeRangeMoment }
}