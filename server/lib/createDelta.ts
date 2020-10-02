import {decimalPlaces2} from "./utils";
import {IDelta} from "../../@types";


type DeltaObject<T extends string> = Record<T, IDelta>

export default function createDelta<T extends { [key: string]: number }>(input: T, compareTo: T): DeltaObject<string> {

    return Object.entries(input).reduce((a, [key, current]) => ({
        ...a,
        [key]: {
            current,
            delta: compareTo[key] === 0 ? current : decimalPlaces2(((current - compareTo[key]) / compareTo[key]) * 100)
        }
    }), Object.create(null))
}