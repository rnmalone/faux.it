import {Request, Response} from 'express';

const config = require('../../config/project.config')


export default function clientRenderer(request: Request, response: Response) {
    const createClientConfig = () => ({
        apiBaseUri: config.server.apiBaseUri
    })

    response.render('index', {
        initialClientState: JSON.stringify(createClientConfig())
    })
}
