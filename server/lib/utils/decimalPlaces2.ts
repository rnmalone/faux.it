export default function decimalPlaces2(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100
}