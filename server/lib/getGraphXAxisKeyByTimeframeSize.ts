export default function getGraphXAxisKeyByTimeframeSize(days: number): string {
    const YEAR = 365;
    if (days > YEAR) {
        return 'Q - YYYY'
    }

    if (days > YEAR * 1.2 || days < YEAR * 0.4) {
        return 'MMM - YYYY'
    }

    if (days > 31) {
        return 'Week - ww'
    }

    return ('dd - MMM')
}