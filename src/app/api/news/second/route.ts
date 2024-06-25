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

        const lessOrEqualToFive: Item[] = hackerNewsItems.filter(e => e
            .title
            .replace(/[^\w\s]/gm, "")
            .replace(/\s+/g, " ")
            .split(/\s+/g)
            .length >= 5);
        const orderedByPoints: Item[] = lessOrEqualToFive.sort((a, b) => a.score - b.score);

        return NextResponse.json(orderedByPoints, { status: 200 });
    } catch (error) {
        console.error(error);
    }
}