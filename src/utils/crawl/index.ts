'use server'

import * as cheerio from "cheerio";
import { get } from "../fetcher";
import { Item } from "../types";

/**
 * Analize the web and retrive the necessary elements
 * @param url 
 * @returns 
 */
export async function crawl(url: string): Promise<Item[]> {
    try {
        const data = await get<string>(url, { responseType: 'text' });
        const $ = cheerio.load(data);

        const items: Item[] = [];

        $('.athing').each((_, element) => {
            const title = $(element).find('.titleline a').text();
            const rank = $(element).find('.rank').text();

            const subtextElement = $(element).next().find('.subtext');
            const points = subtextElement.find('.score').text();

            const commentsText = subtextElement.find('a').last().text();
            const comments = commentsText.includes('comment') ? commentsText : '0 comments';

            const item: Item = {
                title: title,
                number: parseInt(rank),
                points: parseInt(points.replace(' points', '')) || 0,
                comments: parseInt(comments.replace(' comments', '')) || 0
            }

            items.push(item);
        });

        return items;

    } catch (error) {
        throw error;
    }

}