export default defineEventHandler(async (event: any) => {   
    const transactionId: string = event.context.params.transactionId;
    const response: any = await rpcRequest("getrawtransaction", [transactionId, true]);
    
    return response.result;
})