export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBase as string;
    const url: string = `${apiBase}/mining/miner-summary?since=1d`;
    const response: any = await $fetch(url);

    const transformedData = Object.values(response.miners).map((miner: any) => ({
        x: miner.name,
        y: miner.totalWeight
    }));

    return transformedData;
})