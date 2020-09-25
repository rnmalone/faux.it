import moment from 'moment';

function getGraphXAxisKeyByTimeframeSize(days: number): string {
    const YEAR = 365;
    if (days > YEAR) {
        return 'Q - YYYY'
    }

    if(days < YEAR && days > YEAR * 0.5) {
        return 'MMM - YYYY'
    }

    if(days > 31) {
        return 'ww'
    }

    return ('ddd - MMM')
}

export default function reduceGraphArray<T extends { date: string }>(timeFrameDays: number, rawData: T[], mergeOnKeys: string[]) {
    const XAxisFormatKey = getGraphXAxisKeyByTimeframeSize(timeFrameDays)

    return rawData.reduce((a: T[], entry: T) => {
        const formattedDate = moment(entry.date).format(XAxisFormatKey)
        const existing = a.find(({ date }) => date === formattedDate)


        if(existing) {
            mergeOnKeys.forEach((key) => {
                // @ts-ignore TODO
                existing[key as keyof T] = existing[key as keyof T] + entry[key as keyof T]
            })

            return [
                ...a.filter((item) => item.date !== existing.date),
                existing
            ]
        }

        return [
            ...a,
            { ...entry, date: formattedDate }
        ]
    }, [])

}