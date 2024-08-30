export const getBtcPrice = (
    btcPrice: Ref<number>,
    btcPriceChangePercentage: Ref<number>,
    loading12: Ref<boolean>, 
): void => {
    $fetch('/api/price')
        .then((response: any) => {
            btcPrice.value = response.quotes.USD.price;
            btcPriceChangePercentage.value = response.quotes.USD.market_cap_change_24h;
            if (loading12.value) loading12.value = false;
        })
        .catch(error => {
            console.error('Error fetching btc price:', error);
        });    
};


export const getLatestBlockAndSaveToLocalStorage = (
    key: string
): Promise<boolean> => {
    return $fetch('/api/block/latest')
        .then((response: any) => {
            localStorage.setItem(key, JSON.stringify(response));
            return true;
        })
        .catch(error => {
            console.error('Error fetching latest block:', error);
            return false;
        });
};


export const getLatestBlockFromLocalStorage = (
    latestBlock: Ref<Block | null>, 
    loading1: Ref<boolean>, 
    localStorageKey: string
): boolean => {
    const data: string | null = localStorage.getItem(localStorageKey);
    if (data) {
        const parsedData: any = JSON.parse(data);
        if (JSON.stringify(latestBlock.value) !== JSON.stringify(parsedData)) {
            latestBlock.value = parsedData;
            if (loading1.value) loading1.value = false;
            return true; 
        }
    }
    return false;
};

export const getLatestBlocks = (
    tableParams: Ref<TableParams>, 
    loading2: Ref<boolean>, 
    blocks: Ref<Block[]>,
): void => {
    const { currentPage, pageSize, totalRecords } = tableParams.value;
    const start: number = Math.max(totalRecords - (currentPage * pageSize) + 1, 1);
    const end: number = totalRecords - ((currentPage - 1) * pageSize);

    if (start && end) {
        $fetch(`/api/lightblocks?start=${start}&end=${end}`)
            .then((response: any[]) => {
                response.sort((a: any, b: any) => b.height - a.height);
                blocks.value = response;
                if (loading2.value) loading2.value = false;
            })
            .catch(error => {
                console.error('Error fetching Latest blocks:', error);
            });
    }
};



export const getLatestTransactions = (
    tableParams: Ref<TableParams>, 
    latestBlock: Ref<Block | null>, 
    loading3: Ref<boolean>, 
    transactions: Ref<any>
): void => {
    if (latestBlock.value && 
        latestBlock.value.height
    ) {
        const { pageSize } = tableParams.value;
        transactions.value = latestBlock.value.tx
            .slice(0, pageSize)
            .map((txid: any, index: number) => ({
                index: index,
                txid: txid,
                blockHeight: latestBlock.value.height,
                time: latestBlock.value.time,
                sortNo: `${latestBlock.value.height}-${index}`,
            }));

        if (loading3.value) loading3.value = false;
    }
};





export const fetchBlocksForPage = (tableParams: Ref<TableParams>, loading2: Ref<boolean>, blocks: Ref<Block[]>): void => {
    const { currentPage, pageSize, totalRecords } = tableParams.value;
    const start: number = Math.max(totalRecords - (currentPage * pageSize) + 1, 1);
    const end: number = totalRecords - ((currentPage - 1) * pageSize);

    if (start && end) {
        $fetch(`/api/lightblocks?start=${start}&end=${end}`)
            .then((response: any) => {
                response.sort((a: any, b: any) => b.height - a.height);
                blocks.value = response;
                if (loading2.value) loading2.value = false;
                return true;
            })
            .catch(error => {
                console.error('Error fetching blocks:', error);
                return false;
            });
    }
};


export const getBlockAndTransactions = (
    blockHeightOrHash: Ref<string>,
    loading5: Ref<boolean>,
    loading3: Ref<boolean>,
    block: Ref<Block | null>,
    transactions: Ref<Transaction[]>,
): void => {
    if (blockHeightOrHash.value) {
        const heightOrHash: string = blockHeightOrHash.value;
        $fetch(`/api/block/${heightOrHash}`)
            .then((response: any) => {
                block.value = response;
                if (loading5.value) loading5.value = false;
                transactions.value = response.tx.map((transaction: any, index: number) => {
                    return {
                        index: index + 1,
                        transactionId: transaction,
                        blockHeight: response.height,
                        timestamp: response.time,
                        sortNo: `${response.height}-${transaction.index}`,
                    };
                });
                if (loading3.value) loading3.value = false;

            })
            .catch(error => {
                console.error('Error fetching block, transactions :', error);
                return false;
            });
    }
};


