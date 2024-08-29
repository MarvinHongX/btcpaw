export default defineEventHandler(async (event: any) => {
    const config  = useRuntimeConfig();
    const apiBase: string = config.public.apiBase3;
    const transactionId: string = event.context.params.transactionId;
    const url: string = `${apiBase}/tx/${transactionId}`;
    const response: any = await $fetch(url);

    return response;
})