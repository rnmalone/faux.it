import {useState} from "react";
import {Timeframe} from "../../../server/@types/Stats/Timeframe";

const TIMEFRAME_OPTIONS = [
    {
        key: Timeframe.Month,
        value: 'Month'
    },
    {
        key: Timeframe.Quarter,
        value: 'Quarter'
    },
    {
        key: Timeframe.Half,
        value: '6 Months'
    },
    {
        key: Timeframe.Year,
        value: 'Year'
    }
]
interface IUseTimeframeHook {
    timeframe: Timeframe;
    toggleTimeframe(segments: Timeframe): () => void
    options: { key: Timeframe, value: string }[]
}

export default function useTimeframe(): IUseTimeframeHook {
    const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.Year)
    const toggleTimeframe = (segment: Timeframe) => () => void setTimeframe(segment)

    return { timeframe, toggleTimeframe, options: TIMEFRAME_OPTIONS }
}