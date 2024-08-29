<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBlockAndTransactions } from '@/commons/commonService';

const loading3 = ref<boolean>(true);
const loading5 = ref<boolean>(true);
const blockHeightOrHash = ref<string>('');
const block = ref<Block | null>(null);
const transactions = ref<Transaction[]>([]);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();


watch(() => route.params.blockHeightOrHash, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        blockHeightOrHash.value = newValue.toString();
        getBlockAndTransactions(blockHeightOrHash, loading5, loading3, block, transactions);
    }
});

onMounted(() => {
    blockHeightOrHash.value = route.params.blockHeightOrHash.toString();
    getBlockAndTransactions(blockHeightOrHash, loading5, loading3, block, transactions);
});


</script>

<template>
    <div class="grid"> 
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.block }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.height }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">{{ block?.height.toLocaleString() }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.blockHash }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <div class="data-non-shorten-950">
                            {{ block?.hash }}
                        </div>
                        <div class="data-shorten-950">
                            {{ shortenStr(block?.hash ?? '', 3, 20) }}
                        </div>
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.timestamp }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">{{ formatTimestamp(block?.time) }}</span>
                </div>
            </div>

            <div class="card">
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.previousBlockHash }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5"
                    >
                    <NuxtLink :to="'/block/' + block?.previousblockhash">
                        <div class="text-blue-600 data-non-shorten-950">
                            {{ block?.previousblockhash }}
                        </div>
                        <div class="text-blue-600 data-shorten-950">
                            {{ shortenStr(block?.previousblockhash ?? '', 3, 20) }}
                        </div>
                    </NuxtLink>
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.nextBlockHash }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5"
                    >
                    <NuxtLink :to="'/block/' + block?.nextblockhash">
                        <div class="text-blue-600 data-non-shorten-950">
                            {{ block?.nextblockhash }}
                        </div>
                        <div class="text-blue-600 data-shorten-950">
                            {{ shortenStr(block?.nextblockhash ?? '', 3, 20) }}
                        </div>
                    </NuxtLink>
                    </span>
                </div>           
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.size }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <template v-if="block?.size">
                            {{ (block.size / 1000.0).toLocaleString() }} KB
                        </template>
                        <template v-else>
                        </template>
                    </span>                    
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.weightUnit }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <template v-if="block?.weight">
                            {{ (block.weight / 1000.0).toLocaleString() }} KWU
                        </template>
                        <template v-else>
                        </template>
                    </span>                    
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.nonce }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <template v-if="block?.nonce">
                            {{ block?.nonce.toLocaleString() }}
                        </template>
                        <template v-else>
                        </template>
                        
                    </span>                    
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.numberOfTransactions }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <template v-if="block?.nTx">
                            {{ block?.nTx.toLocaleString() }}
                        </template>
                        <template v-else>
                        </template>        
                    </span>                    
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-4" v-if="!loadingState"> {{ labels.miner }}</span>
                    <span class="text-900 line-height-3" v-if="!loading5">
                        <template v-if="block?.miner?.name">
                            {{ block?.miner?.name }}
                        </template>
                        <template v-else>
                        </template>        
                    </span>                    
                </div>
            </div>



            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.transactions }} </h5>
                <DataTable
                    :value="transactions"
                    paginator
                    showGridlines
                    :rows="20"
                    dataKey="transactionId"
                    :sortField="'sortNo'"
                    :sortOrder="1" 
                    v-if="!loading3"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.index }} </template>
                        <template #body="{ data }">
                            {{ data.index }}
                        </template>
                    </Column>
                    <Column>
                        <template #header v-if="!loadingState"> {{ labels.transactionId }} </template>
                        <template #body="{ data }">
                            <NuxtLink :to="'/transaction/' + data.transactionId">
                                <div class="text-blue-600 data-non-shorten-950">
                                    {{ data.transactionId }}
                                </div>
                                <div class="text-blue-600 data-shorten-950">
                                    {{ shortenStr(data.transactionId ?? '', 8, 15) }}
                                </div>
                            </NuxtLink>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}

:deep(.p-datatable-loading-overlay) {
    background-color: rgba(0, 0, 0, 0.05);
}

.block {
    width: 25%;
}
</style>
