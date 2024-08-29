<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLatestBlockFromLocalStorage, fetchBlocksForPage } from '@/commons/commonService';

const loading1 = ref<boolean>(true);
const loading2 = ref<boolean>(true);
const latestBlock = ref<Block | null>(null); 
const blocks = ref<Block[]>([]);
const blockParams = ref<TableParams>({
    currentPage: 1,
    pageSize: 5,
    totalRecords: 1
});

const labels = useLabels();
const loadingState = useLoadingState();

const { LATEST_BLOCK_KEY } = useCommonConstant();

const onBlockPage = (event: any) => {
    blockParams.value.currentPage = event.page + 1;
    fetchBlocksForPage(blockParams, loading2, blocks);
};


onMounted(() => {
    if (getLatestBlockFromLocalStorage(latestBlock, loading1, LATEST_BLOCK_KEY)) {
        blockParams.value.totalRecords = latestBlock.value?.height ?? 1;
        fetchBlocksForPage(blockParams, loading2, blocks);
    }
});


</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-if="!loadingState"> {{ labels.latestBlocks }} </h5>
                <DataTable
                    :value="blocks"
                    lazy 
                    paginator
                    :first="((blockParams.currentPage - 1) * blockParams.pageSize) + 1"
                    :rows="blockParams.pageSize"
                    :totalRecords="blockParams.totalRecords"
                    showGridlines
                    dataKey="hash"
                    :sortField="'height'"
                    :sortOrder="-1" 
                    filterDisplay="menu"
                    :loading="loading2"
                    :currentPage="blockParams.currentPage - 1"
                    @page="onBlockPage($event)"
                >
                    <template #empty v-if="!loadingState"> {{ labels.noDataFound }} </template>
                    <template #loading> 
                        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="rgba(255, 255, 255, 0)" animationDuration="1s" aria-label="ProgressSpinner" />
                    </template>
                    <Column field="height" dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.blockHeight }} </template>
                        <template #body="{ data }">
                            <NuxtLink class="text-blue-600" :to="'/block/' + data.height">
                                {{ data.height?.toLocaleString() }}
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column field="hash">
                        <template #header v-if="!loadingState"> {{ labels.blockHash }} </template>
                        <template #body="{ data }">
                            <div class="flex align-items-center gap-2">
                                <div class="data-non-shorten-950">
                                    {{ data.hash }}
                                </div>
                                <div class="data-shorten-950">
                                    {{ shortenStr(data.hash,7,1) }}
                                </div>
                            </div>
                        </template>
                    </Column>
                    <Column field="nonce" filterField="nonce" dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.nonce }} </template>
                        <template #body="{ data }">
                            {{ data.nonce?.toLocaleString() }}
                        </template>
                    </Column>
                    <Column field="nTx" filterField="nTx" dataType="numeric">
                        <template #header v-if="!loadingState"> {{ labels.transactions }} </template>
                        <template #body="{ data }">
                            {{ data.nTx }}
                        </template>
                    </Column>
                    <Column field="time" filterField="time" dataType="datetime">
                        <template #header v-if="!loadingState"> {{ labels.timestamp }} </template>
                        <template #body="{ data }">
                            {{ formatTimestamp(data.time) }}
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
</style>
