import {IContext} from "../server";
import {IListQueryInput} from "./employee";

const search = {
    Query: {
        searchSuggestions: async (root: any, { term }: { term: string }, {connection}: IContext) => {

        }
    }
}

export default search;
