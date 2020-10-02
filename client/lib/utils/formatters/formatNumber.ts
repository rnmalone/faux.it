import { format } from 'd3-format'

export default function formatNumber(num: number = 0) {
    return format(".4s")(num);
}