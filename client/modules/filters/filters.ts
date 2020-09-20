import {Direction} from "../../../server/@types/Direction";
import {SortType} from "../../../server/@types/SortType";
import {IAppStore, ActionHandler, Dispatch, IAction} from "../../@types/store";
import {ChangeEvent} from "react";

export enum FilterActionTypes {
    SET_FILTER = 'app/modules/filters/SET_FILTER',
    CLEAR_FILTER = 'app/modules/filters/CLEAR_FILTER',
    SET_TERM = 'app/modules/filters/SET_TERM',
    SET_SORT = 'app/modules/filters/SET_SORT',
    RESET_ALL = 'app/modules/filters/RESET_ALL',
}

export enum FilterType {
    Employee = 'employee',
    Sale = 'sale',
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
            return () => {

                const {filters: {filter}} = getState();

                const facetArr = filter[filterType].activeFilters[facet]

                const newState = {
                    ...filter,
                    [filterType]: {
                        ...filter[filterType],
                        activeFilters: {
                            ...filter[filterType].activeFilters,
                            [facet]: facetArr.includes(value) ?
                                facetArr.filter((item) => item !== value) :
                                [...facetArr, value]
                        }
                    }
                }

                dispatch({type: FilterActionTypes.SET_FILTER, payload: newState})
            }
        }
    }
}

export function setTerm(filterType: FilterType) {
    return (dispatch: Dispatch<FilterActionTypes>, getState: () => IAppStore) => {
        return (event: ChangeEvent<HTMLInputElement>) => {
            const {filters: {filter}} = getState();
            console.log('ss')

            const newState = {
                ...filter,
                [filterType]: {
                    ...filter[filterType],
                    term: event.target.value
                }
            }

            dispatch({type: FilterActionTypes.SET_FILTER, payload: newState})
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
    }),
    [FilterActionTypes.SET_FILTER]: (state, action) => ({...state, filter: action.payload}),
}

export default function reducer(state: IFilterState = INITIAL_STATE, action: IAction<FilterActionTypes>) {
    const handler = actionHandlers[action.type]

    return handler ? handler(state, action) : state;
}
