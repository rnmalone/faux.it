import {Connection} from "typeorm";
import {
    selectAllSalesForDivision,
    selectEmployeeById,
    selectSumProfitForDivisionGroupByEmployee,
    selectSumSalesForDivisionGroupByEmployee
} from "../../lib/queries";
import selectAllSalesForEmployee from "../../lib/queries/selectAllSalesForEmployee";
import {SaleDTO} from "../../entities/Sale";
import {extractSalesMetrics} from "../../lib";
import {IReducedSalesMetrics} from "../../lib/extractSalesMetrics";
import {decimalPlaces2} from "../../lib/utils";
import {IDateRange} from "../../../@types/Dates";

export interface IEmployeeSalesStatistics {
    [key: string]: number;
    totalRevenue: number;
    commissionEarnings: number;
    salesComplete: number;
    salesFailed: number;
    saleConversionPc: number;
    employeeDivisionProfitRank: number;
    employeeDivisionSalesRank: number;
    averageProfit: number;
    totalProfit: number;
    grossProfitMargin: number;
    revenueContributionPcForDivision: number;
    targetRevenueContributionPcForDivision: number;
    averageSaleCloseTimeDays: number;
}

export default async function buildEmployeeSalesStatistics(connection: Connection, employeeId: number, { dateFrom, dateTo }: IDateRange): Promise<IEmployeeSalesStatistics | null> {
    const [employee, employeeSales ] = await Promise.all([
        selectEmployeeById(connection, employeeId),
        selectAllSalesForEmployee(connection, employeeId, { dateFrom, dateTo }),
    ]);

    if(!employee || !employeeSales) {
        return null;
    }

    const divisionSales: SaleDTO[] = await selectAllSalesForDivision(connection, dateFrom, employee.division)

    const divisionSalesMetrics: IReducedSalesMetrics = extractSalesMetrics(divisionSales)
    const employeeReducedSalesMetrics: IReducedSalesMetrics = extractSalesMetrics(employeeSales)

    const [
        divisionProfitsByEmployee,
        divisionSalesByEmployee
    ] = await Promise.all([
        selectSumProfitForDivisionGroupByEmployee(connection, { dateFrom, dateTo }, employee.division),
        selectSumSalesForDivisionGroupByEmployee(connection, { dateFrom, dateTo }, employee.division)
    ])

    const revenueContributionPcForDivision = decimalPlaces2((100 / divisionSalesMetrics.totalProfit) * employeeReducedSalesMetrics.totalProfit)
    const targetRevenueContributionPcForDivision = decimalPlaces2(100 / divisionProfitsByEmployee.length)
    const employeeDivisionProfitRank = divisionProfitsByEmployee.findIndex(({ employeeId: id }) => id === employeeId) + 1
    const employeeDivisionSalesRank = divisionSalesByEmployee.findIndex(({ employeeId: id }) => id === employeeId) + 1

    const saleConversionPc = decimalPlaces2((100 / (employeeReducedSalesMetrics.salesComplete + employeeReducedSalesMetrics.salesFailed)) * employeeReducedSalesMetrics.salesComplete);
    const averageProfit = Math.round(employeeReducedSalesMetrics.totalProfit / employeeReducedSalesMetrics.salesComplete);
    const commissionEarnings = Math.round(employeeReducedSalesMetrics.totalProfit * (employee.commissionRate / 100));
    const averageSaleCloseTimeDays = Math.round(employeeReducedSalesMetrics.totalDaysBetweenOpenAndClosedSales / employeeReducedSalesMetrics.salesComplete)
    const grossProfitMargin = decimalPlaces2((employeeReducedSalesMetrics.totalRevenue - employeeReducedSalesMetrics.totalItemCost) / employeeReducedSalesMetrics.totalRevenue * 100)

    return {
        saleConversionPc,
        averageProfit,
        commissionEarnings,
        averageSaleCloseTimeDays,
        employeeDivisionProfitRank,
        employeeDivisionSalesRank,
        revenueContributionPcForDivision,
        targetRevenueContributionPcForDivision,
        grossProfitMargin,
        ...employeeReducedSalesMetrics
    }
}