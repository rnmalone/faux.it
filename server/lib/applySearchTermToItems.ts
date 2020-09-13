import Fuse from 'fuse.js';

export default function applySearchTermToItems<T>(items: T[], searchTerm: string, searchableFields: (string | string[])[], raw?: boolean) {
    const options = {
        includeScore: true,
        keys: searchableFields,
        threshold: 0.2,
        shouldSort: true,
        includeMatches: true
    }


    const fuse = new Fuse(items, options)
    const results = fuse.search(searchTerm)

    return raw ? results : results.map((result) => result.item)
}
