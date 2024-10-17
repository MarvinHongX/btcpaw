export default defineEventHandler(async (event: any) => {
    const blockHashResponse: any = await rpcRequest("getbestblockhash");
    const latestBlockHash = blockHashResponse.result;

    const response: any = await rpcRequest("getblock", [latestBlockHash]);

    return response.result;
});
