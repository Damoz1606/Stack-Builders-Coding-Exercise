import { crawl } from "@/utils/crawl";
import { endpoints } from "@/utils/endpoints";
import { Item } from "@/utils/types";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const items = await crawl(endpoints.WEB_STORIES);
        const usefullItems = items.slice(0, 30);

        const lessOrEqualToFive: Item[] = usefullItems.filter(e => e
            .title
            .replace(/[^\w\s]/gm, "")
            .replace(/\s+/g, " ")
            .split(/\s+/g)
            .length >= 5);
        const orderedByPoints: Item[] = lessOrEqualToFive.sort((a, b) => a.points - b.points);

        return NextResponse.json(orderedByPoints, { status: 200 });
    } catch (error) {
        console.error(error);
    }
}