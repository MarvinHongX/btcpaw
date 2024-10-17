import { getMenuItems, getLabels, getSentences } from '@/commons/commonLanguageService';
const { setTheme, setLanguage, setLoaded, layoutConfig } = useLayout();


export const saveSomethingToLocalStorage = (key: string, something: any): void => {
    localStorage.setItem(key, JSON.stringify(something));
};

export const getSomethingFromLocalStorage = (key: string): any => {
    return localStorage.getItem(key);
};

export const search = (searchValue: Ref<string>, toast: any, toastMessage: Ref<ToastMessage>): void => {
    let value: string = searchValue.value;
    const message: ToastMessage = toastMessage.value;
    value = value.trim().replace(/,/g, '');
    if (/^\d+$/.test(value) || value.startsWith('0000')) {
        navigateTo({
            path: `/block/${value}`,
        });
    } else if (/^[13][a-zA-Z0-9]{26,35}$/.test(value) || /^bc1[a-zA-Z0-9]{25,39}$/.test(value)) {
        // P2PKH, P2SH, Bech32
        navigateTo({
            path: `/account/${value}`,
        })
    } else if (/^[0-9a-fA-F]{64}$/.test(value)) {
        // 64자리의 16진수 문자열
        navigateTo({
            path: `/transaction/${value}`,
        });
    } else {
        toast.add(message);
        return;
    }
    searchValue.value = '';
};

export const updateLayoutConfigFromLocalStorage: any = (key: string) => {
    const data: string | null = getSomethingFromLocalStorage(key);
    if (data) {
        const selectedLanguage = useSelectedLanguage();
        try {
            const newConfig: LayoutConfig = JSON.parse(data);
            onChangeTheme(newConfig.theme, newConfig.darkTheme);
            selectedLanguage.value = newConfig.language;
            onChangeLanguage(selectedLanguage);
        } catch (error) {
            //console.error('Error parsing layout configuration from local storage:', error);
            saveSomethingToLocalStorage(key, layoutConfig);
        };
    } else {
        saveSomethingToLocalStorage(key, layoutConfig);
    }
    setLoaded();
};

export const onChangeTheme = (theme: string, darkTheme: boolean): void => {
    if (!theme){
        return
    }
    const elementId: string = 'theme-css';
    const linkElement: HTMLLinkElement | null = document.getElementById(elementId) as HTMLLinkElement | null;

    if (linkElement) {
        const cloneLinkElement: HTMLLinkElement = linkElement.cloneNode(true) as HTMLLinkElement;
        const newThemeUrl: string | null = linkElement.getAttribute('href');

        if (newThemeUrl) {
            const updatedThemeUrl: string = newThemeUrl.replace(layoutConfig.theme.value, theme);

            cloneLinkElement.setAttribute('id', elementId + '-clone');
            cloneLinkElement.setAttribute('href', updatedThemeUrl);
            cloneLinkElement.addEventListener('load', () => {
                if (linkElement.parentNode) {
                    linkElement.remove();
                    cloneLinkElement.setAttribute('id', elementId);
                    setTheme(theme, darkTheme);
                }
            });
            if (linkElement.parentNode) {
                linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
            }
        }
    }
};

export const onChangeLanguage = (selectedLanguage: Ref<Language>): void => {
    if (!selectedLanguage.value){
        return
    }
    const language: Language = selectedLanguage.value;
    setLanguage(language);

    const menuItems = useMenuItems();
    const labels = useLabels();
    const sentences = useSentences();
    const loadingState = useLoadingState();
    const toastMessage = useToastMessage();

    menuItems.value = getMenuItems(selectedLanguage);
    labels.value = getLabels(selectedLanguage);
    sentences.value = getSentences(selectedLanguage);

    if (sentences.value) {
        toastMessage.value.summary = sentences.value.searchResults;
        toastMessage.value.detail = sentences.value.noResultsFound;
    }

    if (loadingState.value) loadingState.value = false;
};

