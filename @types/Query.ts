import {EmployeeDTO} from "../server/entities/Employee";
import {LocationDTO} from "../server/entities/Location";
import {IFacetInput, IFacetResult} from "./Facet";
import {ISortInput} from "./SortInput";
import {IPagingInput} from "./Paging";

export interface IDelta {
    current: number;
    delta: number;
}

export interface IGenericGraphEntry {
    sales: number;
    profit: number;
    label: string;
    revenue: string;
}

export interface IRevenueGraphEntry {
    revenue: number;
    date: string;
}

export type Statistics<K extends string> = Record<K, IDelta>

export interface IListQueryInput {
    term?: string;
    sort: ISortInput,
    paging: IPagingInput,
    facets: IFacetInput[]
}

export interface ISalesOverviewStatisticsResponse {
    salesOverviewStatistics: {
        stats: Statistics<'revenue' | 'grossSalesProfit' | 'uniqueCustomers' | 'sales'>
        divisionRevenueGraph: IGenericGraphEntry[]
        salesLeadRevenueGraph: IGenericGraphEntry[]
        revenueGraph: IRevenueGraphEntry[]
    }
}

export interface ISalesStatusPieSegment {
    status: string;
    value: number;
}

export interface ISalesStatusGraph {
    data: string;
    closed: number;
    complete: number;
}

export interface ICustomerStats {
    gender: string
    profit: number
    averageProfit: number
    averageSpend: number
    averageAge: number
    revenue: number
    saleCount: number
}

export interface ISaleSourceProfit {
    profit: number;
    leadSource: string
}

export interface IProductCategoryProfit {
    productCategory: string;
    profit: number;
}

export interface IEmployeeStatisticsResponse {
    employeeStatistics: {
        stats: Statistics<
            'salesComplete' |
            'salesFailed' |
            'saleConversionPc' |
            'averageProfit' |
            'averageSaleCloseTimeDays' |
            'totalProfit' |
            'totalRevenue' |
            'commissionEarnings' |
            'employeeDivisionSalesRank' |
            'employeeDivisionProfitRank'
            >;
        revenueGraph: IRevenueGraphEntry[];
        salesStatusPieChartData: ISalesStatusPieSegment[];
        saleStatusGraph: ISalesStatusGraph[];
        productCategoryProfit: IProductCategoryProfit[]
        saleSourceProfit: ISaleSourceProfit[]
        saleCustomerStats: ICustomerStats[]
    }
}

interface IEmployeeResult extends EmployeeDTO { location: LocationDTO }

export interface IEmployeeListQueryResponse {
    employeeList: {
        count: number;
        facets: IFacetResult[];
        items: IEmployeeResult[];
    }
}
