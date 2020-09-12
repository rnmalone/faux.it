import {Direction} from "../../@types/Direction";

export default function sortByAlphanumeric<T>(items: T[], keyToSortOn: keyof T, direction: Direction): T[] {
    return items.sort((itemA, itemB) => {
        const valueA = String(itemA[keyToSortOn]).toUpperCase();
        const valueB = String(itemB[keyToSortOn]).toUpperCase();

        if (valueA < valueB) {
            return direction === Direction.DOWN ? -1 : 1;
        }

        if (valueA > valueB) {
            return direction === Direction.DOWN ? 1 : -1;
        }

        return 0;
    })
}
