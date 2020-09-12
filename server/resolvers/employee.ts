import Employee, {EmployeeDTO} from "../entities/Employee";
import {IContext} from "../server";
import {facetExtractor, paginateResults} from "../lib";
import {Sale} from "../entities";
import {sort, sortByAlphaNumeric} from "../lib/sorters";
import {ISortInput} from "../@types/SortInput";
import {IPagingInput} from "../@types/Paging";

const EMPLOYEE_FACET_FIELDS: (keyof Partial<EmployeeDTO>)[] = [
    'division',
    'jobTitle',
    'locationId'
]

export interface IEmployeeListQueryInput {
    sort: ISortInput,
    paging: IPagingInput
}

const employeeResolver = {
    Query: {
        employeeList: async(root: any, { paging, sort: sortInput }: IEmployeeListQueryInput, { connection }: IContext) => {
            let items: Employee[] = await connection.manager.find(Employee)

            const facets = facetExtractor(items, EMPLOYEE_FACET_FIELDS)

            const sorted = sort(items, 'lastName', sortInput?.type, sortInput?.direction)

            const paginatedItems = paginateResults(sorted, paging)

            return {
                count: items.length,
                items: paginatedItems,
                // @ts-ignore
                facets
            }
        },

        employee: async(root: any, { id, }: any, { connection }: IContext) => {
            const employee = await connection
                .getRepository(Employee)
                .createQueryBuilder("employee")
                .where('Employee.id = :id', { id })
                .getOne()

            if(!employee) {
                //TODO error handle

                return {}
            }

            const sales = await connection
                .getRepository(Sale)
                .createQueryBuilder('sale')
                .where('Sale.employeeId = :id', { id })
                .getMany();

            employee.sales = sales

            return employee
        }
    }
}

export default employeeResolver
