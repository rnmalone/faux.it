import {formatNumber} from "./index";

export default function price(value: number) {
    return `£ ${formatNumber(value)}`
}