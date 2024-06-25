export const endpoints = {
    NEW_STORIES: "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty",
    STORY: (id: number) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
}