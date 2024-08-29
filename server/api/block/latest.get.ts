export default defineEventHandler(async (event: any) => {
    const config = useRuntimeConfig();
    const apiBase: string = config.public.apiBase3;
    const tipUrl: string = `${apiBase}/blocks/tip`;
    
    const initialResponse: any = await $fetch(tipUrl);
    const height: number = initialResponse.height;
    
    const url: string = `${apiBase}/block/${height}`;
    const response: any = await $fetch(url);
    
    return response;
});
