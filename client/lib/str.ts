import {useIntl} from 'react-intl'

export default function str(msgCode: string, values?: { [key: string]: any }, options?: { [key: string]: any }) {
    const intl = useIntl()

    return intl.formatMessage(Object.assign({id: msgCode}, options), values)
}