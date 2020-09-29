import {IPagingInput} from "../@types/Paging";

export default function paginateResults(items: any[], pagingInput: IPagingInput) {
    return items.slice(pagingInput.offset, pagingInput.limit)
}
