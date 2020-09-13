import Employee, {EmployeeDTO} from "../entities/Employee";
import Location from "../entities/Location";
import {IContext} from "../server";
import {applySearchTermToItems, facetExtractor, filterResults, paginateResults, Results} from "../lib";
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

export interface IListQueryInput {
    term?: string;
    sort: ISortInput,
    paging: IPagingInput,
    facets: IFacetInput[]
}

const employeeResolver = {
    Query: {
        employeeList: async (root: any, {term, paging, sort: sortInput, facets: facetInput}: IListQueryInput, {connection}: IContext) => {
            const items = await connection
                .getRepository(Employee)
                .createQueryBuilder("employee")
                .innerJoinAndMapOne('employee.location', 'Location', 'location', 'location.id = employee.locationId')
                .getMany()

            const resultsBuilder = new Results(items, {
                facetFields: EMPLOYEE_FACET_FIELDS,
                searchableFields: EMPLOYEE_SEARCHABLE_FIELDS,
                sortInput,
                facetInput,
                searchTerm: term,
                sortKey: 'lastName',
                paging
            })

            return resultsBuilder.getResponseObject()
        },

        employee: async (root: any, { id }: { id: string }, { connection }: IContext) => {
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
