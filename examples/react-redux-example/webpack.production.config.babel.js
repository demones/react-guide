import path from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';

const appPath = path.resolve(__dirname, 'app');

module.exports = {
  resolve: {
    root: [appPath], // 设置要加载模块根路径，该路径必须是绝对路径
    //自动扩展文件后缀名
    extensions: ['', '.js', '.jsx', '.json', '.css'],
    //模块别名定义，方便直接引用别名
    alias: {
      containers: path.resolve(appPath, 'scripts/containers'),
      components: path.resolve(appPath, 'scripts/components')
    }
  },
  entry: {
    index: ['./app/scripts/containers/index.js'],
    home: ['./app/scripts/containers/home.js'],
    //添加要打包在vendors里面的库，作为公共的js文件
    vendors: []
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //打包输出目录
    filename: '[name].[hash].bundle.js', //文件名称
    publicPath: '/' //生成文件基于上下文路径
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-runtime']
        }
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
      }
    ]
  },

  plugins: [
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),
    new ExtractTextPlugin('styles/[name].css?[hash]-[chunkhash]-[contenthash]-[name]', {
      disable: false,
      allChunks: true
    }),
    // http://webpack.github.io/docs/list-of-plugins.html#dependency-injection
    // 替换全局变量，根据需要待加
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // 相当于命令参数 --optimize-dedupe
    new webpack.optimize.DedupePlugin(),
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // 相当于命令参数 --optimize-minimize
    new webpack.optimize.UglifyJsPlugin(),

    // 创建 HtmlWebpackPlugin 的实例
    // https://www.npmjs.com/package/html-webpack-plugin
    new HtmlwebpackPlugin({
      title: '首页',
      template: path.resolve(appPath, 'templates/layout.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['index', 'vendors'],
      //要把script插入到标签里
      inject: 'body',
      minify: {
        removeComments: true
      }
    }),

    new HtmlwebpackPlugin({
      title: 'home页',
      template: path.resolve(appPath, 'templates/layout.html'),
      filename: 'home.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['home', 'vendors'],
      //要把script插入到标签里
      inject: 'body',
      minify: {
        removeComments: true
      }
    })
  ]
};
