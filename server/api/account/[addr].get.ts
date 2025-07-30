const fetchWithRetry = async (transactionId: string, retries: number = 5, delay: number = 1000): Promise<any> => {
  let lastError: any;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await rpcRequest("getrawtransaction", [transactionId, true]);
      return response.result;
    } catch (error) {
      lastError = error;
      if (attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
};


export default defineEventHandler(async (event) => {
  const config  = useRuntimeConfig();
  const apiBase: string = config.apiBase as string;
  const addr: string = event.context.params?.addr || '';
  const url: string = `${apiBase}/address/${addr}`;

  let response: TxResponse;
  if (addr === '') {
    return { error: `Failed to fetch address data for ${addr}` };
  }

  try {
    response = await $fetch(url) as unknown as { /* expected shape */ };
  } catch (error) {
    console.error(`Failed to fetch address data for ${addr}:`, error);
    return { error: `Failed to fetch address data for ${addr}` };
  }

  if (response?.txHistory?.txids) {
    const txids: string[] = response.txHistory.txids;

    // Create an array of promises to fetch transaction details with retry logic
    const txPromises = txids.map(async (txid: string) => {
      try {
        const data = await fetchWithRetry(txid);
        return data;
      } catch (error) {
        console.error(`Failed to fetch transaction ${txid} after retries:`, error);
        return { txid, error: `Failed to fetch transaction ${txid}` };
      }
    });

    // Execute all promises in parallel
    response.tx = await Promise.all(txPromises);
  }

  return response;
});