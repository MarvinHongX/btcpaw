export const rpcRequest = async (method: string, params: any[] = []): Promise<any> => {
    const config = useRuntimeConfig();
    const apiBase: string = config.public.apiBaseRpc;
    const rpcUser: string = config.public.rpcUser;
    const rpcPassword: string = config.public.rpcPassword;

    const body = {
        jsonrpc: "1.0",
        id: "curltext",
        method: method,
        params: params
    };

    return await $fetch(apiBase, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${rpcUser}:${rpcPassword}`)
        }
    });
};
