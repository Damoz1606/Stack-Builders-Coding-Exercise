export interface Item {
    /**
     * Rank from https://news.ycombinator.com/news story
     */
    number: number;
    /**
     * Title from https://news.ycombinator.com/news story
     */
    title: string;
    /**
     * Point from https://news.ycombinator.com/news story
     */
    points: number;
    /**
     * Comments from https://news.ycombinator.com/news story
     */
    comments: number;
}