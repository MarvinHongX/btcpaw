<script setup lang="ts">
const { logoUrl } = useCommonComputed();

const sentences = useSentences();
const loadingState = useLoadingState();

</script>

<template>
    <div class="layout-footer" v-if="!loadingState">
        <div class="layout-footer-logo">
            <img :src="logoUrl" alt="logo" height="20" class="mr-2" />
            <span class="layout-footer-logo-name"><span class="btc">BTC</span><span class="paw">PAW</span></span>
        </div> 
        <div class="layout-footer-txt">
            <span class="text-500 font-medium text-xl" v-if="!loadingState"> {{ sentences.footerMsg1 }}</span>
        </div>
        <div class="layout-footer-sparator"></div>
        <div class="layout-footer-txt">
            <span class="text-500 font-medium">© 2024 BTCPAW. All rights reserved.</span>
        </div>         
    </div>
</template>
<style lang="scss" scoped></style>
