This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API
Here you can find two APIs that manage the given instructions.

Open [http://localhost:3000/api/news/first](http://localhost:3000/api/news/first) with your browser, this will open an array of stories that fits the given instruction: 
- `Filter all previous entries with more than five words in the title ordered by the number of comments first.`

Open [http://localhost:3000/api/news/second](http://localhost:3000/api/news/second) with your browser, this will open an array of stories that fits the given instruction: 
- `Filter all previous entries with less than or equal to five words in the title ordered by points.`

## Application

Open [http://localhost:3000](http://localhost:3000) with your browser, this will shows an screen that will load the data from the API. The application have two buttons:
- First option
- Second option
Each button have a tooltip that describe its purpose.


### Hooks
#### useFetch
This custom hook works in the client side, will give a layer to use the fetch api without problem, givin the posibility to manage responses and errors as states.

#### useList
This custom hook works in the client side, will help to manage list, by providing methods that allows to override data, update an item by a given key, append items, or remove data by a given key.


## External libraries
### Mantine UI
Used for the UI to increase the develop of the frontend
### cheerios
Used for crawing the web of [https://news.ycombinator.com/news](https://news.ycombinator.com/news)