This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# First thing of note is that I commented as much of the code as I could to explain what each line I wrote did to make it easier to understand. Anything I didn't comment was probably generated from the Next.js create-next-app command used to well... setup the Next.js project.

## First, install the node modules:
```bash
npm install
```

## Then run the development server:

```bash
npm run dev
```

### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### You will see the integers that go on infinitely. As you scroll down, more are infinitely generated!

#### Now to get into some of the things I did to make this project work.
- I set up the Next.js project
- Added my own custom eslint rules (I love myself some eslint!)
- I added a QueryProvider component to provide the QueryClient to the entire application
- Updated layout.js to include the QueryProvider
- Implemented the get route to the api folder to generate the integers
- Implemented the page.js. I used the useInfiniteQuery from @tanstack/react-query to fetch the integers infinitely. I used the useVirtualizer from @tanstack/react-virtual to render the virtualized list.