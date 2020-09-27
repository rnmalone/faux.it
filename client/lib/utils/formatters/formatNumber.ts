export default function formatNumber(num: number = 0) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}