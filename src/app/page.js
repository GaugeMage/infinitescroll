"use client";

import {useInfiniteQuery} from "@tanstack/react-query";
import {useVirtualizer} from "@tanstack/react-virtual";
import axios from "axios";
import {useRef} from "react";

// constants for you to play around with
// The number of integers to fetch per page
const integerLimit = 20;
const listHeight = "800px";
const listWidth = "600px";

export default function Home() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["integers"],
        queryFn: async({pageParam = 1}) => {
            // Calls the /api/integers route with the page and limit query parameters
            const res = await axios.get(`/api/integers?page=${pageParam}&limit=${integerLimit}`);
            return res.data;
        },
        getNextPageParam: (lastPage) => lastPage.nextPage
    });

    const allIntegers = data?.pages.flatMap((page) => page.data) || [];
    const parentRef = useRef();

    // Create a virtualizer instance which will manage the rendering of our list
    // The virtualizer will only render the items that are currently visible on the screen
    const rowVirtualizer = useVirtualizer({
        // The total number of items in the list
        count: hasNextPage ? allIntegers.length + 1 : allIntegers.length,
        getScrollElement: () => parentRef.current,
        // The size of each item in the list
        estimateSize: () => 35
    });

    return (
        <>
            {/* Title */}
            <h1>Virtualized Infinite Scroll</h1>
            {/* Render the virtualized list */}
            <div
                ref={parentRef}
                style={{
                    height: listHeight,
                    width: listWidth,
                    overflow: "auto"
                }}
                onScroll={() => {
                    const {scrollTop, scrollHeight, clientHeight} = parentRef.current;
                    // Load more data if we're at the bottom of the list
                    if(scrollHeight - scrollTop <= clientHeight + 50 && hasNextPage && !isFetchingNextPage){
                        fetchNextPage();
                    }
                }}
            >
                {/* Render the virtualized list */}
                <div style={{height: rowVirtualizer.getTotalSize(), position: "relative"}}>
                    {/* Map over the virtual items returned by the virtualizer */}
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    // Check if the row is loading
                        const isLoadingRow = virtualRow.index >= allIntegers.length;
                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: "absolute",
                                    top: virtualRow.start,
                                    left: 0,
                                    width: "100%",
                                    height: virtualRow.size
                                }}
                            >
                                {/*//Using my favorite ternary operator to check if the row is loading*/}
                                {isLoadingRow
                                    ? hasNextPage
                                        ? "Loading more data..."
                                        : "No more data somehow"
                                    : allIntegers[virtualRow.index]}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}