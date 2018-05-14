const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',  //读出CSS写入HTML中
                    'css-loader'
                ]
            },
            {  //针对.styl的文件
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true,
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test:/\.sass$/,
                loader:'style-loader!css-loader!sass-loader'

            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {  //配置一些选项,用对象去声明
                        loader:'url-loader',  //可以直接将图片转换为64位代码，写在js中
                        options:{
                            limit:1024,  //大小
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true,
        },
        hot:true   //热加载
        // historyFallback:{
        //
        // }
        // open:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;