<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTransaction } from '@/commons/commonService';

const loading7 = ref<boolean>(true);
const transactionId = ref<string>('');
const transaction = ref<Transaction | null>(null);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();

watch(() => route.params.transactionId, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        transactionId.value = newValue.toString();
        getTransaction(transactionId, loading7, transaction);
    }
});

onMounted(() => {
    transactionId.value = route.params.transactionId.toString();
    getTransaction(transactionId, loading7, transaction);
});


</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.transaction }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.transactionId }}</span>
                    <span class="text-900 line-height-3" v-if="!loading7">
                        <div class="data-non-shorten-950">
                            {{ transaction?.txid }}
                        </div>
                        <div class="data-shorten-950 data-non-shorten-650">
                            {{ shortenStr(transaction?.txid ?? '', 25, 25) }}
                        </div> 
                        <div class="data-shorten-650 data-non-shorten-600">
                            {{ shortenStr(transaction?.txid ?? '', 22, 20) }}
                        </div> 
                        <div class="data-shorten-600 data-non-shorten-500">
                            {{ shortenStr(transaction?.txid ?? '', 15, 15) }}
                        </div> 
                        <div class="data-shorten-500 data-non-shorten-400">
                            {{ shortenStr(transaction?.txid ?? '', 12, 12) }}
                        </div> 
                        <div class="data-shorten-400">
                            {{ shortenStr(transaction?.txid ?? '', 8, 8) }}
                        </div> 
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.inBlock }}</span>
                    <span class="text-900 line-height-3" v-if="!loading7">
                        <NuxtLink class="text-blue-600" :to="'/block/' + transaction?.blockHash">
                            <div class="data-non-shorten-950">
                                {{ transaction?.blockHash }}
                            </div>
                            <div class="data-shorten-950 data-non-shorten-650">
                                {{ shortenStr(transaction?.blockHash ?? '', 25, 25) }}
                            </div> 
                            <div class="data-shorten-650 data-non-shorten-600">
                                {{ shortenStr(transaction?.blockHash ?? '', 22, 20) }}
                            </div> 
                            <div class="data-shorten-600 data-non-shorten-500">
                                {{ shortenStr(transaction?.blockHash ?? '', 15, 15) }}
                            </div> 
                            <div class="data-shorten-500 data-non-shorten-400">
                                {{ shortenStr(transaction?.blockHash ?? '', 12, 12) }}
                            </div> 
                            <div class="data-shorten-400">
                                {{ shortenStr(transaction?.blockHash ?? '', 8, 8) }}
                            </div> 
                        </NuxtLink>

                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.timestamp }}</span>
                    <span class="text-900 line-height-3" v-if="!loading7">{{ formatTimestamp(transaction?.time) }}</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.size }}</span>
                    <span class="text-900 line-height-3" v-if="!loading7">
                        <template v-if="transaction?.size">
                            {{ (transaction.size / 1000.0).toLocaleString() }} KB
                        </template>
                        <template v-else>
                        </template>
                    </span>                    
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.weightUnit }}</span>
                    <span class="text-900 line-height-3" v-if="!loading7">
                        <template v-if="transaction?.weight">
                            {{ (transaction.weight / 1000.0).toLocaleString() }} KWU
                        </template>
                        <template v-else>
                        </template>
                    </span>                    
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.fee }}</span>
                    <span class="text-900 line-height-3" v-if="!loading7"
                    >{{ transaction?.fee?.amount.toLocaleString() }} {{ transaction?.fee?.unit }}</span>
                </div>
            </div>

            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <span class="text-900 line-height-3" v-if="!loading7">
                        <div class="data-non-shorten-600">
                            {{ transaction?.txid }}
                        </div>
                        <div class="data-shorten-600 data-non-shorten-500">
                            {{ shortenStr(transaction?.txid ?? '', 28, 28) }}
                        </div> 
                        <div class="data-shorten-500 data-non-shorten-400">
                            {{ shortenStr(transaction?.txid ?? '', 22, 22) }}
                        </div> 
                        <div class="data-shorten-400">
                            {{ shortenStr(transaction?.txid ?? '', 14, 14) }}
                        </div> 
                    </span>
                </div>
                <div class="grid">
                    <div class="col-12 xl:col-6">
                        <div class="card">
                            <div class="flex align-items-center justify-content-between mb-4">
                                <span class="text-900 line-height-3" v-if="!loadingState"> {{ labels.inputs }} </span>
                            </div>
                            <div v-if="!loading7">
                                <div v-for="(input, index) in transaction?.vin" :key="'input-' + index" class="flex flex-row mb-3">
                                    <span class="block text-600 font-medium mr-6">{{ input?.coinbase ? 0 : input.value }} BTC</span>
                                    <template v-if="input?.coinbase">
                                        <Tag severity='info'>{{ 'coinbase' }}</Tag>
                                    </template>
                                    <template v-else>
                                        <NuxtLink class="text-blue-600" :to="'/transaction/' + input.txid">
                                            <div class="data-non-shorten-1450">
                                                {{ input.txid }}
                                            </div>
                                            <div class="data-shorten-1450 data-non-shorten-1200">
                                                {{ shortenStr(input.txid ?? '', 23, 23) }}
                                            </div> 
                                            <div class="data-shorten-1200 data-non-shorten-950">
                                                {{ input.txid }}
                                            </div> 
                                            <div class="data-shorten-950 data-non-shorten-650">
                                                {{ shortenStr(input.txid ?? '', 22, 22) }}
                                            </div> 
                                            <div class="data-shorten-650 data-non-shorten-600">
                                                {{ shortenStr(input.txid ?? '', 19, 19) }}
                                            </div> 
                                            <div class="data-shorten-600 data-non-shorten-500">
                                                {{ shortenStr(input.txid ?? '', 14, 14) }}
                                            </div> 
                                            <div class="data-shorten-500 data-non-shorten-400">
                                                {{ shortenStr(input.txid ?? '', 11, 11) }}
                                            </div> 
                                            <div class="data-shorten-400">
                                                {{ shortenStr(input.txid ?? '', 7, 7) }}
                                            </div> 
                                        </NuxtLink>
                                    </template>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-12 xl:col-6">
                        <div class="card">
                            <div class="flex align-items-center justify-content-between mb-4">
                                <span class="text-900 line-height-3" v-if="!loadingState"> {{ labels.outputs }} </span>
                            </div>
                            <div v-if="!loading7">
                                <div v-for="(output, index) in transaction?.vout" :key="'output-' + index" class="flex flex-row mb-3">
                                    <span class="block text-600 font-medium mr-6">{{ output.value }} BTC</span>
                                    <template v-if="output?.scriptPubKey?.address">
                                        <NuxtLink class="text-blue-600" :to="'/account/' + output.scriptPubKey?.address">
                                            <div class="data-non-shorten-1450">
                                                {{ output.scriptPubKey?.address }}
                                            </div>
                                            <div class="data-shorten-1450 data-non-shorten-1200">
                                                {{ shortenStr(output.scriptPubKey?.address ?? '', 23, 23) }}
                                            </div> 
                                            <div class="data-shorten-1200 data-non-shorten-950">
                                                {{ output.scriptPubKey?.address }}
                                            </div> 
                                            <div class="data-shorten-950 data-non-shorten-650">
                                                {{ shortenStr(output.scriptPubKey?.address ?? '', 22, 22) }}
                                            </div> 
                                            <div class="data-shorten-650 data-non-shorten-600">
                                                {{ shortenStr(output.scriptPubKey?.address ?? '', 19, 19) }}
                                            </div> 
                                            <div class="data-shorten-600 data-non-shorten-500">
                                                {{ shortenStr(output.scriptPubKey?.address ?? '', 14, 14) }}
                                            </div> 
                                            <div class="data-shorten-500 data-non-shorten-400">
                                                {{ shortenStr(output.scriptPubKey?.address ?? '', 11, 11) }}
                                            </div> 
                                            <div class="data-shorten-400">
                                                {{ shortenStr(output.scriptPubKey?.address ?? '', 7, 7) }}
                                            </div> 
                                        </NuxtLink>
                                    </template>
                                    <template v-else>
                                        <Tag severity='warning'>{{ 'OP_RETURN' }}</Tag>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
