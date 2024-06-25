import { endpoints } from "@/utils/endpoints";
import { get } from "@/utils/fetcher";
import { Item } from "@/utils/types";

export async function GET() {
    try {
        const hackerNewsItems: Item[] = await get<Item[]>(endpoints.NEW_STORIES);
        const hackerNewsEntries: Item[] = hackerNewsItems.slice(0, 30);

        const orderedByComments: Item[] = hackerNewsEntries.sort((a, b) => a.kids.length - b.kids.length);
        const moreThanFiveWords: Item[] = orderedByComments.filter(e => e.title.length > 5);

        return moreThanFiveWords;
    } catch (error) {

    }
}