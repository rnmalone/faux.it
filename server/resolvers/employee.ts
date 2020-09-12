import Employee, {EmployeeDTO} from "../entities/Employee";
import {IContext} from "../server";
import {facetExtractor, paginateResults} from "../lib";
import {Sale} from "../entities";

const EMPLOYEE_FACET_FIELDS: (keyof Partial<EmployeeDTO>)[] = [
    'division',
    'jobTitle',
    'locationId'
]

const employeeResolver = {
    Query: {
        employeeList: async(root: any, { paging }: any, { connection }: IContext) => {
            console.log('root', root)
            const items: Employee[] = await connection.manager.find(Employee)

            const facets = facetExtractor(items, EMPLOYEE_FACET_FIELDS)

            const paginatedItems = paginateResults(items, paging)

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
