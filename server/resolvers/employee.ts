import Employee, {EmployeeDTO} from "../entities/Employee";
import Location from "../entities/Location";
import {IContext} from "../server";
import {applySearchTermToItems, facetExtractor, filterResults, paginateResults} from "../lib";
import {Sale} from "../entities";
import {sort} from "../lib/sorters";
import {ISortInput} from "../@types/SortInput";
import {IPagingInput} from "../@types/Paging";
import {IFacetInput} from "../@types/Facet";

const EMPLOYEE_FACET_FIELDS: (keyof Partial<EmployeeDTO>)[] = [
    'division',
    'jobTitle',
    'locationId'
]

const EMPLOYEE_SEARCHABLE_FIELDS: (string | string[])[] = [
    'firstName',
    'lastName',
    'email',
    'division',
    'jobTitle',
    'locationId',
    ['location', 'address'],
]

export interface IEmployeeListQueryInput {
    term?: string;
    sort: ISortInput,
    paging: IPagingInput,
    facets: IFacetInput[]
}

const employeeResolver = {
    Query: {
        employeeList: async (root: any, {term, paging, sort: sortInput, facets: facetInput}: IEmployeeListQueryInput, {connection}: IContext) => {
            const builder = connection
                .getRepository(Employee)
                .createQueryBuilder("employee")
                .innerJoinAndMapOne('employee.location', 'Location', 'location', 'location.id = employee.locationId')


            let items: Employee[] = await builder.getMany()

            if (facetInput) {
                items = filterResults(items, facetInput)
            }

            if(term) {
                items = applySearchTermToItems(items, term, EMPLOYEE_SEARCHABLE_FIELDS)
            }

            const facets = facetExtractor(items, EMPLOYEE_FACET_FIELDS)

            const sorted = sort(items, 'lastName', sortInput?.type, sortInput?.direction)

            const paginatedItems = paginateResults(sorted, paging)

            return {
                count: items.length,
                items: paginatedItems,
                facets
            }
        },

        employee: async (root: any, {id,}: any, {connection}: IContext) => {
            const employee = await connection
                .getRepository(Employee)
                .createQueryBuilder("employee")
                .where('Employee.id = :id', {id})
                .getOne()

            if (!employee) {
                //TODO error handle

                return {}
            }

            const sales = await connection
                .getRepository(Sale)
                .createQueryBuilder('sale')
                .where('Sale.employeeId = :id', {id})
                .getMany();

            employee.sales = sales

            return employee
        }
    }
}

export default employeeResolver
