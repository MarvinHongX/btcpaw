export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBasePrice;
    const url: string = `${apiBase}/tickers/btc-bitcoin`;
    const response: any = await $fetch(url);
    
    return response;
})