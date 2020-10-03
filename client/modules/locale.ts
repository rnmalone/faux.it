import {ActionHandler, Dispatch, IAction} from "../@types/store";
import axios from 'axios';
import {ILanguageMeta, ILocaleMessages} from "../../@types";
import { localeUrl } from "client/config/client.config";

enum LocaleActionTypes {
    SET_MESSAGES = 'app/modules/locale/SET_MESSAGES'
}

export function toggleLanguage(localeCode: string) {
    return (dispatch: Dispatch<LocaleActionTypes.SET_MESSAGES>) => {
        return async () => {
            try {
                const response = await axios.get(`${localeUrl}?localeCode=${localeCode}`)

                dispatch({ type: LocaleActionTypes.SET_MESSAGES, payload: response.data })
            } catch (e) {
                console.error(`No supported locale messages for ${localeCode}`)
            }
        }
    }
}

export interface ILocaleState {
    localeMessages: ILocaleMessages;
    supportedLanguages: ILanguageMeta[];
    localeCode: string;
}

const INITIAL_STATE = {
    localeMessages: {},
    localeCode: 'en-GB',
    supportedLanguages: []
}

const actionHandlers: ActionHandler<LocaleActionTypes, ILocaleState> = {
    [LocaleActionTypes.SET_MESSAGES]: (state, action) => ({
        ...state,
        localeCode: action.payload.localeCode,
        localeMessages: action.payload.localeMessages
    })
}

export default function reducer(state: ILocaleState = INITIAL_STATE, action: IAction<LocaleActionTypes>) {
    const handler = actionHandlers[action.type]

    return handler ? handler(state, action) : state;
}
