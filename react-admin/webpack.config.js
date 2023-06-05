const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 简化HTML文件的创建，以服务您的webpack捆绑包
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'); //   区分大小写的插件
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // Webpack插件，用于优化\最小化CSS资产
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // 在单独的进程上运行类型脚本类型检查器和linter。
const TerserPlugin = require('terser-webpack-plugin'); // 此插件使用terser来最小化/最小化您的JavaScript。
const os = require('os');

const { name, version } = require('./package.json');

const matchSVGSprite = /assets\/icons\/|components\/Base\/Icon\/icons\//;

const es6modules = ['query-string', 'split-on-first', 'strict-uri-encode', 'array-move', '@shuwen/oss-store', 'debug', 'dom-serializer', 'pinyin'];

const createCssLoaders = (isLess, isDev, isMagicUI) => { // true isDec true
    const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

    if (isLess) {
        return [
            styleLoader,
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: isMagicUI ? '[local]' : '[local]-[hash:base64:6]',
                    // getLocalIdent: (context, localIdentName, localName, options) => {
                    //   if (localName.includes('ant-dropdown')) {
                    //     console.log(context);
                    //   }
                    //   return `${localName}${getLocalIdent(context, localIdentName, localName, options)}`;
                    // },
                },
            },
            'postcss-loader',
            {
                loader: 'less-loader',
                options: {
                    // modifyVars: {
                    //     // 'ant-prefix': 'ant-host'
                    // },
                    javascriptEnabled: true,
                },
            },
            {
                loader: 'style-resources-loader',
                options: {
                    // less 全局变量
                    patterns: path.resolve(__dirname, './src/assets/less/index.less'),
                    injector: 'append',
                },
            },
        ];
    } else {
        return [styleLoader, 'css-loader'];
    }
};

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';
    const { ESLINT_LOADER_DISABLED, IS_REAL_PROD } = process.env; // 通过环境变量禁用 eslint-loader
    let publicPath = '';
    if (isDev) {
        publicPath = '/';
    } else if (IS_REAL_PROD) {
        publicPath = `//s.newscdn.cn/${name}/${version}/`;
    }

    return {
        entry: {
            index: [path.resolve(__dirname, 'src/index.ts')],
        },

        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
            publicPath,
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        isDev ? 'cache-loader' : null,
                        'thread-loader',
                        {
                            loader: 'babel-loader',
                            options: {
                                sourceType: 'unambiguous',
                                presets: [
                                    '@babel/preset-react',
                                    isDev
                                        ? null
                                        : [
                                            '@babel/preset-env',
                                            {
                                                modules: false,
                                            },
                                        ],
                                ].filter(Boolean),
                                plugins: [
                                    '@babel/plugin-syntax-dynamic-import',
                                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                                    '@babel/plugin-proposal-class-properties',
                                    [
                                        '@babel/plugin-transform-runtime',
                                        {
                                            useESModules: true,
                                        },
                                    ],
                                    '@babel/plugin-proposal-optional-chaining',
                                    // ['import', {
                                    //   libraryName: 'antd',
                                    //   libraryDirectory: 'es',
                                    //   style: 'css',
                                    // }],
                                    // ['import', {
                                    //   libraryName: 'lodash',
                                    //   libraryDirectory: '',
                                    //   camel2DashComponentName: false,
                                    // }, 'lodash'],
                                    // 'dva-hmr', // TODO
                                ],
                                cacheDirectory: true,
                                cacheCompression: false,
                            },
                        },
                        ...(isDev && !ESLINT_LOADER_DISABLED ? ['eslint-loader'] : []),
                    ].filter(Boolean),
                    exclude: [new RegExp(`node_modules/(?!(${es6modules.join('|')})/).*`)],
                },
                {
                    test: /\.tsx?/,
                    use: [
                        isDev ? 'cache-loader' : null,
                        {
                            loader: 'thread-loader',
                            options: {
                                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                worker: os.cpus().length - 1,
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                happyPackMode: true,
                                transpileOnly: true,
                                compilerOptions: {
                                    noEmit: false,
                                    module: 'esnext',
                                    target: isDev ? 'es2017' : 'es5',
                                },
                            },
                        },
                    ].filter(Boolean),
                },
                {
                    test: /\.(mp4|png|jpg|jpeg|png|svg|cur|gif|webp)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: 'static/[name].[hash].[ext]',
                            },
                        },
                    ],
                    exclude: matchSVGSprite,
                },
                {
                    test: /\.svg$/,
                    include: matchSVGSprite,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                symbolId: 'icon-[name]',
                            },
                        },
                    ],
                },
                {
                    test: /(magic-ui|magic-theme-color)\/.*\.less$/,
                    use: createCssLoaders(true, isDev, true),
                },
                {
                    test: /\.less$/,
                    exclude: /(magic-ui|magic-theme-color)\/.*\.less$/,
                    use: createCssLoaders(true, isDev, false),
                },
                {
                    test: /\.css$/,
                    use: createCssLoaders(false, isDev),
                },
            ],
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|less)$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
            minimize: !isDev,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            pure_funcs: ['console.log'],
                        },
                    },
                }),
            ],
        },

        plugins: [
            new ForkTsCheckerWebpackPlugin({
                checkSyntacticErrors: true,
                async: false,
            }),
            new CaseSensitivePathsPlugin(),

            new SpriteLoaderPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            //   ...(isDev ? [] : [
            //     new MiniCssExtractPlugin({
            //       // filename: '[name].css',
            //       // chunkFilename: '[id].css',
            //     }),
            //     new OptimizeCSSAssetsPlugin(),
            //   ]),
            ...(isDev
                ? []
                : [
                    new MiniCssExtractPlugin({
                        // filename: '[name].css',
                        // chunkFilename: '[id].css',
                    }),
                    new OptimizeCSSAssetsPlugin(),
                ]),

            // new webpack.DllReferencePlugin({
            //     manifest: isDev ? manifestDev : manifest,
            // }),
            // new BundleAnalyzerPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || argv.mode),
                'process.env.TYPE': JSON.stringify(process.env.type || argv.type),
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, './src/index.ejs'),
                // chunksSortMode: 'none',
                publicPath,
            }),
        ],

        externals: {},

        resolve: {
            symlinks: false,
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            alias: {
                '@': path.resolve(__dirname, 'src/'),
                components: path.resolve(__dirname, 'src/components/'),
                services: path.resolve(__dirname, 'src/services/'),
                utils: path.resolve(__dirname, 'src/utils/'),
                '@magicUI': path.resolve(__dirname, 'src/magicUI/'),
            },
        },

        devServer: {
            port: 8031,
            disableHostCheck: true,
            historyApiFallback: true,
            host: '0.0.0.0',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            proxy: {
              '/api': {
                target: 'http://l.tyucr7q.asia:8030',
                changeOrigin: true,
              },
            },
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: true,
                assets: false,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: false,
                warnings: true,
                publicPath: false,
                warningsFilter: /export .* was not found in/,
            },
        },

        // 开发环境 eval 的速度最快，调试比较准确（实际运行的代码和 devtool 看到的一致，不容易出现断点打不上的问题）
        // 生产环境 sourcemap 只包含文件名和行信息
        devtool: isDev ? 'inline-source-map' : 'nosources-source-map',

        stats: {
            children: false,
            warningsFilter: (warning) => /(Conflicting order between)|(export .* was not found in)/gm.test(warning),
        },
    };
};
