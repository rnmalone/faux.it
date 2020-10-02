import {IFacet, ResultFacets} from "../../@types/Facet";

function extractUniqueValues<T>(items: T[], key: keyof T): IFacet[] {
    return items.reduce((a: IFacet[], item: T) => {
        const existingFacet = a.find((existing) => existing.value === String(item[key]))

        return existingFacet ?
            a.map((existing) => existing.value === String(item[key]) ? {
                ...existing,
                count: existing.count + 1
            } : existing) :
            [
                ...a,
                {
                    value: String(item[key]),
                    count: 1
                }
            ]
    }, [])
}

export default function facetExtractor<T>(items: T[], keys: (keyof T)[]): ResultFacets {
    return keys.reduce((a, key: keyof T) => [
        ...a,
        {
            category: key,
            items: extractUniqueValues(items, key)
        }
    ], [])
}
