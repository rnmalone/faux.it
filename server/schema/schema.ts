//TODO extract out by entity
import {gql} from 'apollo-server'

const typeDefs = gql`
    #Employee structure
    type Employee {
        id: Int
        firstName: String
        lastName: String
        jobTitle: String
        division: String
        salary: Int
        commissionRate: Float
        joinDate: String
        profileImageUrl: String
        bannerImageUrl: String
        email: String
        location: Location
        sales: [Sale]
    }

    type Sale {
        id: Int
        employeeId: Int
        employee: String
        item: String
        agreedPrice: Int
        ticketPrice: Int
        customerName: String
        status: SaleStatus
        dateOpened: String
        dateClosed: String
    }

    type Location {
        id: Int
        address: String
        countryName: String
        countryCode: String
        employees: [Employee]
    }

    type EmployeeResult {
        count: Int
        items: [Employee]
        facets: [FacetResult]
    }

    type SaleResult {
        count: Int
        items: [Sale]
        facets: [FacetResult]
    }

    type Facet {
        value: String!
        count: Int!
    }

    type FacetResult {
        category: String!
        items: [Facet]!
    }

    enum SaleStatus {
        COMPLETE
        IN_PROGRESS
        CLOSED
        AWAITING_PAYMENT
    }

    input FacetFilterInput {
        category: String!
        selected: [String]!
        maxSelected: Int = 50
        limit: Int
    }

    type Paging {
        offset: Int
        limit: Int
        sort: Sort
    }

    input PagingInput {
        offset: Int = 0
        limit: Int = 10
        sort: SortInput
    }

    enum SortType {
        ALPHANUMERIC
        VALUE
        STATUS
    }

    enum Direction {
        DOWN
        UP
    }

    type Sort {
        type: SortType!
        direction: Direction
    }

    input SortInput {
        type: SortType!
        direction: Direction
    }

    enum Entity {
        EMPLOYEE
        SALE
        LOCATION
    }

    type SearchSuggestion {
        entity: Entity!
        primaryText: String
        secondaryText: String
        profileImageUrl: String
        score: Int
    }

    type SearchSuggestionResult {
        count: Int
        items: [SearchSuggestion]
    }

    type Delta {
        current: Float
        delta: Float
    }

    type SaleStatusPieEntry {
        status: SaleStatus
        value: Int
    }

    type EmployeePerformanceStatistics {
        totalRevenue: Delta
        commissionEarnings: Delta
        salesComplete: Delta
        salesFailed: Delta
        saleConversionPc: Delta
        employeeDivisionProfitRank: Delta
        employeeDivisionSalesRank: Delta
        averageProfit: Delta
        totalProfit: Delta
        revenueContributionPcForDivision: Delta
        averageSaleCloseTimeDays: Delta
        averageDivisionSaleCloseTimeDays: Delta
        grossProfitMargin: Delta
    }

    type RevenueGraphEntry {
        revenue: Float
        date: String
    }

    type GenericSalesGraphEntry {
        revenue: Float
        profit: Float
        sales: Float
        label: String
    }

    type SaleStatusGraphEntry {
        closed: Int
        completed: Int
        date: String
    }

    type ProductCategoryProfit {
        productCategory: String
        profit: Float
    }

    type SaleSourceProfit {
        profit: Float
        leadSource: String
    }

    type SaleCustomerStatsByGender {
        gender: String
        profit: Float
        averageProfit: Float
        averageSpend: Float
        averageAge: Float
        revenue: Float
        saleCount: Float
    }

    type EmployeeSalesStatistics {
        stats: EmployeePerformanceStatistics
        revenueGraph: [RevenueGraphEntry]
        salesStatusPieChartData: [SaleStatusPieEntry]
        saleStatusGraph: [SaleStatusGraphEntry]
        productCategoryProfit: [ProductCategoryProfit]
        saleSourceProfit: [SaleSourceProfit]
        saleCustomerStats: [SaleCustomerStatsByGender]
    }

    type SalesOverviewPerformanceStatistics {
        revenue: Delta
        grossSalesProfit: Delta
        uniqueCustomers: Delta
        sales: Delta

        #        saleConversion: Delta
        #        revenuePcFromRepeatCustomers: Delta
        #        salesCostPcOfRevenue: Delta
        #        saleConversionDays: Delta
        #        totalComissionPaid: Delta
        #        totalEmployeeSalaries: Delta
        #        totalEmployeeExpenditure: Delta
    }

    type SalesOverviewStatistics {
        stats: SalesOverviewPerformanceStatistics
        revenueGraph: [RevenueGraphEntry]
        divisionRevenueGraph: [GenericSalesGraphEntry]
        salesLeadRevenueGraph: [GenericSalesGraphEntry]
    }

    type Query {
        employee(id: Int): Employee

        employeeList(
            term: String
            facets: [FacetFilterInput]
            paging: PagingInput
        ): EmployeeResult

        saleList(
            term: String
            facets: [FacetFilterInput]
            paging: PagingInput
            sort: SortInput
        ): SaleResult

        searchSuggestions(
            term: String
        ): SearchSuggestionResult

        employeeStatistics(
            id: Int!
            timeframe: Int!
        ): EmployeeSalesStatistics

        salesOverviewStatistics(
            timeframe: Int!
        ): SalesOverviewStatistics
    }
`

export default typeDefs;
