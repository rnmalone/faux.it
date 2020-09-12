import {Direction} from "../../@types/Direction";
import {SortType} from "../../@types/SortType";
import alphanumberic from "./alphanumberic";

export default function sort<T>(items: T[], keyToSortOn: keyof T, sortType: SortType = SortType.ALPHANUMERIC, direction: Direction = Direction.DOWN) {
    const sortFnResolver: Partial<{ [key in keyof typeof SortType]: (items: T[], keyToSortOn: keyof T, direction: Direction) => T[] }> = {
        [SortType.ALPHANUMERIC]: alphanumberic
    }

    const resolver = sortFnResolver[sortType];

    return resolver ? resolver(items, keyToSortOn, direction) : items
}
