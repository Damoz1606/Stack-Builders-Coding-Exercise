import { endpoints } from "@/utils/endpoints";
import { get } from "@/utils/fetcher";
import { Item } from "@/utils/types";

export async function GET() {
    try {
        const hackerNewsItems: Item[] = await get<Item[]>(endpoints.NEW_STORIES);
        const hackerNewsEntries: Item[] = hackerNewsItems.slice(0, 30);

        const lessOrEqualToFive: Item[] = hackerNewsEntries.filter(e => e
            .title
            .replace(/[^\w\s]/gm, "")
            .replace(/\s+/g, " ")
            .split(/\s+/g)
            .length >= 5);
        const orderedByPoints: Item[] = lessOrEqualToFive.sort((a, b) => a.score - b.score);

        return orderedByPoints;
    } catch (error) {

    }
}