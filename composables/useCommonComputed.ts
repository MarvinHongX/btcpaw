import logoUrl from '/assets/images/logo.svg';
import lightLogoUrl from '/assets/images/logo-light.svg';
import darkModeUrl from '/assets/images/dark-mode-light.svg';
import lightModeUrl from '/assets/images/light-mode.svg';
import skyzoneUrl from '/assets/images/skyzone.svg';
import aleocatUrl from '/assets/images/aleocat.webp';
import bitcoinUrl from '/assets/images/bitcoin.svg';

const { layoutConfig } = useLayout();

export const useCommonComputed = () => {
    const darkTheme = computed(() => layoutConfig.darkTheme.value === true);

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
