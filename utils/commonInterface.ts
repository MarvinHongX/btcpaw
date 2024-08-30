export interface LayoutConfig {
    darkTheme: boolean;
    language: Language;
    menuMode: string;
    theme: string;
    scale: number;
    activeMenuItem: any;
    isLoading: boolean;
}

export interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

export interface Language {
    name: string;
    code: string;
}

export interface MenuLabel {
    [key: string]: string;
}

export interface MenuItem {
    label: string;
    route: string;
}

export interface Sentences {
    [key: string]: {
        ENG: string;
        KOR: string;
    };
}

export interface Labels {
    [key: string]: {
        ENG: string;
        KOR: string;
    };
}

export interface Label {
    [key: string]: {
        ENG: string;
        KOR: string;
    };
}

export interface ToastMessage {
    severity: string;
    summary: string;
    detail: string;
    life: number;
}

export interface NavigateOptions {
    path: string;
}

export interface StringInput {
    value: string;
}

export interface Block {
    hash: string;
    height: number;
    time: number;
    mediantime: number;
    nonce: number;
    difficulty: number;
    nTx: number;
    previousblockhash: string;
    nextblockhash: string;
    size: number;
    weight: number;
    tx: String[];
    coinbaseTx: any;
    totalFees: string;
    miner: any;
}

export interface Transaction {
    txid: string;
    hash: string;
    size: number;
    weight: number;
    vin: [{
        coinbase: string;
        txid: string;
        scriptSig: {
            address: string;
        },
        value: number;
    }];
    vout: [{
        scriptPubKey: {
            asm: string;
            address: string;
        },
        value: number;
    }];
    fee: {
        amount: number;
        unit: string;
    };
    blockHash: string;
    time: number;
}

export interface TableParams {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
}

export interface Account {
    base58: {
        hash: string;
        version: number;
    };
    encoding: string;
    validateaddress: {
        isvalid: boolean;
        address: string;
        scriptPubKey: string;
        isscript: boolean;
        iswitness: boolean;
    };
    txHistory: {
        txCount: number;
        txids: [];
        blockHeightsByTxid: {
            string: number
        };
        balanceSat: number;
    }
    tx: Transaction[];
}

export interface Members {
    [address: string]: [number, boolean];
}

export interface BtcInfo {
    hashRate: number;
}

export interface Prover {
    address: string;
    totalPower: number;
    power: number;
    score: number;
    lastBlock: boolean;
    rank: number;
}

export interface LineChart{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
        tension: number;
    }[];
}

export interface DoughnutChart{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string[];
        borderColor: string;
        tension: number;
    }[];
}

export interface TxResponse {
    txHistory?: {
      txids: string[];
    };
    tx?: any[];
  }