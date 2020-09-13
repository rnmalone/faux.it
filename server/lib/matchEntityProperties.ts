import addBoldMarkupToString from "./addBoldMarkupToString";
import Fuse from "fuse.js";
import FuseResultMatch = Fuse.FuseResultMatch;

export default function matchEntityProperties<T>(matches: ReadonlyArray<FuseResultMatch>) {
    return matches.reduce((a, match) => ({
        ...a,
        [match.key]: addBoldMarkupToString(match.indices, match.value)
    }), Object.create(null))
}