export const toBtcDifficulty = (value: string): string => {
    if (value.includes('E') || value.includes('e')) {
        const numberValue = parseFloat(value);
        
        const terabytesValue = numberValue / 1e12;
        
        const formattedValue = terabytesValue.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        return `${formattedValue} T`;
    }
    
    return value;
}

export const getElapsedTime = (timestamp: number): string => {
    let elapsedTime: string = '';

    const currentTime: number = Math.floor(new Date().getTime() / 1000);
    const elapsedSeconds: number = currentTime - timestamp;

    if (elapsedSeconds < 60) {
        elapsedTime = `${elapsedSeconds}s ago`;
    } else {
        const elapsedMinutes: number = Math.floor(elapsedSeconds / 60);
        if (elapsedMinutes < 60) {
            const remainingSeconds: number = elapsedSeconds % 60;
            elapsedTime = `${elapsedMinutes}m ${remainingSeconds}s ago`;
        } else {
            const elapsedHours: number = Math.floor(elapsedMinutes / 60);
            elapsedTime = `${elapsedHours}h ago`;
        }
    }

    return elapsedTime;
};

export const updateElapsedTime = (latestBlock: Ref<Block | null>, elapsedTime: Ref<string>): void => {
    if (latestBlock.value && 
        latestBlock.value.time
    ) { 
        const timestamp: number = latestBlock.value.time;
        elapsedTime.value = getElapsedTime(timestamp);
    }
};

export const formatTimestamp = (timestamp: number | undefined, locale: string = 'en-US'): string => {
    if (timestamp === undefined) {
        return 'Invalid Timestamp';
    }

    const date = new Date(timestamp * 1000);
    
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric',
        month: 'short', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    };

    try {
        const formattedDate: string = new Intl.DateTimeFormat(locale, options).format(date);
        return formattedDate;
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Error formatting date';
    }
}; 

export const formatTimestampYYYYMMDD = (timestamp: number | undefined, locale: string = 'en-US'): string => {
    if (timestamp === undefined) {
        return 'Invalid Timestamp';
    }

    const date = new Date(timestamp * 1000);
    
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}; 

export const shortenStr = (str: string, prefixLength: number = 7, suffixLength: number = 7): string => {
    if (!str || typeof str !== 'string') {
        return '';
    }

    const maxLength: number = prefixLength + suffixLength + 3; // 3 is for '...'
    if (str.length <= maxLength) {
        return str; // No need to shorten
    }

    const prefix: string = str.slice(0, prefixLength);
    const suffix: string = str.slice(-suffixLength);

    return `${prefix}...${suffix}`;
}

export const formatNumberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const shortenNum = (num: number): string => {
    const TRILLION: number = 1e12;
    const BILLION: number = 1e9;
    const MILLION: number = 1e6;
    const THOUSAND: number = 1e3;
    
    if (num >= TRILLION) {
        return (num / TRILLION).toFixed(2).replace(/\.0$/, '') + 'T';
    } else if (num >= BILLION) {
        return (num / BILLION).toFixed(2).replace(/\.0$/, '') + 'B';
    } else if (num >= MILLION) {
        return (num / MILLION).toFixed(2).replace(/\.0$/, '') + 'M';
    } else if (num >= THOUSAND) {
        return (num / THOUSAND).toFixed(2).replace(/\.0$/, '') + 'K';
    } else {
        return formatNumberWithCommas(num);
    }
};


export const toBtcScale = (value: string | number | undefined, fractionDigits: number = 8): string => {
    let result: number = 0;

    if (typeof value === 'string') {
        result = parseInt(value, 10);
    } else {
        result = value as number;
    }

    const scaledResult: string = (result / 100000000.0).toFixed(fractionDigits);
    return Number(scaledResult).toLocaleString(undefined, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });
};


export const formatHashRate = (hashRate: number): string => {
    const units: string[] = ['H/s', 'K', 'M', 'G', 'T', 'P', 'E'];
    let index: number = 0;
  
    while (hashRate >= 1000 && index < units.length - 1) {
        hashRate /= 1000;
        index++;
    }

    return `${hashRate.toFixed(2)} ${units[index]}H/s`;
};
