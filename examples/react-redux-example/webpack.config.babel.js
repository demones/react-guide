import path from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';

const hotDevServer = 'webpack/hot/dev-server';
// https://github.com/webpack/webpack-dev-server
const webpackDevServer = 'webpack-dev-server/client?http://localhost:9090';

const appPath = path.resolve(__dirname, 'app');

let webpackConfig = {
  // eslint 配置
  eslint: {
    emitError: true, // 验证失败，终止
    configFile: '/Users/wangyanjun/gitworkspace/eslint-config/react-es6/.eslintrc' // for mac
    //configFile: 'D:/gitworkspace/eslint-config/react-es6/.eslintrc'
  },
  cache: true, //是否开启缓存模式，开启缓存，实时编译时提高性能
  debug: true, //切换到debug模式
  devtool: 'cheap-module-eval-source-map', //生成 source map文件，上线设为 source-map

  // 配置  webpack-dev-server 设置
  // 关于热部署，看 http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement-with-node-js-api
  devServer: {
    contentBase: './app',
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    quiet: false, // 设为true，不把任何信息输出到控制台
    publicPath: '/'
  },

  resolve: {
    root: [appPath], // 设置要加载模块根路径，该路径必须是绝对路径
    //自动扩展文件后缀名
    extensions: ['', '.js', '.jsx', '.json', '.css'],
    //模块别名定义，方便直接引用别名
    alias: {}
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    index: [webpackDevServer, hotDevServer, './app/index.js'],
    counter: [webpackDevServer, hotDevServer, './app/counter/index.js'],
    todomvc: [webpackDevServer, hotDevServer, './app/todomvc/index.js'],
    todoswithundo: [webpackDevServer, hotDevServer, './app/todos-with-undo/index.js'],
    async: [webpackDevServer, hotDevServer, './app/async/index.js'],
    realworld: [webpackDevServer, hotDevServer, './app/real-world/index.js'],
    shoppingcart: [webpackDevServer, hotDevServer, './app/shopping-cart/index.js'],
    //curdexample: [webpackDevServer, hotDevServer, './app/curd-example/index.js'],
    curd: [webpackDevServer, hotDevServer, './app/curd-demo/index.js'],
    curdfinal: [webpackDevServer, hotDevServer, './app/curd-demo/index.js'],
    //添加要打包在vendors里面的库，作为公共的js文件
    vendors: []
  },

  // 出口 让webpack把处理完成的文件放在哪里
  output: {
    path: path.resolve(__dirname, 'dist'), //打包输出目录
    filename: '[name].[hash].bundle.js', //文件名称：生成Hash名称来防止缓存
    publicPath: '/' //生成文件基于上下文路径
  },

  // 模块 要用什么不同的模块来处理各种类型的文件
  module: {
    // https://github.com/MoOx/eslint-loader
    preLoaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'eslint'
    }],
    loaders: [
      // https://github.com/babel/babel-loader
      {
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        exclude: /(node_modules|bower_components)/,
        cacheDirectory: true // 开启缓存
        // 以下设置可不写，在 .babelrc 中设置即可
        /*query: {
          presets: ['stage-0', 'es2015', 'react'],
          plugins: ['transform-runtime']
        }*/
      },
      // https://github.com/webpack/extract-text-webpack-plugin 单独引入css文件
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpg|gif|woff|woff2|svg)$/,
        loader: 'url?limit=10000', // 10kb
        query: {
          mimetype: 'image/png'
        }
      },
      // https://www.npmjs.com/package/json-loader 把 json 字符串转换成对象
      {
        test: /\.json$/,
        loaders: ['json'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(), //
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoErrorsPlugin(), //
    //把入口文件里面的 vendors 包含的js文件 打包成verdors.js，除了指定的verdors外，多个入口的公共文件也会被打包到 vendors中
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),

    new ExtractTextPlugin('styles/[name].[hash].css', {
      disable: false,
      allChunks: true
    })
  ]
};

//创建 HtmlWebpackPlugin 的实例
const entry = webpackConfig.entry;

// 为 HtmlwebpackPlugin 设置配置项，与 entry 键对应，根据需要设置其参数值
const htmlwebpackPluginConfig = {
  index: {
    title: '官方例子列表'
  },
  counter: {
    title: '官方例子 Counter'
  },
  todomvc: {
    title: '官方例子 Redux TodoMVC example'
  },
  todoswithundo: {
    title: '官方例子 Redux todos with undo example'
  },
  async: {
    title: '官方例子 Redux async example'
  },
  realworld: {
    title: '官方例子 Redux real-world example'
  },
  shoppingcart: {
    title: '官方例子 Redux shopping cart example'
  },
  /*curdexample: {
    title: '一个简单的增删改查例子'
  },*/
  curdfinal: {
    title: '一个简单的增删改查例子'
  },
  curd: {
    title: '一个简单的增删改查例子（演示）'
  }
};

for (let key in entry) {
  if (entry.hasOwnProperty(key) && key !== 'vendors') {
    webpackConfig.plugins.push(
      new HtmlwebpackPlugin({
        title: htmlwebpackPluginConfig[key].title,
        template: path.resolve(appPath, 'templates/layout.html'),
        filename: `${key}.html`,
        //chunks这个参数告诉插件要引用entry里面的哪几个入口
        chunks: [key, 'vendors'],
        //要把script插入到标签里
        inject: 'body'
      })
    );
  }
}


module.exports = webpackConfig;
