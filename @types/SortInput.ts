import {Direction} from "./Direction";
import {SortType} from "./SortType";

export interface ISortInput {
    type: SortType
    direction?: Direction
}
