import matchEntityProperties from "../matchEntityProperties";
import Fuse from "fuse.js";
import {Employee} from "../../entities";

export default function createEmployeeSuggestions(items: Fuse.FuseResult<Employee>[]) {
    return items.map(({score, matches, item: employee}) => {
        const matchedProperties = matchEntityProperties(matches)

        return {
            entity: 'EMPLOYEE',
            primaryText: `${matchedProperties?.firstName || employee.firstName} ${matchedProperties?.lastName || employee.lastName}`,
            secondaryText: matchedProperties?.email || matchedProperties?.jobTitle || matchedProperties?.division,
            imageUrl: employee.imageUrl,
            score
        }
    })
}
