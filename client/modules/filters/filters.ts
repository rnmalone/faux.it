import {Direction} from "../../../server/@types/Direction";
import {SortType} from "../../../server/@types/SortType";
import {IAppStore, ActionHandler, Dispatch, IAction} from "../../@types/store";

export enum FilterActionTypes {
    SET_FILTER = 'app/modules/filters/SET_FILTER',
    CLEAR_FILTER = 'app/modules/filters/CLEAR_FILTER',
    SET_TERM = 'app/modules/filters/SET_TERM',
    SET_SORT = 'app/modules/filters/SET_SORT',
    RESET_ALL = 'app/modules/filters/RESET_ALL',
}

export enum FilterType {
    Employee,
    Sale,
}

export type StoredFilters = Record<string, string[]>

export interface ISearchFilters {
    term: string,
    sort: {
        direction: Direction,
        type: SortType
    }
    activeFilters: StoredFilters
}

export interface IFilterState {
    filter: Record<FilterType, ISearchFilters>
}

const boilerPlate = {
    term: '',
    sort: {
        direction: Direction.DOWN,
        type: SortType.ALPHANUMERIC
    },
}

const INITIAL_STATE: Readonly<IFilterState> = {
    filter: {
        [FilterType.Employee]: {
            ...boilerPlate,
            activeFilters: {
                location: [],
                division: [],
                jobTitle: [],
            }
        },
        [FilterType.Sale]: {
            ...boilerPlate,
            activeFilters: {
                status: []
                // TODO
            }
        },
    }
}

export function toggleFilterItem(filterType: FilterType) {
    return (dispatch: Dispatch<FilterActionTypes>, getState: () => IAppStore) => {
        return (facet: string, value: string) => {

        }
    }
}

const actionHandlers: ActionHandler<FilterActionTypes, IFilterState> = {
    [FilterActionTypes.CLEAR_FILTER]: (state, action) => ({
            ...state,
            filter: {
                ...state.filter,
                [action.payload.filterType]: INITIAL_STATE.filter[action.payload.filterType as FilterType]
            }
        })
}

export default function reducer(state: IFilterState = INITIAL_STATE, action: IAction<FilterActionTypes>) {
    const handler = actionHandlers[action.type]

    return handler ? handler(state, action) : state;
}
