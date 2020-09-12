import {Direction} from "../../@types/Direction";

export default function sortByAlphanumeric<T>(items: T[], keyToSortOn: keyof T, direction: Direction) {
    // return items.sort((itemA, itemB) => {
    //     if(typeof itemA[keyToSortOn] === 'string') {
    //         var valueA = itemA[keyToSortOn].toUpperCase(); // ignore upper and lowercase
    //         var valueB = itemB[keyToSortOn].toUpperCase(); // ignore upper and lowercase
    //         if (valueA < valueB) {
    //             return -1;
    //         }
    //         if (valueA > valueB) {
    //             return 1;
    //         }
    //
    //         // names must be equal
    //         return 0;
    //     }
    // })
}
