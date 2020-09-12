export interface IFacet {
    value: string,
    count: number
}

export interface IFacetResult {
    category: string;
    items: IFacet[]
}

export type ResultFacets = IFacetResult[]
