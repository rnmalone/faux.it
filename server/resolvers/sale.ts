import {IContext} from "../server";
import {IListQueryInput} from "./employee";
import {Sale} from "../entities";
import {createDelta, logger, Results} from "../lib";
import {
    selectAllSales,
    selectEmployeeProductCategoryProfit, selectEmployeeSaleSourceProfit, selectSaleCustomerStats,
    selectSaleGraphDataForEmployee,
    selectSaleStatusForEmployee
} from "../lib/queries";
import {SALE_SEARCHABLE_FIELDS} from "../config/search.config";
import buildEmployeeSalesStatistics from "./employeeStatistics/buildEmployeeSalesStatistics";
import moment from "moment";
import selectProfitFromSalesByEmployee from "../lib/queries/selectProfitFromSalesByEmployee";
import reduceGraphArray from "../lib/reduceGraphArray";
import {Timeframe} from "../@types/Stats/Timeframe";
import {dataPointsByTimeFrame, dateIteratorSubtractByTimeFrame} from "../config/timeframe.config";

const SALE_FACET_FIELDS: (keyof Partial<Sale>)[] = [
    'status'
]

export interface IEmployeeStatisticsInput {
    id: number;
    timeframe: Timeframe
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
        employeeStatistics: async (root: any, { id, timeframe }: IEmployeeStatisticsInput , {connection}: IContext) => {
            const dateTo = moment().toISOString()
            // @ts-ignore
            const dateFrom = moment().subtract(dataPointsByTimeFrame[timeframe], dateIteratorSubtractByTimeFrame[timeframe]).toISOString()
            logger.info(`Query: employeeStatistics ID: ${id}, TIMEFRAME: ${timeframe}`)
            const dayRange = moment(dateTo).diff(moment(dateFrom), 'days')
            const doubleTimeRangeMoment = moment(dateFrom).subtract(dayRange, 'days')

            const [currentTerm, previousTerm, profitGraphEntries, salesStatusPieChartData, salesStatusGraphEntries, productCategoryProfit, saleSourceProfit, saleCustomerStats] = await Promise.all([
                buildEmployeeSalesStatistics(connection, id, { dateFrom, dateTo }),
                buildEmployeeSalesStatistics(connection, id, { dateFrom: doubleTimeRangeMoment.toISOString(), dateTo: dateFrom }),
                selectProfitFromSalesByEmployee(connection, id, { dateFrom, dateTo }),
                selectSaleStatusForEmployee(connection, id, { dateFrom, dateTo }),
                selectSaleGraphDataForEmployee(connection, id, { dateFrom, dateTo }),
                selectEmployeeProductCategoryProfit(connection, id, { dateFrom, dateTo }),
                selectEmployeeSaleSourceProfit(connection, id, { dateFrom, dateTo }),
                selectSaleCustomerStats(connection, id, { dateFrom, dateTo })
            ])

            if(currentTerm && previousTerm) {
                return {
                    stats: createDelta(currentTerm, previousTerm),
                    profitGraph: reduceGraphArray(timeframe, profitGraphEntries, ['profit']),
                    salesStatusPieChartData,
                    saleStatusGraph: reduceGraphArray(timeframe,salesStatusGraphEntries, ['closed', 'completed']),
                    productCategoryProfit,
                    saleSourceProfit,
                    saleCustomerStats
                }
            }

            return null
        }
    }
}

export default saleResolver
