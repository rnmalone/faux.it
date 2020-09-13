import {ISortInput} from "../@types/SortInput";
import {IFacetInput, ResultFacets} from "../@types/Facet";
import {filterResults} from "./index";
import applySearchTermToItems from "./applySearchTermToItems";
import facetExtractor from "./facetExtractor";
import {IPagingInput} from "../@types/Paging";
import paginateResults from "./paginateResults";
import {sort} from "./sorters";

export interface IResultsOptions<T> {
    sortInput?: ISortInput;
    searchableFields?: (string | string[])[];
    facetFields?: (keyof Partial<T>)[];
    facetInput?: IFacetInput[],
    searchTerm?: string,
    sortKey: keyof T
    paging: IPagingInput,
}

export interface IListResultsResponse<T> {
    items: T[]
    count: number
    facets: ResultFacets
}

export default class Results<T> {

    public items: T[] = []
    public facets: ResultFacets = []
    public count: number = 0;
    protected config: IResultsOptions<T>

    constructor(rawItems: T[], opts?: IResultsOptions<T>) {
        this.items = rawItems
        this.config = opts
    }

    private applyRequestFacets = () => {
        this.items = filterResults(this.items, this.config.facetInput)
    }

    private applySearchTerm = () => {
        this.items = applySearchTermToItems(this.items, this.config.searchTerm, this.config.searchableFields)
    }

    private sort = () => {
        this.items = sort(this.items, this.config.sortKey, this.config.sortInput?.type, this.config.sortInput?.direction)
    }

    private paginate = () => {
        this.items = paginateResults(this.items, this.config.paging)
    }

    public getResponseObject = (): IListResultsResponse<T> => {
        if(this.config.facetInput) {
            this.applyRequestFacets()
        }

        if(this.config.searchTerm) {
            this.applySearchTerm()
        }

        if(this.config.sortInput) {
            this.sort()
        }

        if(this.config.paging) {
            this.paginate()
        }

        return {
            items: this.items,
            count: this.items.length,
            facets: facetExtractor(this.items, this.config.facetFields)
        }
    }
}
