<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTransaction } from '@/commons/commonService';

const loading7 = ref<boolean>(true);
const transactionId = ref<string>('');
const transaction = ref<Transaction | null>(null);

const copied = ref<boolean>(false);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();


const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(transactionId.value);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

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
                    <span class="text-900 line-height-3">
                        <div class="data-non-shorten-950">
                            {{ transactionId }}
                        </div>
                        <div class="data-shorten-950 data-non-shorten-650">
                            {{ shortenStr(transactionId ?? '', 25, 25) }}
                        </div> 
                        <div class="data-shorten-650 data-non-shorten-600">
                            {{ shortenStr(transactionId ?? '', 22, 20) }}
                        </div> 
                        <div class="data-shorten-600 data-non-shorten-500">
                            {{ shortenStr(transactionId ?? '', 15, 15) }}
                        </div> 
                        <div class="data-shorten-500 data-non-shorten-400">
                            {{ shortenStr(transactionId ?? '', 12, 12) }}
                        </div> 
                        <div class="data-shorten-400">
                            {{ shortenStr(transactionId ?? '', 8, 8) }}
                        </div> 
                    </span>
                    <template v-if="!copied">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="ml-2 cursor-pointer"
                            @click="copyToClipboard"
                        >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                    </template>
                    <template v-else>
                        <span  class="text-900 line-height-3">&nbsp;&nbsp;Copied!</span>
                    </template>
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
            </div>
            <TransactionDetail
                :transactionId="transaction?.txid" 
                :transaction="transaction" 
                :loadingState="loadingState"
                :loading="loading7"
            />
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
