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
        commissionRate: Int
        joinDate: String
        imageUrl: String
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
        COMPLETED
        IN_PROGRESS
        CLOSED
        PENDING_PAYMENT
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
        imageUrl: String
        score: Int
    }
    
    type SearchSuggestionResult {
        count: Int
        items: [SearchSuggestion]
    }
    
    type EmployeeSalesStatistics {
        totalRevenue: Int
        commissionEarnings: Int
        salesComplete: Int
        salesFailed: Int
        saleConversionPc: Float
        employeeDivisionProfitRank: Int
        employeeDivisionSalesRank: Int
        averageProfit: Int
        totalProfit: Int
        revenueContributionPcForDivision: Int
        averageSaleCloseTimeDays: Int
        averageDivisionSaleCloseTimeDays: Int
    }
   
    type Query {
        employee(id: Int): Employee
        
        employeeList(
            term: String
            facets: [FacetFilterInput]
            paging: PagingInput
            sort: SortInput
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
            from: String!
        ): EmployeeSalesStatistics
    }
`

export default typeDefs;
