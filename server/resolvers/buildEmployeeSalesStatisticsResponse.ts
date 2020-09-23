import {Connection} from "typeorm";
import {
    selectAllSalesForDivision,
    selectEmployeeById,
    selectSumProfitForDivisionGroupByEmployee,
    selectSumSalesForDivisionGroupByEmployee
} from "../lib/queries";
import selectAllSalesForEmployee from "../lib/queries/selectAllSalesForEmployee";
import {IEmployeeStatisticsInput} from "./sale";
import {SaleDTO} from "../entities/Sale";
import {extractSalesMetrics} from "../lib";
import {IReducedSalesMetrics} from "../lib/extractSalesMetrics";
import {decimalPlaces2} from "../lib/utils";

export interface IEmployeeSalesStatistics {
    totalRevenue: number;
    commissionEarnings: number;
    salesComplete: number;
    salesFailed: number;
    saleConversionPc: number;
    employeeDivisionProfitRank: number;
    employeeDivisionSalesRank: number;
    averageProfit: number;
    totalProfit: number;
    // averageProfitMargin: number;
    revenueContributionPcForDivision: number;
    targetRevenueContributionPcForDivision: number;
    averageSaleCloseTimeDays: number;
}

export default async function buildEmployeeSalesStatistics(connection: Connection, { id: employeeId, from }: IEmployeeStatisticsInput): Promise<IEmployeeSalesStatistics | null> {
    const [employee, employeeSales ] = await Promise.all([
        selectEmployeeById(connection, employeeId),
        selectAllSalesForEmployee(connection, employeeId, from),
    ]);

    if(!employee || !employeeSales) {
        return null;
    }

    const divisionSales: SaleDTO[] = await selectAllSalesForDivision(connection, from, employee.division)

    const divisionSalesMetrics: IReducedSalesMetrics = extractSalesMetrics(divisionSales)
    const employeeReducedSalesMetrics: IReducedSalesMetrics = extractSalesMetrics(employeeSales)

    const [
        divisionProfitsByEmployee,
        divisionSalesByEmployee
    ] = await Promise.all([
        selectSumProfitForDivisionGroupByEmployee(connection, from, employee.division),
        selectSumSalesForDivisionGroupByEmployee(connection, from, employee.division)
    ])

    const revenueContributionPcForDivision = decimalPlaces2((100 / divisionSalesMetrics.totalProfit) * employeeReducedSalesMetrics.totalProfit)
    const targetRevenueContributionPcForDivision = decimalPlaces2(100 / divisionProfitsByEmployee.length)
    const employeeDivisionProfitRank = divisionProfitsByEmployee.findIndex(({ employeeId: id }) => id === employeeId) + 1
    const employeeDivisionSalesRank = divisionSalesByEmployee.findIndex(({ employeeId: id }) => id === employeeId) + 1

    const saleConversionPc = decimalPlaces2((100 / (employeeReducedSalesMetrics.salesComplete + employeeReducedSalesMetrics.salesFailed)) * employeeReducedSalesMetrics.salesComplete);
    const averageProfit = Math.round(employeeReducedSalesMetrics.totalProfit / employeeReducedSalesMetrics.salesComplete);
    const commissionEarnings = Math.round(employeeReducedSalesMetrics.totalProfit * (employee.commissionRate / 100));

    return {
        saleConversionPc,
        averageProfit,
        commissionEarnings,
        employeeDivisionProfitRank,
        employeeDivisionSalesRank,
        revenueContributionPcForDivision,
        targetRevenueContributionPcForDivision,
        ...employeeReducedSalesMetrics
    }
}