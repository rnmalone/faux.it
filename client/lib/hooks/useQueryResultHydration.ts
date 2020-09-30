import {useState} from "react";
import useTruthyEffect from "./useTruthyEffect";

export default function useQueryResultHydration<T>(results: T[]) {
    const [savedResults, setSavedResults] = useState<T[]>([])

    useTruthyEffect(() => void setSavedResults(results), [results?.length])

    return savedResults
}