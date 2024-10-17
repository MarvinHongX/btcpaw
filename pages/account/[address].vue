<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBtcPrice, getAccount } from '@/commons/commonService';

const loading10 = ref<boolean>(true);
const address = ref<string>('');
const account = ref<Account | null>(null);

const loading12 = ref<boolean>(true);
const btcPrice = ref<number>(0);
const btcPriceChangePercentage = ref<number>(0);

const copied = ref<boolean>(false);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();


const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(address.value);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

watch(() => route.params.address, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        address.value = newValue.toString();
        getAccount(address, loading10, account);
        getBtcPrice(btcPrice, btcPriceChangePercentage, loading12);
    }
});

onMounted(() => {
    address.value = route.params.address.toString();
    getAccount(address, loading10, account);
    getBtcPrice(btcPrice, btcPriceChangePercentage, loading12);
});


</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5 v-if="!loadingState"> {{ labels.account }} </h5>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.address }}</span>
                    <span class="text-900 line-height-3">
                        <div class="data-non-shorten-950">
                            {{ address }}
                        </div>
                        <div class="data-shorten-950 data-non-shorten-650">
                            {{ shortenStr(address ?? '', 25, 25) }}
                        </div> 
                        <div class="data-shorten-650 data-non-shorten-600">
                            {{ shortenStr(address ?? '', 22, 20) }}
                        </div> 
                        <div class="data-shorten-600 data-non-shorten-500">
                            {{ shortenStr(address ?? '', 15, 15) }}
                        </div> 
                        <div class="data-shorten-500 data-non-shorten-400">
                            {{ shortenStr(address ?? '', 12, 12) }}
                        </div> 
                        <div class="data-shorten-400">
                            {{ shortenStr(address ?? '', 8, 8) }}
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
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.balance }}</span>
                    <span class="text-900 line-height-3" v-if="!loading10">{{ toBtcScale(account?.txHistory?.balanceSat) }} BTC</span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.estimatedValue }}</span>
                    <span class="text-900 line-height-3" v-if="!loading10 && !loading12"> $ {{ toBtcScale(account?.txHistory?.balanceSat * btcPrice, 2) }}</span>
                </div>
            </div>
            <!-- Card for each transaction -->
            <div v-for="(tx, txIndex) in account?.tx" :key="'tx-' + txIndex" class="mb-4">
                <TransactionDetail
                    :address="address"
                    :transactionId="tx?.txid" 
                    :transaction="tx" 
                    :loadingState="loadingState"
                    :loading="loading10"
                />
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
    width: 15%;
}
</style>
