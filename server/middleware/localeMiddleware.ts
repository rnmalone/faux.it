import {NextFunction, Request, Response} from "express";

const localeMessages = require('../../lang')

/**
 * Append messages for selected language based on browser preference
 *
 * @param request
 * @param response
 * @param next
 */
export default function localeMiddleware(request: Request, response: Response, next: NextFunction): void {
    const supportedLanguages = Object
        .values(localeMessages)
        // @ts-ignore
        .map((messages) => messages.meta)

    const acceptedLanguages = request.headers['accept-language']
    if (!acceptedLanguages) {
        response.locals.locale = 'en-GB'
        response.locals.localeMessages = localeMessages['en-GB']

        return void next()
    }

    const languageCode = acceptedLanguages.split(',').find((lang: string) => localeMessages[lang])
    response.locals.localeMessages = localeMessages[languageCode || 'en-GB']
    response.locals.locale = languageCode
    response.locals.supportedLanguages = supportedLanguages

    next()
}