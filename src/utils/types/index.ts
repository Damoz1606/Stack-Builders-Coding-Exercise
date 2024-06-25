export interface Item {
    id: number;
    delete: boolean;
    type: "job" | "story" | "comment" | "poll" | "pollopt";
    by: string;
    time: number;
    text: string;
    dead: boolean;
    parent: number;
    pool: number;
    kids?: number[];
    url: string;
    score: number;
    title: string;
    parts: number[];
    descendants: number;
}