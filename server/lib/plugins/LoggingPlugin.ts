import {GraphQLRequestContext, GraphQLRequestListener} from "apollo-server-plugin-base";

import logger from '../logger';

const LoggingPlugin: GraphQLRequestListener = {
    serverWillStart: () => {
        logger.info("Starting GQL Server")
    },
    requestDidStart(requestContext) {
        if(requestContext.request.operationName === 'IntrospectionQuery') {
            return void 0
        }

        logger.debug(JSON.stringify(requestContext.request, null, 2))
        logger.debug(`REQUEST PAYLOAD: ${requestContext.request.variables}`)

        return {
            didEncounterErrors(requestContext: GraphQLRequestContext) {
                logger.error("Error encountered for query: " + requestContext.request.query);
                logger.error(requestContext.errors);
            }
        }
    },
    willSendResponse: (requestContext) => {
        logger.debug(`RESPONSE: ${JSON.stringify(requestContext.response, null, 2)}`)
    }

}

export default LoggingPlugin