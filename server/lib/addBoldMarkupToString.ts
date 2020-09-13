import Fuse from "fuse.js";
import RangeTuple = Fuse.RangeTuple;

export default function addBoldMarkupToString(indices: ReadonlyArray<RangeTuple>, str: string) {
    return indices
        .reduce((a: string, [start, end]) => `${a}<b>${str.substr(start, end)}</b>`,
            str.substr(0, indices[0][0])) + str.substr(indices[indices.length - 1][1], str.length)
}
