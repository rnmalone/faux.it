import {useState} from "react";
import {Timeframe} from "../../../@types/Stats/Timeframe";

const TIMEFRAME_OPTIONS = [
    {
        key: Timeframe.Month,
        value: 'timeframe.1'
    },
    {
        key: Timeframe.Quarter,
        value: 'timeframe.2'
    },
    {
        key: Timeframe.Half,
        value: 'timeframe.3'
    },
    {
        key: Timeframe.Year,
        value: 'timeframe.4'
    }
]

interface IUseTimeframeHook {
    timeframe: Timeframe;
    options: { key: Timeframe, value: string }[]

    toggleTimeframe(segments: Timeframe): () => void
}

export default function useTimeframe(): IUseTimeframeHook {
    const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.Year)
    const toggleTimeframe = (segment: Timeframe) => () => void setTimeframe(segment)

    return {timeframe, toggleTimeframe, options: TIMEFRAME_OPTIONS}
}