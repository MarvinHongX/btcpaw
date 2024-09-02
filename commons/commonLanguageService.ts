export const getMenuItems = (selectedLanguage: Ref<Language>): MenuItem[] => {
    const language: string = selectedLanguage.value ? selectedLanguage.value.code : 'ENG';
    const menuLabels: Record<string, MenuLabel> = {
        'KOR': {
            blocks: '블록',
        },
        'ENG': {
            blocks: 'Blocks',
        },
    };

    const menuItems: MenuItem[] = Object.keys(menuLabels[language]).map(key => ({
        label: menuLabels[language][key],
        route: key === 'home' ? '/' : `/${key}`
    }));
    return menuItems;
};



export const getSentences = (selectedLanguage: Ref<Language>): Record<string, string> => {
    const language: string = selectedLanguage.value ? selectedLanguage.value.code : 'ENG';
    const sentences: Sentences = {
        noResultsFound: {
            ENG: 'No results found.',
            KOR: '결과를 찾을 수 없습니다.'
        },
        searchBy: {
            ENG: 'Search by Block / Hash / Transaction / Address',
            KOR: '블록 / 해시 / 트랜잭션 / 주소 로 검색하세요.'
        },
        searchResults: {
            ENG: 'Search Results',
            KOR: '검색 결과'
        },
        keywordSearch: {
            ENG: 'Keyword Search',
            KOR: '키워드 검색'
        },
        footerMsg1: {
            ENG: 'Your Premier Block Explorer and Analytics Platform for Bitcoin',
            KOR: '비트코인 블록 탐색기 및 분석 플랫폼'
        },
    };

    const result: Record<string, string> = {};

    Object.keys(sentences).forEach((key: string) => {
        const sentence = sentences[key];
        if (sentence.hasOwnProperty(language)) {
            result[key] = sentence[language as keyof typeof sentence];
        }
    });
    return result;
};





export const getLabels = (selectedLanguage: Ref<Language>): Record<string, string> => {
    const language: string = selectedLanguage.value ? selectedLanguage.value.code : 'ENG';
    const labels: Labels = {
        account: {
            ENG: 'Account',
            KOR: '계정'
        },
        address: {
            ENG: 'Address',
            KOR: '주소'
        },
        aleoPrice: {
            ENG: 'BTC Price',
            KOR: '비트코인 가격'
        },
        balance: {
            ENG: 'Balance',
            KOR: '잔액' 
        },
        block: {
            ENG: 'Block',
            KOR: '블록'
        },
        blockHash: {
            ENG: 'Block Hash',
            KOR: '블록 해시'
        },
        blockHeight: {
            ENG: 'Block Height',
            KOR: '블록 높이'
        },
        clear: {
            ENG: 'Clear',
            KOR: '초기화'
        },
        difficulty: {
            ENG: 'Difficulty',
            KOR: '난이도'
        },
        email: {
            ENG: 'Email',
            KOR: '이메일'
        },
        epoch: {
            ENG: 'Epoch',
            KOR: '에폭'
        },
        estimatedValue: {
            ENG: 'Estimated Value',
            KOR: '추정 가치'
        },
        fee: {
            ENG: 'Fee',
            KOR: '비용'
        },
        getStarted: {
            ENG: 'Get Started',
            KOR: '시작하기'
        },
        hash: {
            ENG: 'Hash',
            KOR: '해시'
        },        
        hashrate: {
            ENG: 'Hashrate',
            KOR: '해시레이트'            
        },
        height: {
            ENG: 'Height',
            KOR: '높이'
        },
        index: {
            ENG: 'Index',
            KOR: '인덱스'
        },
        inBlock: {
            ENG: 'In Block',
            KOR: '해당 블록'
        },
        inputs: {
            ENG: 'Inputs',
            KOR: '입력값들'
        },
        latestBlock: {
            ENG: 'Latest block',
            KOR: '최신 블록'
        },
        latestBlocks: {
            ENG: 'Latest Blocks',
            KOR: '최신 블록들'
        },
        latestTransactions: {
            ENG: 'Latest Transactions',
            KOR: '최신 트랜잭션들'
        },
        loading: {
            ENG: 'Loading ...',
            KOR: '로딩중 ...'
        },
        miner: {
            ENG: 'Miner',
            KOR: '마이너'            
        },
        more: {
            ENG: 'More',
            KOR: '더 보기'
        },
        network: {
            ENG: 'Network',
            KOR: '네트워크'
        },
        networkHashrate: {
            ENG: 'Network Hashrate',
            KOR: '네트워크 해시레이트'
        },
        networkMiners: {
            ENG: 'Network Miners',
            KOR: '네트워크 마이너'
        },
        nextBlockHash: {
            ENG: 'Next Block Hash',
            KOR: '다음 블록 해시'
        },
        noDataFound: {
            ENG: 'No data found.',
            KOR: '데이터를 찾을 수 없습니다.',
        },
        nonce: {
            ENG: 'Nonce',
            KOR: '논스'
        },
        numberOfTransactions: {
            ENG: 'Number Of Transactions',
            KOR: '트랜잭션 수'
        },
        outputs: {
            ENG: 'Outputs',
            KOR: '출력값들'
        },
        power: {
            ENG: 'Power',
            KOR: '파워'
        },
        previousBlockHash: {
            ENG: 'Previous Block Hash',
            KOR: '이전 블록 해시'
        },
        pool: {
            ENG: 'Pool',
            KOR: '풀'      
        },
        pools: {
            ENG: 'Pools',
            KOR: '풀'      
        },
        rank: {
            ENG: 'Rank',
            KOR: '순위'
        },
        round: {
            ENG: 'Round',
            KOR: '라운드'
        },
        size: {
            ENG: 'Size',
            KOR: '크기'     
        },
        stake: {
            ENG: 'Stake',
            KOR: '스테이크'
        },
        status: {
            ENG: 'Status',
            KOR: '상태'
        },
        timestamp: {
            ENG: 'Timestamp',
            KOR: '타임스탬프'
        },
        totalStake: {
            ENG: 'Total Stake',
            KOR: '전체 스테이크'
        },
        transaction: {
            ENG: 'Transaction',
            KOR: '트랜잭션'
        },
        transactions: {
            ENG: 'Transactions',
            KOR: '트랜잭션들'           
        },
        transactionId: {
            ENG: 'Transaction ID',
            KOR: '트랜잭션 ID'
        },
        transactionHash: {
            ENG: 'Transaction Hash',
            KOR: '트랜잭션 해시'
        },
        type: {
            ENG: 'Type',
            KOR: '타입'
        },
        view: {
            ENG: 'View',
            KOR: '보기'
        },
        weightUnit: {
            ENG: 'Weight Unit',
            KOR: '가중치 단위'
        }
    };

    const result: Record<string, string> = {};

    Object.keys(labels).forEach((key: string) => {
        const label = labels[key];
        if (label.hasOwnProperty(language)) {
            result[key] = label[language as keyof typeof label];
        }
    });

    return result;
};
