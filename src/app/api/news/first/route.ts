import { crawl } from "@/utils/crawl";
import { endpoints } from "@/utils/endpoints";
import { get } from "@/utils/fetcher";
import { Item } from "@/utils/types";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const items = await crawl(endpoints.WEB_STORIES);
        const usefullItems = items.slice(0, 30);

        const orderedByComments: Item[] = usefullItems.sort((a, b) => (a.comments || 0) - (b.comments || 0));
        const moreThanFiveWords: Item[] = orderedByComments.filter(e => e.title.length > 5);

        return NextResponse.json(moreThanFiveWords, { status: 200 });
    } catch (error) {
        console.error(error);
    }
}