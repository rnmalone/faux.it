export default function rank(rank: number) {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = rank % 100;
        return rank + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}