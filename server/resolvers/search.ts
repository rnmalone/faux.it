import {IContext} from "../server";
import {selectAllEmployees, selectAllSales} from "../lib/queries";
import {applySearchTermToItems} from "../lib";
import {EMPLOYEE_SEARCHABLE_FIELDS, SALE_SEARCHABLE_FIELDS} from "../config/search.config";
import createEmployeeSuggestions from "../lib/searchSuggestors/createEmployeeSuggestions";
import Fuse from "fuse.js";
import {Employee, Sale} from "../entities";
import {createSaleSuggestions} from "../lib/searchSuggestors";

const search = {
    Query: {
        searchSuggestions: async (root: any, {term}: { term: string }, {connection}: IContext) => {
            let [
                sales,
                employees,
                // locations
            ] = await Promise.all([
                selectAllSales(connection),
                selectAllEmployees(connection),
                // selectAllLocations(connection)
            ])

            // TODO add this to query builder
            // @ts-ignore
            sales = sales.map((item) => ({...item, employee: `${item.employee.firstName} ${item.employee.lastName}`}))

            const matchingItems = [
                ...createEmployeeSuggestions(applySearchTermToItems(employees, term, EMPLOYEE_SEARCHABLE_FIELDS, true) as Fuse.FuseResult<Employee>[]),
                ...createSaleSuggestions(applySearchTermToItems(sales, term, SALE_SEARCHABLE_FIELDS, true) as Fuse.FuseResult<Sale>[]),
            ]

            return {
                count: matchingItems.length,
                items: matchingItems
            }

        }
    }
}

export default search;
