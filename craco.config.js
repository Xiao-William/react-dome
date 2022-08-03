const CracoLessPlugin = require('craco-less')

const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
    webpack: {
        alias: {
            '@': pathResolve('src'),
        }
    },
    babel: {
        plugins: [
            ['import', { libraryName: 'antd', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {},
                        javascriptEnabled: true
                    }
                }
            }
        }
    ]
}

