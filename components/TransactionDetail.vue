<script setup lang="ts">
const props = defineProps({
    address: {
        type: String,
    },
    transactionId: {
        type: String,
    },
    transaction: {
        type: Object,
    },
    loadingState: {
        type: Boolean,
    },
    loading: {
        type: Boolean,
    },    
});

const labels = useLabels();
</script>


<template>
<div class="card">
    <div class="flex align-items-center justify-content-between mb-4">
        <NuxtLink class="text-blue-600" :to="'/transaction/' + transactionId">
            <span class="text-900 line-height-3">
                <div class="data-non-shorten-600">
                    {{ transactionId }}
                </div>
                <div class="data-shorten-600 data-non-shorten-500">
                    {{ shortenStr(transactionId ?? '', 28, 28) }}
                </div>
                <div class="data-shorten-500 data-non-shorten-400">
                    {{ shortenStr(transactionId ?? '', 22, 22) }}
                </div>
                <div class="data-shorten-400">
                    {{ shortenStr(transactionId ?? '', 14, 14) }}
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
            <div v-if="!loading">
            <div
                v-for="(input, index) in transaction?.vin"
                :key="'input-' + index"
                class="flex flex-row mb-3"
            >
                <template v-if="input?.scriptPubKey?.address === address">
                    <span class="block text-600 font-medium mr-6">
                        {{ input?.txid === '' ? 0 : calculateTotalVout(transaction?.vout) }} BTC
                    </span>
                    <template v-if="input?.txid === ''">
                        <Tag severity="info">{{ 'coinbase' }}</Tag>
                    </template>
                    <template v-else>
                        <div class="data-non-shorten-1450">{{ input.txid }}</div>
                        <div class="data-shorten-1450 data-non-shorten-1200">
                            {{ shortenStr(input.txid ?? '', 23, 23) }}
                        </div>
                        <div class="data-shorten-1200 data-non-shorten-950">{{ input.txid }}</div>
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
                        <div class="data-shorten-400">{{ shortenStr(input.txid ?? '', 7, 7) }}</div>
                    </template>
                </template>
                <template v-else>
                    <span class="block text-600 font-medium mr-6">
                        {{ input?.txid === '' ? 0 : calculateTotalVout(transaction?.vout) }} BTC
                    </span>
                    <template v-if="input?.txid === ''">
                        <Tag severity="info">{{ 'coinbase' }}</Tag>
                    </template>
                    <template v-else>
                        <NuxtLink class="text-blue-600" :to="'/transaction/' + input.txid">
                            <div class="data-non-shorten-1450">{{ input.txid }}</div>
                            <div class="data-shorten-1450 data-non-shorten-1200">
                                {{ shortenStr(input.txid ?? '', 23, 23) }}
                            </div>
                            <div class="data-shorten-1200 data-non-shorten-950">{{ input.txid }}</div>
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
                            <div class="data-shorten-400">{{ shortenStr(input.txid ?? '', 7, 7) }}</div>
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
            <div v-if="!loading">
            <div
                v-for="(output, index) in transaction?.vout"
                :key="'output-' + index"
                class="flex flex-row mb-3"
            >
                <template v-if="output?.scriptPubKey?.address === address">
                    <span class="block text-600 font-medium mr-6">{{ output.value }} BTC</span>
                    <template v-if="output?.scriptPubKey?.address">
                        <div class="data-non-shorten-1450">{{ output.scriptPubKey?.address }}</div>
                        <div class="data-shorten-1450 data-non-shorten-1200">
                            {{ shortenStr(output.scriptPubKey?.address ?? '', 23, 23) }}
                        </div>
                        <div class="data-shorten-1200 data-non-shorten-950">{{ output.scriptPubKey?.address }}</div>
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
                        <div class="data-shorten-400">{{ shortenStr(output.scriptPubKey?.address ?? '', 7, 7) }}</div>
                    </template>
                    <template v-else>
                        <Tag severity="warning">{{ 'OP_RETURN' }}</Tag>
                    </template>
                </template>
                <template v-else>  
                    <span class="block text-600 font-medium mr-6">{{ output.value }} BTC</span>
                    <template v-if="output?.scriptPubKey?.address">
                    <NuxtLink class="text-blue-600" :to="'/account/' + output.scriptPubKey?.address">
                        <div class="data-non-shorten-1450">{{ output.scriptPubKey?.address }}</div>
                        <div class="data-shorten-1450 data-non-shorten-1200">
                            {{ shortenStr(output.scriptPubKey?.address ?? '', 23, 23) }}
                        </div>
                        <div class="data-shorten-1200 data-non-shorten-950">{{ output.scriptPubKey?.address }}</div>
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
                        <div class="data-shorten-400">{{ shortenStr(output.scriptPubKey?.address ?? '', 7, 7) }}</div>
                    </NuxtLink>
                    </template>
                    <template v-else>
                    <Tag severity="warning">{{ 'OP_RETURN' }}</Tag>
                    </template>
                </template>
            </div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

