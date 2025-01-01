export async function GET(req){
    // Extract the query parameters from the request URL
    const {searchParams} = new URL(req.url);
    // Parse the query string to get the page and limit parameters
    const page = parseInt(searchParams.get("page") || "1");
    // Default to 20 items per page if no limit is provided
    const limit = parseInt(searchParams.get("limit") || "20");
    const start = (page - 1) * limit;
    // Generate an array of integers starting from the start value
    const data = Array.from({length: limit}, (_, i) => start + i + 1);
    // Return the array of integers along with the next page number
    return new Response(
        JSON.stringify({data, nextPage: page + 1}),
        {status: 200, headers: {"Content-Type": "application/json"}}
    );
}