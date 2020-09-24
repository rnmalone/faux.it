import {IContext} from "../server";
import {IListQueryInput} from "./employee";
import {Sale} from "../entities";
import {createDelta, Results} from "../lib";
import {selectAllSales} from "../lib/queries";
import {SALE_SEARCHABLE_FIELDS} from "../config/search.config";
import buildEmployeeSalesStatistics from "./buildEmployeeSalesStatistics";
import moment from "moment";

const SALE_FACET_FIELDS: (keyof Partial<Sale>)[] = [
    'status'
]

export interface IEmployeeStatisticsInput {
    id: number;
    dateFrom: string;
    dateTo: string;
}

const saleResolver = {
    Query: {
        saleList: async (root: any, {term, paging, sort: sortInput, facets: facetInput}: IListQueryInput, {connection}: IContext) => {
            let items = await selectAllSales(connection)

            // TODO add this to query builder
            // @ts-ignore
            items = items.map((item) => ({ ...item, employee: `${item.employee.firstName} ${item.employee.lastName}`}))

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
        employeeStatistics: async (root: any, { id, dateFrom, dateTo }: IEmployeeStatisticsInput , {connection}: IContext) => {
            const dateFromMoment = moment(dateFrom)
            const dateToMoment = moment(dateTo)
            const doubleTimeRangeMoment =  moment(dateFrom).subtract(moment(dateTo).diff(moment(dateFrom), 'days'), 'days')

            const [currentTerm, previousTerm] = await Promise.all([
                await buildEmployeeSalesStatistics(connection, {
                    id,
                    dateFrom: dateFromMoment.toISOString(),
                    dateTo: dateToMoment.toISOString()
                }),
                await buildEmployeeSalesStatistics(connection, {
                    id,
                    dateFrom: doubleTimeRangeMoment.toISOString(),
                    dateTo: dateFromMoment.toISOString()
                })
            ])



            if(currentTerm && previousTerm) {
                return createDelta(currentTerm, previousTerm)
            }

            return null
        }
    }
}

export default saleResolver
