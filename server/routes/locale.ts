import {logger} from "../lib";
import {Request, Response} from 'express'

const supportedLocale = require('../../lang')

export default async function locale(request: Request, response: Response) {
    const {localeCode} = request.query

    if (supportedLocale[localeCode as any]) {
        logger.info(`Requested locale ${localeCode}`)
        return void response.send({
            localeMessages: supportedLocale[localeCode as any],
            localeCode
        })
    }

    logger.info(`Unsupported locale ${localeCode}`)
    return response.sendStatus(404)
}