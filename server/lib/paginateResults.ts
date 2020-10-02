import {IPagingInput} from "../../@types";

export default function paginateResults(items: any[], pagingInput: IPagingInput) {
    return items.slice(pagingInput.offset, pagingInput.limit)
}
