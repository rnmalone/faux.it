import {IContext} from "../server";
import {IListQueryInput} from "./employee";
import {Sale} from "../entities";
import {Results} from "../lib";
import {selectAllSales} from "../lib/queries";
import {SALE_SEARCHABLE_FIELDS} from "../config/search.config";
import buildEmployeeSalesStatistics from "./buildEmployeeSalesStatisticsResponse";
import moment from "moment";

const SALE_FACET_FIELDS: (keyof Partial<Sale>)[] = [
    'status'
]

export interface IEmployeeStatisticsInput {
    id: number;
    from: string;
}

const saleResolver = {
    Query: {
        saleList: async (root: any, {term, paging, sort: sortInput, facets: facetInput}: IListQueryInput, {connection}: IContext) => {
            let items = await selectAllSales(connection)

            // TODO add this to query builder
            // @ts-ignore
            items = items.map((item) => ({...item, employee: `${item.employee.firstName} ${item.employee.lastName}`}))

            const resultsBuilder = new Results(items, {
                facetFields: SALE_FACET_FIELDS,
                searchableFields: SALE_SEARCHABLE_FIELDS,
                sortInput,
                facetInput,
                searchTerm: term,
                sortKey: 'item',
                paging
            })

            return resultsBuilder.getResponseObject()
        },
        employeeStatistics: async (root: any, { id, from }: IEmployeeStatisticsInput , {connection}: IContext) => {
            return await buildEmployeeSalesStatistics(connection, { id, from: moment(from).toISOString() })
        }
    }
}

export default saleResolver
