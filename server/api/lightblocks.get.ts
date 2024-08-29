const fetchWithRetry = async (url: string, retries: number = 5, delay: number = 1000): Promise<any> => {
    let lastError: any;
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await $fetch(url);
        } catch (error) {
            lastError = error;
            if (attempt < retries - 1) {
            await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    throw lastError; 
};

export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase3;
    const query = getQuery(event);

    const startBlockHeight = parseInt(query.start as string, 10);
    const endBlockHeight = parseInt(query.end as string, 10);
    
    const responses: any[] = [];

    if (isNaN(startBlockHeight) || isNaN(endBlockHeight) || startBlockHeight > endBlockHeight) {
        return [];
    }

    const blockHeights = Array.from({ length: endBlockHeight - startBlockHeight + 1 }, (_, i) => startBlockHeight + i);

    const blockPromises = blockHeights.map(async (blockHeight: number) => {
        const blockUrl: string = `${apiBase}/block/header/${blockHeight}`;
        try {
            const data = await fetchWithRetry(blockUrl);
            return data;
        } catch (error) {
            console.error(`Failed to fetch light block ${blockHeight} after retries:`, error);
            return { blockHeight, error: `Failed to fetch light block ${blockHeight}` };
        }
    });

    const results = await Promise.all(blockPromises);

    return results.flat();
})