export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase3;
    const query = getQuery(event);
    const url: string = `${apiBase}/api/mining/miner-summary?since=1d`;
    const response: any = await $fetch(url);

    const transformedData = Object.values(response.miners).map((miner: any) => ({
        x: miner.name,
        y: miner.totalWeight
    }));

    return transformedData;
})