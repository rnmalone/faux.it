import {StoredFilters} from "../modules/filters/filters";

export default function buildFacetInputFromFilters(filters: StoredFilters) {
    return Object.entries(filters).reduce((a, [category, selected]) => [
        ...a,
        {category, selected}
    ], [])
}
