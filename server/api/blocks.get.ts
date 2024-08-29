export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase3;
    const query = getQuery(event);

    const startBlockHeight = parseInt(query.start as string, 10);
    const endBlockHeight = parseInt(query.end as string, 10);

    if (isNaN(startBlockHeight) || isNaN(endBlockHeight) || startBlockHeight > endBlockHeight) {
        return [];
    }

    const blockHeights = Array.from({ length: endBlockHeight - startBlockHeight + 1 }, (_, i) => startBlockHeight + i);
    
    const fetchBlockData = async (blockHeight: number) => {
        const url: string = `${apiBase}/block/${blockHeight}`;
        try {
            const response: any = await $fetch(url);
            if (response) {
                return response;
            }
        } catch (error) {
            console.error(`Failed to fetch block ${blockHeight}:`, error);
        }
        return [];
    };
    const results = await Promise.all(blockHeights.map(fetchBlockData));

    return results.flat();
})