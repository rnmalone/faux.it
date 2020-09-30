import {useEffect} from "react";

/*
    Wrapper for useEffect that only runs when all dependencies are truthy
 */
export default function useTruthyEffect(cb: () => void, deps: any[]) {
    useEffect(() => {
        if (deps.every(Boolean)) cb()
    }, deps)
}