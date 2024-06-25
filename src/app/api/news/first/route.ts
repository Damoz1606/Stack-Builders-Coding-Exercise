import { endpoints } from "@/utils/endpoints";
import { get } from "@/utils/fetcher";
import { Item } from "@/utils/types";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const ids: number[] = await get<number[]>(endpoints.NEW_STORIES);
        const slicedIds: number[] = ids.slice(0, 30);
        const processIds = async (id: number) => await get<Item>(endpoints.STORY(id));
        const hackerNewsItems: Item[] = await Promise.all(slicedIds.map(processIds));

        const orderedByComments: Item[] = hackerNewsItems.sort((a, b) => (a.kids?.length || 0) - (b.kids?.length || 0));
        const moreThanFiveWords: Item[] = orderedByComments.filter(e => e.title.length > 5);

        return NextResponse.json(moreThanFiveWords, { status: 200 });
    } catch (error) {
        console.error(error);
    }
}