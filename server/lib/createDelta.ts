import {decimalPlaces2} from "./utils";

interface IDeltaValue {
    current: number;
    delta: number
}

type DeltaObject<T> = Record<keyof T, IDeltaValue>

export default function createDelta<T extends { [key: string]: number }>(input: T, compareTo: T): DeltaObject<T> {

    return Object.entries(input).reduce((a, [key, current]) => ({
        ...a,
        [key]: {
            current,
            delta: compareTo[key] === 0 ? current : decimalPlaces2(((current - compareTo[key]) / compareTo[key]) * 100)
        }
    }), Object.create(null))
}