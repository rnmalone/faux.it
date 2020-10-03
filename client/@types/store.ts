import {IFilterState} from "../modules/filters";
import {ILocaleState} from "../modules/locale";

export interface IAppStore {
    filters: IFilterState,
    locale: ILocaleState
}

export type Dispatch<T> = (action: IAction<T>) => void

export interface IAction<T> {
    type: T,
    payload: any
}

export type ActionHandler<ActionType extends PropertyKey, State> = Partial<{ [K in ActionType]: (state: State, action: IAction<ActionType>) => State }>
