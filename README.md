# Nest.js Web Crawler Exercise

This is a [Next.js](https://nextjs.org/) project.

## Local Installation

Clone this repository, and run de following commands:

```bash
npm install
npm run dev
```

After that open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Web Deployment

Open [https://stack-builders-coding-exercise.vercel.app/](https://stack-builders-coding-exercise.vercel.app/) in your browser to see the result on the web.

## API

Here you can find two APIs that manage the given instructions.

- Open [http://localhost:3000/api/news/first](http://localhost:3000/api/news/first) in your browser. This will open an array of stories that fits the given instruction:

    - `Filter all previous entries with more than five words in the title ordered by the number of comments first.`

- Open [http://localhost:3000/api/news/second](http://localhost:3000/api/news/second) in your browser. This will open an array of stories that fits the given instruction:

    - `Filter all previous entries with less than or equal to five words in the title ordered by points.`

#### Returned object

The object that the API will return is an array of `Item` objects, which have the following structure:

```bash
{
    number: number;
    title: string;
    points: number;
    comments: number;
}
```

## Application

Open [http://localhost:3000](http://localhost:3000) in your browser. This will display a screen that will load data from the API. The application has two buttons:

- First option
- Second option

Each button has a tooltip that describes its purpose. Each purpose is linked to the respective statement.

### Custom Hooks

#### useFetch

This custom hook works on the client side. It provides a layer to use the fetch API without issues, giving the possibility to manage responses and errors as states.

#### useList

This custom hook works on the client side. It helps to manage lists by providing methods that allow overriding data, appending items, and updating and removing data by a given key.

## External libraries

### Mantine UI

Used for the UI to enhance the development of the frontend.

### cheerios

Used for crawing the web of [https://news.ycombinator.com/news](https://news.ycombinator.com/news).

### tabler

Library that provides icons for React.