export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.apiBasePrice as string;
    const url: string = `${apiBase}/products/BTC-USD/stats`;
    const response: any = await $fetch(url);
    
    return response;
})