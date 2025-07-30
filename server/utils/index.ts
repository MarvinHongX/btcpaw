export const rpcRequest = async (method: string, params: any[] = []): Promise<any> => {
    const config = useRuntimeConfig();
    const rpcUrl: string = config.rpcUrl as string;
    const rpcUser: string = config.rpcUser as string;
    const rpcPassword: string = config.rpcPassword as string;

    const body = {
        jsonrpc: "1.0",
        id: "curltext",
        method: method,
        params: params
    };

    return await $fetch(rpcUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${rpcUser}:${rpcPassword}`)
        }
    });
};
