import matchEntityProperties from "../matchEntityProperties";
import Fuse from "fuse.js";
import {Sale} from "../../entities";

export default function createSaleSuggestions(items: Fuse.FuseResult<Sale>[]) {
    return items.map(({score, matches, item: sale}) => {
        const matchedProperties = matchEntityProperties(matches)

        return {
            entity: 'SALE',
            primaryText: `Sale ${matchedProperties?.id || sale.id}`,
            // @ts-ignore
            secondaryText: `Item: ${matchedProperties?.item || sale.item} Sales rep: ${matchedProperties?.employee || sale.employee}`,
            imageUrl: '',
            score
        }
    })
}
