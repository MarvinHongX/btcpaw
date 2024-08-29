export const useCommonConstant = () => {
    return {
        LATEST_BLOCK_KEY: 'BTCPAW_LATEST_BLOCK' as const,
        LAYOUT_CONFIG_KEY: 'BTCPAW_LAYOUT_CONFIG' as const,
        INTERVAL_THRESHOLD: 1000 as const,
        LOADING_THRESHOLD: 30 as const,
    };
};
