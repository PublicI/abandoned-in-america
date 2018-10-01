const pkg = require('./package.json');

module.exports = {
    /*
     ** Headers of the page
     */
    loading: false,
    head: {
        title: 'Abandoned in America',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: `/${pkg.name}/favicon.ico`
            }
        ]
    },
    modules: [
        '@nuxtjs/axios',
        [
            '@nuxtjs/google-analytics',
            {
                id: 'UA-3383794-4',
                debug: {
                    sendHitTask: !(
                        typeof document !== 'undefined' &&
                        document &&
                        document.referrer &&
                        document.referrer.indexOf('publicintegrity.org') !== -1
                    )
                }
            }
        ]
    ],
    render: {
        ssr: false
    },
    plugins: [
        { src: '~/plugins/pym.js', ssr: false },
        { src: '~/plugins/typekit.js', ssr: false },
        { src: '~/plugins/chartbeat.js', ssr: false }
    ],
    axios: {
        host: process.env.HOST || 'localhost',
        prefix: `/${pkg.name}/`,
        port: process.env.PORT || 3000,
        https: true
    },
    generate: {
        minify: {
            collapseWhitespace: false,
            removeEmptyAttributes: false
        },
        routes: ['/fresno', '/yazoo', '/standing-rock', '/st-louis', '/presidio', '/lumberton']
    },
    router: {
        base: `/${pkg.name}/`
    },
    /*
     ** Global CSS
     */
    css: ['~/assets/css/site.css', '~/assets/css/main.css'],
    serverMiddleware: [
        // API middleware
        '~/server/index.js'
    ],
    /*
     ** Add axios globally
     */
    build: {
        /*
         ** Run ESLINT on save
         */
        extend(config, ctx) {
            /*            config.module.rules.push({
                test: /\.(csv)$/,
                loader: 'dsv-loader',
                exclude: /(node_modules)/
            });
*/

            config.module.rules.push({
                test: /\.csv$/,
                use: [{ loader: 'raw-loader' }]
            });

            if (ctx.isClient && process.env.NODE_ENV !== 'production') {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
