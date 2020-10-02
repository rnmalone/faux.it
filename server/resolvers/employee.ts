import {EmployeeDTO} from "../entities/Employee";
import {IContext} from "../server";
import {logger, Results} from "../lib";
import {selectAllEmployees, selectEmployeeById} from "../lib/queries";
import {EMPLOYEE_SEARCHABLE_FIELDS} from "../config/search.config";
import {IListQueryInput} from "../../@types";

const EMPLOYEE_FACET_FIELDS: (keyof Partial<EmployeeDTO>)[] = [
    'division',
    'jobTitle',
    'locationId'
]

const employeeResolver = {
    Query: {
        employeeList: async (root: any, {term, paging, sort: sortInput, facets: facetInput}: IListQueryInput, {connection}: IContext) => {
            const items = await selectAllEmployees(connection)

            logger.info(`Query: employeeList - INPUT: ${JSON.stringify({ term, paging, sortInput, facetInput })}`)

            const resultsBuilder = new Results(items, {
                facetFields: EMPLOYEE_FACET_FIELDS,
                searchableFields: EMPLOYEE_SEARCHABLE_FIELDS,
                sortInput,
                facetInput,
                searchTerm: term,
                sortKey: 'lastName',
                paging
            })

            const response = resultsBuilder.getResponseObject()


            response.items.forEach((item) => {
                logger.info(`Returning ID ${item.id} [${item.firstName} ${item.lastName}]`)
            })

            logger.info(`Returned ${response.items.length} employees`)


            return response
        },

        employee: async (root: any, {id}: { id: number }, {connection}: IContext) => {
            const employee = await selectEmployeeById(connection, id)

            return employee
        }
    }
}

export default employeeResolver
