import {IContext} from "../server";
import {Sale} from "../entities";
import 'apollo-cache-control';

import {createDatesFromTimeframe, createDelta, logger, Results} from "../lib";
import {
    selectAllSales,
    selectEmployeeProductCategoryProfit,
    selectEmployeeSaleSourceProfit,
    selectReducibleStatsForAllSales,
    selectRevenueFromSales,
    selectRevenueFromSalesByEmployee,
    selectSaleCustomerStats,
    selectSaleGraphDataForEmployee,
    selectSalesStatsForDivisions, selectSalesStatsForLocations,
    selectSalesStatsForSalesChannels,
    selectSaleStatusForEmployee
} from "../lib/queries";
import {SALE_SEARCHABLE_FIELDS} from "../config/search.config";
import buildEmployeeSalesStatistics from "./employeeStatistics/buildEmployeeSalesStatistics";
import reduceGraphArray from "../lib/reduceGraphArray";
import {Timeframe} from "../../@types/Stats/Timeframe";
import {IEmployeeStatisticsResponse, IListQueryInput, ISalesOverviewStatisticsResponse} from "../../@types";
import {SaleStatus} from "../entities/Sale";

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
        employeeStatistics: async (root: any, {id, timeframe}: IEmployeeStatisticsInput, {connection}: IContext): Promise<IEmployeeStatisticsResponse['employeeStatistics']> => {
            const {dateFrom, dateTo, doubleTimeRangeMoment} = createDatesFromTimeframe(timeframe)

            logger.info(`Query: employeeStatistics ID: ${id}, TIMEFRAME: ${timeframe}`)

            const [currentTerm, previousTerm, revenueGraphEntries, salesStatusPieChartData, salesStatusGraphEntries, productCategoryProfit, saleSourceProfit, saleCustomerStats] = await Promise.all([
                buildEmployeeSalesStatistics(connection, id, {dateFrom, dateTo}),
                buildEmployeeSalesStatistics(connection, id, {dateFrom: doubleTimeRangeMoment, dateTo: dateFrom}),
                selectRevenueFromSalesByEmployee(connection, id, {dateFrom, dateTo}),
                selectSaleStatusForEmployee(connection, id, {dateFrom, dateTo}),
                selectSaleGraphDataForEmployee(connection, id, {dateFrom, dateTo}),
                selectEmployeeProductCategoryProfit(connection, id, {dateFrom, dateTo}),
                selectEmployeeSaleSourceProfit(connection, id, {dateFrom, dateTo}),
                selectSaleCustomerStats(connection, id, {dateFrom, dateTo})
            ])

            if (currentTerm && previousTerm) {
                return {
                    stats: createDelta(currentTerm, previousTerm),
                    revenueGraph: reduceGraphArray(timeframe, revenueGraphEntries, ['revenue']),
                    salesStatusPieChartData: salesStatusPieChartData.filter((entry) => entry.status === SaleStatus.Complete || entry.status === SaleStatus.Closed),
                    saleStatusGraph: reduceGraphArray(timeframe, salesStatusGraphEntries, ['closed', 'completed']),
                    productCategoryProfit,
                    saleSourceProfit,
                    saleCustomerStats
                }
            }

            return null
        },
        salesOverviewStatistics: async (root: any, {timeframe}: { timeframe: number }, {connection}: IContext): Promise<ISalesOverviewStatisticsResponse['salesOverviewStatistics']> => {
            const {dateFrom, dateTo, doubleTimeRangeMoment} = createDatesFromTimeframe(timeframe);

            logger.info(`Query: salesOverviewStatistics TIMEFRAME: ${timeframe}`)

            const [
                reducedStatsForSalesCurrentTerm,
                reducedStatsForSalesPreviousTerm,
                revenueGraphEntries,
                divisionSalesStats,
                salesLeadSalesStats,
                locationSalesStats
            ] = await Promise.all([
                selectReducibleStatsForAllSales(connection, {dateFrom, dateTo}),
                selectReducibleStatsForAllSales(connection, {dateFrom: doubleTimeRangeMoment, dateTo: dateFrom}),
                selectRevenueFromSales(connection, {dateFrom, dateTo}),
                selectSalesStatsForDivisions(connection, {dateFrom, dateTo}),
                selectSalesStatsForSalesChannels(connection, {dateFrom, dateTo}),
                selectSalesStatsForLocations(connection, {dateFrom, dateTo})
            ])

            const delta = createDelta(reducedStatsForSalesCurrentTerm[0], reducedStatsForSalesPreviousTerm[0])

            return {
                stats: delta,
                revenueGraph: reduceGraphArray(timeframe, revenueGraphEntries, ['revenue']),
                salesLeadRevenueGraph: salesLeadSalesStats,
                divisionRevenueGraph: divisionSalesStats,
                locationSalesStats
            }
        }
    }
}

export default saleResolver
