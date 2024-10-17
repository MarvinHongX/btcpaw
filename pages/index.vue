<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getBtcInfo, getNetworkHashRate, getNetworkPools, getLatestBlockFromLocalStorage, getLatestBlocks, getLatestTransactions } from '@/commons/commonService';
const { skyzoneUrl, aleocatUrl } = useCommonComputed();

const intervalId = ref<NodeJS.Timeout | null>(null);
const loading1 = ref<boolean>(true);
const loading2 = ref<boolean>(true);
const loading3 = ref<boolean>(true);
const loading16 = ref<boolean>(true);
const loading17 = ref<boolean>(true);
const loading18 = ref<boolean>(true);
const latestBlock = ref<Block | null>(null); 
const transactions = ref<Transaction[]>([]);
const blocks = ref<Block[]>([]);
const btcInfo = ref<BtcInfo | null>(null);
const tableParams = ref<TableParams>({
    currentPage: 1,
    pageSize: 6,
    totalRecords: 6
});


const networkHashRate = ref<LineChart>({
        labels: ['label'],
        datasets: [
          {
            label: 'Hash Rate',
            data: [1],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
          },
        ]
      });

const networkPools = ref<DoughnutChart>({
        labels: ['label'],
        datasets: [
          {
            label: 'Pools',
            data: [1],
            fill: false,
            backgroundColor: [],
            borderColor: '#2f4860',
            tension: 0.4
          },
        ]
      });


const labels = useLabels();
const loadingState = useLoadingState();
const elapsedTime = useLatestBlockElapsedTime();
const { LATEST_BLOCK_KEY, INTERVAL_THRESHOLD } = useCommonConstant();


const intervalAction = () => {
    if (getLatestBlockFromLocalStorage(latestBlock, loading1, LATEST_BLOCK_KEY)) {
        tableParams.value.totalRecords = latestBlock.value?.height ?? 1;
        getLatestBlocks(tableParams, loading2, blocks);
        getLatestTransactions(tableParams, latestBlock, loading3, transactions);
    }
}

onMounted(() => {
    getBtcInfo(loading18, btcInfo);
    intervalAction();
    getNetworkHashRate(loading16, networkHashRate);
    getNetworkPools(loading17, networkPools);
    intervalId.value = setInterval(intervalAction, INTERVAL_THRESHOLD);
});

onBeforeUnmount(() => {
    clearInterval(intervalId.value ?? undefined); 
});

</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState"> {{ labels.latestBlock }} </span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >{{ latestBlock?.height.toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState"> {{ labels.timestamp }} </span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >{{ elapsedTime }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState">{{ labels.hashrate }}</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading18"
                            >{{ formatHashRate(btcInfo?.hashRate) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3" v-if="!loadingState">{{ labels.difficulty }}</span>
                        <div class="text-900 font-medium text-xl" v-if="!loading1"
                            >{{ latestBlock?.difficulty.toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <span>
                        <h5 v-if="!loadingState"> {{ labels.latestBlocks }} </h5>
                    </span>
                    <NuxtLink to="/blocks">
                        <span class="p-input-icon-left mb-1 text-500 font-medium"> {{ labels.more }}&nbsp;> </span>
                    </NuxtLink>  
                </div>
                <DataTable 
                    :value="blocks" 
                    lazy 
                    :rows="tableParams.pageSize"
                    :totalRecords="tableParams.totalRecords"
                    showGridlines
                    dataKey="hash"
                    :sortField="'height'"
                    :sortOrder="-1" 
                    responsiveLayout="scroll"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column field="height" dataType="numeric" style="width: 15%">
                        <template #header v-if="!loadingState"> {{ labels.height }} </template>
                        <template #body="{ data }">
                            <NuxtLink class="text-blue-600" v-if="data.height" :to="'/block/' + data.height">
                                <span>{{ data.height.toLocaleString() }}</span>
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column field="hash"  style="width: 15%">
                        <template #header v-if="!loadingState"> {{ labels.hash }} </template>
                        <template #body="{ data }">
                            <div class="data-non-shorten-650">
                                {{ data.hash }}
                            </div>
                            <div class="data-shorten-650">
                                {{ shortenStr(data.hash) }}
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <span>
                        <h5 v-if="!loadingState"> {{ labels.latestTransactions }} </h5>
                    </span>
                </div>
                <DataTable 
                    :value="transactions" 
                    lazy 
                    :rows="tableParams.pageSize"
                    :totalRecords="tableParams.totalRecords"
                    showGridlines
                    dataKey="txid"
                    :sortField="'sortNo'"
                    :sortOrder="-1" 
                    responsiveLayout="scroll"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading v-if="!loadingState"> {{ labels.loading }} </template>
                    <Column style="width: 15%">
                        <template #header v-if="!loadingState"> {{ labels.transactionId }}  </template>
                        <template #body="{ data }">
                            <NuxtLink v-if="data.txid" :to="'/transaction/' + data.txid" rel="noopener">
                                <div class="text-blue-600 data-non-shorten-650">
                                    {{ data.txid }}
                                </div>
                                <div class="text-blue-600 data-shorten-650">
                                    {{ shortenStr(data.txid) }}
                                </div>
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column style="width: 15%">
                        <template #header v-if="!loadingState"> {{ labels.inBlock }} </template>
                        <template #body="{ data }">
                            {{ data.blockHeight.toLocaleString() }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card" v-if="!loading16">
                <h5 v-if="!loadingState">{{ labels.networkHashrate }}</h5>
                <Chart type="line" :data="networkHashRate" />
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card" v-if="!loading17">
                <h5 v-if="!loadingState">{{ labels.networkMiners }}</h5>
                <Chart type="doughnut" :data="networkPools"/>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div
                class="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                style="border-radius: 1rem; background-color:#1076e5;"
                v-if="!loadingState"
            >
                <div class="flex flex-column">
                    <img :src="skyzoneUrl" alt="skyzone" height="90" class="mr-2" />
                </div>
                <div class="px-4 py-4 flex flex-row justify-content-center">
                    <a href="https://theskyzone.net" target="_blank" class="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised"> {{ labels.getStarted}} </a>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div
                class="px-4 py-5 shadow-2 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                style="border-radius: 1rem; background-color:#f3f2e9;"
                v-if="!loadingState"
            >
                <div class="flex flex-column">
                    <img :src="aleocatUrl" alt="aleocat" height="90" class="mr-2" />
                </div>
                <div class="px-4 py-4 flex flex-row justify-content-center">
                    <a href="https://aleocat.com" target="_blank" class="p-button font-bold px-5 py-3 p-button-info p-button-rounded p-button-raised"> {{ labels.getStarted}} </a>
                </div>
            </div>
        </div>
    </div>
</template>