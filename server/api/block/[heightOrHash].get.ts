export default defineEventHandler(async (event: any) => {
    const heightOrHash: string = event.context.params.heightOrHash;

    let blockHash: string;

    if (!isNaN(Number(heightOrHash))) {
        const blockHashResponse: any = await rpcRequest("getblockhash", [Number(heightOrHash)]);
        blockHash = blockHashResponse.result;
    } else {
        blockHash = heightOrHash;
    }

    const response: any = await rpcRequest("getblock", [blockHash]);

    return response.result;
});
