import {IContext} from "../server";
import {IListQueryInput} from "./employee";
import {Sale} from "../entities";

const saleResolver = {
    Query: {
        saleList: async (root: any, {term, paging, sort: sortInput, facets: facetInput}: IListQueryInput, {connection}: IContext) => {
            let items = await connection
                .getRepository(Sale)
                .createQueryBuilder('sale')
                .innerJoinAndMapOne('sale.employee', 'employee', 'employee', 'employee.id = sale.employeeId')
                .getMany()
            
            return {
                count: items.length,
                items,
                // @ts-ignore
                facets: []
            }
        }
    }
}

export default saleResolver
