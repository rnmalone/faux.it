import {IFacetInput} from "../@types/Facet";

export default function filterResults<T>(items: T[], facets: IFacetInput[],): T[] {

    return items.filter((item) => facets
        // @ts-ignore
        .every((facet: IFacetInput) => facet.selected.length ? facet.selected.some((facetValue: string) => item[facet.category] === facetValue) : true)
    );
}