export const getNetworkPools = (
    loading17: Ref<boolean>, 
    networkHashRate: Ref<DoughnutChart>
): void => {
    const COLORS = [
        'rgba(255, 99, 132, 0.8)', // 빨
        'rgba(255, 159, 30, 0.8)', // 주
        'rgba(255, 205, 86, 0.8)', // 노
        'rgba(54, 192, 54, 0.5)', // 초
        'rgba(10, 10, 255, 0.4)', // 파
        'rgba(0, 0, 128, 0.4)', // 남
        'rgba(128, 0, 128, 0.4)', // 보
        'rgba(128, 0, 128, 0.3)', // 보
        'rgba(128, 0, 128, 0.2)', // 보
        'rgba(128, 0, 128, 0.1)', // 보
    ];
    
    $fetch('/api/info/pools')
        .then((response: any) => {
            const responseData = response || [];

            const sortedData = responseData.map((item: any) => ({
                label: item.x,
                value: parseFloat(item.y)
            })).sort((a: any, b: any) => b.value - a.value);
                        
            const labels: string[] = sortedData.map((item: any) => item.label);
            const data: number[] = sortedData.map((item: any) => item.value);
            const backgroundColor: string[] = sortedData.map((_: any, index: number) => COLORS[index] || COLORS[COLORS.length - 1]);

            const doughnutChartData: DoughnutChart = {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Pools',
                        data: data,
                        fill: false,
                        backgroundColor: backgroundColor,
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        tension: 0.4
                    }
                ]
            };

            networkHashRate.value = doughnutChartData;
            if (loading17.value) loading17.value = false;
        })
        .catch(error => {
            console.error('Error fetching daily pools:', error);
        });
};

export const getNetworkHashRate = (
    loading16: Ref<boolean>, 
    networkHashRate: Ref<LineChart>
): void => {
    $fetch('/api/info/hashrates')
        .then((response: any) => {
            const responseData = response.values || [];
            const labels: string[] = responseData.map((item: any) => formatTimestampYYYYMMDD(item.x));
            const hashrate: number[] = responseData.map((item: any) => parseFloat(item.y) / 1.0);

            const lineChartData: LineChart = {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Hash Rate',
                        data: hashrate,
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: 0.4
                    }
                ]
            };
            networkHashRate.value = lineChartData;
            if (loading16.value) loading16.value = false;
        })
        .catch(error => {
            console.error('Error fetching daily hashrate:', error);
        });
};


export const getTransaction = (
    transactionId: Ref<string>, 
    loading7: Ref<boolean>, 
    transaction: Ref<Transaction | null>, 
): void => { 
    if (transactionId.value) {
        const id: string = transactionId.value;

        $fetch(`/api/transaction/${id}`)
            .then((response: any) => {
                transaction.value = {
                    txid: response.txid,
                    hash: response.hash,
                    size: response.size,
                    weight: response.weight,
                    vin: response.vin,
                    vout: response.vout,
                    fee: response.fee,
                    blockHash: response.blockhash,
                    time: response.time,
                };
                if (loading7.value) loading7.value = false;
            })
            .catch(error => {
                console.error('Error fetching transaction:', error);
                return false;
            });

    }
};


export const getAccount = (
    address: Ref<string>, 
    loading10: Ref<boolean>, 
    account: Ref<Account | null>,
): void => {
    if (address.value) {
        const addr: string = address.value;
        $fetch(`/api/account/${addr}`)
            .then((response: any) => {
                account.value = response;
                if (loading10.value) loading10.value = false;
            })
            .catch(error => {
                console.error('Error fetching account:', error);
                return false;
            });
    }
};


export const getBtcInfo = (
    loading18: Ref<boolean>, 
    btcInfo: Ref<BtcInfo | null>
): void => {
    $fetch(`/api/info/hashrate`)
        .then((response: any) => {
            const hashRate = Number(response);

            if (isNaN(hashRate)) {
                throw new Error('Response is not a valid number');
            }

            btcInfo.value = {
                hashRate,
            };
            if (loading18.value) loading18.value = false;
        })
        .catch(error => {
            console.error('Error fetching hashrate:', error);
            return false;
        });
};