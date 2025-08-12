export default defineNuxtConfig({
    runtimeConfig: {
        apiSecret: process.env.API_PRIVATE_KEY,
        rpcUrl: process.env.RPC_URL,
        rpcUser: process.env.RPC_USER,
        rpcPassword: process.env.RPC_PASSWORD,
        apiBase: process.env.API_URL,
        apiBase2: process.env.API_URL2,
        apiBasePrice: process.env.API_URL_PRICE,
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