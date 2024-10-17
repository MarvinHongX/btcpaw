export default defineEventHandler(async (event: any) => {
    const response: any = await rpcRequest("getmininginfo");

    return response.result.networkhashps;
})