export default defineNuxtConfig({
    runtimeConfig: {
        apiSecret: process.env.API_PRIVATE_KEY,
        public: {
            rpcUrl: process.env.RPC_URL,
            rpcUser: process.env.RPC_USER,
            rpcPassword: process.env.RPC_PASSWORD,
            apiBase: process.env.API_URL,
            apiBase2: process.env.API_URL2,
            apiBasePrice: process.env.API_URL_PRICE,
        },
    },

    typescript: {
        typeCheck: false
    },

    app: {
        head: {
            title: 'BTCPAW | bitcoin explorer',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Your Premier Block Explorer and Analytics Platform for Bitcoin' },
                { name: "google-site-verification", content: "fRM5FTZ5bZt5MRpwplDneJwVFNFflKfq-jVZrpXB3kc" },
                { name: "google-adsense-account", content: "ca-pub-9944647203025348" },
            ],
            script: [
                { 
                    src: 'https://www.googletagmanager.com/ns.html?id=GTM-MZNPBKW7',
                    async: true,
                },
                {
                    id: 'ga-analytics',
                    children: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-MZNPBKW7');
                    `
                },
                {
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    async: true,
                    crossorigin: 'anonymous',
                    'data-ad-client': 'ca-pub-9944647203025348',
                },
            ],
            link: [
                {
                    id: 'theme-css',
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: '/themes/md-light-indigo/theme.css'
                }
            ]
        }
    },

    modules: [
        'nuxt-primevue',
        '@nuxtjs/sitemap',
    ],

    primevue: {
        options: { ripple: true },
        components: {
            exclude: ['Editor']
        }
    },

    sitemap: {
        sitemaps: {
            pages: {
                includeAppSources: true,
            },        
        }
    },

    css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss'],
    compatibilityDate: '2024-10-30',
});