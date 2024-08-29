const { layoutConfig } = useLayout();

export const useCommonComputed = () => {
    const darkTheme = computed(() => {
        return layoutConfig.darkTheme.value !== true ? false : true;
    });
    
    const logoUrl = computed(() => {
        return `/layout/images/logo.svg`;
    });

    const lightLogoUrl = computed(() => {
        return `/layout/images/logo-light.svg`;
    });

    const darkModeUrl = computed(() => {
        return `/layout/images/dark-mode-light.svg`;
    });

    const lightModeUrl = computed(() => {
        return `/layout/images/light-mode.svg`;
    });

    const skyzoneUrl = computed(() => {
        return `/layout/images/skyzone.svg`;
    });

    const aleocatUrl = computed(() => {
        return `/layout/images/aleocat.png`;
    });

    const bitcoinUrl = computed(() => {
        return `/layout/images/bitcoin.svg`;
    });

    return {
        darkTheme,
        logoUrl,
        lightLogoUrl,
        darkModeUrl,
        lightModeUrl,
        skyzoneUrl,
        aleocatUrl,
        bitcoinUrl,
    };
};
