export default defineEventHandler(async (event: any) => {
    const blockchainInfo: any = await rpcRequest("getblockchaininfo");
    const latestBlockHeight = blockchainInfo.result?.blocks;

    const blockHashResponse: any = await rpcRequest("getblockhash", [latestBlockHeight]);
    const latestBlockHash = blockHashResponse.result;

    const response: any = await rpcRequest("getblock", [latestBlockHash]);

    return response.result;
});
