export default defineEventHandler(async (event: any) => {
    const query = getQuery(event);

    const startBlockHeight = parseInt(query.start as string, 10);
    const endBlockHeight = parseInt(query.end as string, 10);

    if (isNaN(startBlockHeight) || isNaN(endBlockHeight) || startBlockHeight > endBlockHeight) {
        return [];
    }

    const blockHeights = Array.from({ length: endBlockHeight - startBlockHeight + 1 }, (_, i) => startBlockHeight + i);
    
    const fetchBlockData = async (blockHeight: number) => {
        try {
            const blockHashResponse: any = await rpcRequest("getblockhash", [blockHeight]);
            const latestBlockHash = blockHashResponse.result;
        
            const response: any = await rpcRequest("getblock", [latestBlockHash]);

            if (response.result) {
                return response.result;
            }
        } catch (error) {
            console.error(`Failed to fetch block ${blockHeight}:`, error);
        }
        return [];
    };
    const responseResults = await Promise.all(blockHeights.map(fetchBlockData));

    return responseResults.flat();
})