export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBase2 as string;
    const url: string = `${apiBase}/charts/hash-rate?timespan=100years&rollingAverage=1weeks&format=json`;
    
    const response: any = await $fetch(url);

    return response;
})