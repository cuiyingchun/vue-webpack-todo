const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.[hase:8].js',
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
            // {
            //     test:/\.less$/,
            //     use:[
            //         'style-loader',
            //         'css-loader',
            //         {
            //             loader:'postcss-loader',
            //             options:{
            //                 sourceMap:true,
            //             }
            //         },
            //         'less-loader'
            //     ]
            // },
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
    //开发环境
    config.module.rules.push(
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
        }
    )
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
}else{
    //正式环境
   /* config.entry={
        app:path.join(__dirname,'src/index.js'),
        vendor:['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test:/\.less$/,
            use:ExtractPlugin.extract({//抽离css样式插件的 具体应用
               fallback:'style-loader',//将下面的传出的css代码转化为.css文件
                use:[
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        option:{
                            sourceMap:true
                        }
                    },
                    'less-loader'
                ]
            })
        },
    )
    config.plugins.push(
        //抽离css样式插件的 输出 为 styles.[contentHash:8].css，并为其加上contentHash码
        new ExtractPlugin('styles.[contentHash:8].css'),       //一个哈希值
        new webpack.optimize.CommonsChunkPlugin({
            //CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。这个带来速度上的提升
            //将定义的支持库抽出，减小业务代码.js文件的大小，因为支持库不经常更新，单独抽出可以作为常用文件缓存于浏览器中，减少网络负载
            name:'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({//将webpack自身代码抽出为一个单独的.js文件
            name:'runtime'
        })
    )*/
    config.entry = {
        app : path.join(__dirname,'src/index.js'),// 重定向入口文件
        vendor:['vue']// 将支持库例如Vue 源码单独存储
    }
    config.output.filename = '[name].[chunkhash:8].js',//设置出口文件的文件名
    config.module.rules.push(
        {
            test: /\.less$/,
            use: ExtractPlugin.extract({//抽离css样式插件的 具体应用
                fallback:'style-loader',//将下面的传出的css代码转化为.css文件
                use:[//.styl文件经过处理后转化为css代码
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true,
                        }
                    },
                    'less-loader'
                ]
            })
        }
    ),
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),//抽离css样式插件的 输出 为 styles.[contentHash:8].css，并为其加上contentHash码
        new webpack.optimize.CommonsChunkPlugin({//CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。这个带来速度上的提升
            name:'vendor'//将支持库抽出，减小业务代码.js文件的大小，因为支持库不经常更新，单独抽出可以作为常用文件缓存于浏览器中，减少网络负载
        }),
        new webpack.optimize.CommonsChunkPlugin({//
            name:'runtime'//将webpack自身代码抽出为一个单独的.js文件
        })
    )
}

module.exports = config;