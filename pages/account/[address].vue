<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAccount } from '@/commons/commonService';

const loading10 = ref<boolean>(true);
const address = ref<string>('');
const account = ref<Account | null>(null);

const route = useRoute();
const labels = useLabels();
const loadingState = useLoadingState();

watch(() => route.params.address, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        address.value = newValue.toString();
        getAccount(address, loading10, account);
    }
});

onMounted(() => {
    address.value = route.params.address.toString();
    getAccount(address, loading10, account);
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
                    <span class="text-900 line-height-3" v-if="!loading10">
                        <div class="data-non-shorten-950">
                            {{ account?.validateaddress.address }}
                        </div>
                        <div class="data-shorten-950 data-non-shorten-650">
                            {{ shortenStr(account?.validateaddress.address ?? '', 25, 25) }}
                        </div> 
                        <div class="data-shorten-650 data-non-shorten-600">
                            {{ shortenStr(account?.validateaddress.address ?? '', 22, 20) }}
                        </div> 
                        <div class="data-shorten-600 data-non-shorten-500">
                            {{ shortenStr(account?.validateaddress.address ?? '', 15, 15) }}
                        </div> 
                        <div class="data-shorten-500 data-non-shorten-400">
                            {{ shortenStr(account?.validateaddress.address ?? '', 12, 12) }}
                        </div> 
                        <div class="data-shorten-400">
                            {{ shortenStr(account?.validateaddress.address ?? '', 8, 8) }}
                        </div> 
                    </span>
                </div>
                <div class="flex flex-row">
                    <span class="block text-600 font-medium mb-4 mr-6" v-if="!loadingState"> {{ labels.balance }}</span>
                    <span class="text-900 line-height-3" v-if="!loading10">{{ account?.txHistory.balanceSat.toLocaleString() }} BTC</span>
                </div>
            </div>
            <!-- Card for each transaction -->
            <div v-for="(tx, txIndex) in account?.tx" :key="'tx-' + txIndex" class="card mb-4">
                <div class="flex align-items-center justify-content-between mb-4">
                    <NuxtLink class="text-blue-600" :to="'/transaction/' + tx.txid">
                        <span class="line-height-3">
                            <div class="data-non-shorten-600">
                                {{ tx.txid }}
                            </div>
                            <div class="data-shorten-600 data-non-shorten-500">
                                {{ shortenStr(tx.txid ?? '', 28, 28) }}
                            </div> 
                            <div class="data-shorten-500 data-non-shorten-400">
                                {{ shortenStr(tx.txid ?? '', 22, 22) }}
                            </div> 
                            <div class="data-shorten-400">
                                {{ shortenStr(tx.txid ?? '', 14, 14) }}
                            </div> 
                        </span>
                    </NuxtLink>
                </div>
                <div class="grid">
                    <div class="col-12 xl:col-6">
                        <div class="card">
                            <div class="flex align-items-center justify-content-between mb-4">
                                <span class="text-900 line-height-3" v-if="!loadingState"> {{ labels.inputs }} </span>
                            </div>
                            <div v-if="!loading10">
                                <div v-for="(input, index) in tx.vin" :key="'input-' + index" class="flex flex-row mb-3">
                                    <template v-if="input?.scriptSig?.address === account?.validateaddress.address">
                                        <span class="block text-red-500 font-medium mr-6">-{{ input?.coinbase ? 0 : input.value }}</span>
                                        <template v-if="input?.coinbase">
                                            <Tag severity='info'>{{ 'coinbase' }}</Tag>
                                        </template>
                                        <template v-else>
                                            <div class="data-non-shorten-1450">
                                                {{ input.scriptSig?.address }}
                                            </div>
                                            <div class="data-shorten-1450 data-non-shorten-1200">
                                                {{ shortenStr(input.scriptSig?.address ?? '', 23, 23) }}
                                            </div> 
                                            <div class="data-shorten-1200 data-non-shorten-950">
                                                {{ input.scriptSig?.address }}
                                            </div> 
                                            <div class="data-shorten-950 data-non-shorten-650">
                                                {{ shortenStr(input.scriptSig?.address ?? '', 22, 22) }}
                                            </div> 
                                            <div class="data-shorten-650 data-non-shorten-600">
                                                {{ shortenStr(input.scriptSig?.address ?? '', 19, 19) }}
                                            </div> 
                                            <div class="data-shorten-600 data-non-shorten-500">
                                                {{ shortenStr(input.scriptSig?.address ?? '', 14, 14) }}
                                            </div> 
                                            <div class="data-shorten-500 data-non-shorten-400">
                                                {{ shortenStr(input.scriptSig?.address ?? '', 11, 11) }}
                                            </div> 
                                            <div class="data-shorten-400">
                                                {{ shortenStr(input.scriptSig?.address ?? '', 7, 7) }}
                                            </div> 
                                        </template>
                                    </template>
                                    <template v-else>
                                        <span class="block text-600 font-medium mr-6">{{ input?.coinbase ? 0 : input.value }}</span>
                                        <template v-if="input?.coinbase">
                                            <Tag severity='info'>{{ 'coinbase' }}</Tag>
                                        </template>
                                        <template v-else>
                                            <NuxtLink class="text-blue-600" :to="'/account/' + input.scriptSig?.address">
                                                <div class="data-non-shorten-1450">
                                                    {{ input.scriptSig?.address }}
                                                </div>
                                                <div class="data-shorten-1450 data-non-shorten-1200">
                                                    {{ shortenStr(input.scriptSig?.address ?? '', 23, 23) }}
                                                </div> 
                                                <div class="data-shorten-1200 data-non-shorten-950">
                                                    {{ input.scriptSig?.address }}
                                                </div> 
                                                <div class="data-shorten-950 data-non-shorten-650">
                                                    {{ shortenStr(input.scriptSig?.address ?? '', 22, 22) }}
                                                </div> 
                                                <div class="data-shorten-650 data-non-shorten-600">
                                                    {{ shortenStr(input.scriptSig?.address ?? '', 19, 19) }}
                                                </div> 
                                                <div class="data-shorten-600 data-non-shorten-500">
                                                    {{ shortenStr(input.scriptSig?.address ?? '', 14, 14) }}
                                                </div> 
                                                <div class="data-shorten-500 data-non-shorten-400">
                                                    {{ shortenStr(input.scriptSig?.address ?? '', 11, 11) }}
                                                </div> 
                                                <div class="data-shorten-400">
                                                    {{ shortenStr(input.scriptSig?.address ?? '', 7, 7) }}
                                                </div> 
                                            </NuxtLink>
                                        </template>
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
                            <div v-if="!loading10">
                                <div v-for="(output, index) in tx.vout" :key="'output-' + index" class="flex flex-row mb-3">
                                    <template v-if="output?.scriptPubKey?.address === account?.validateaddress.address">
                                        <span class="block text-green-600 font-medium mr-6">+{{ output.value }}</span>
                                        <template v-if="output?.scriptPubKey?.address">
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
                                        </template>
                                        <template v-else>
                                            <Tag severity='warning'>{{ 'OP_RETURN' }}</Tag>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <span class="block text-600 font-medium mr-6">{{ output.value }}</span>
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
    width: 15%;
}
</style>
