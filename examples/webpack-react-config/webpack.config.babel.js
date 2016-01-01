import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';

// https://github.com/glenjamin/webpack-hot-middleware
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=false';
// https://github.com/webpack/webpack-dev-server
const webpackDevServer = 'webpack-dev-server/client?http://localhost:8080';

const appPath = path.resolve(__dirname, 'app');

module.exports = {
  // eslint 配置
  eslint: {
    emitError: true, // 验证失败，终止
    configFile: 'D:/gitworkspace/eslint-config/react-es6/.eslintrc'
  },
  // sass 配置
  sassLoader: {
    includePaths: [path.resolve(appPath, 'sass')]
  },
  cache: true, //是否开启缓存模式，开启缓存，实时编译时提高性能
  debug: true, //切换到debug模式
  devtool: 'source-map', //生成 source map文件

  // 插件 postcss 配置设置
  postcss: () => {
    return {
      defaults: [autoprefixer, precss],
      cleaner: [autoprefixer({browsers: []})]
    };
  },

  // 配置  webpack-dev-server 设置
  devServer: {
    historyApiFallback: true,
    progress: true,
    hot: true,
    inline: true,
    // 代理设置
    proxy: {
      '/some/path/*': {
        target: 'https://other-server.example.com',
        secure: false,
        bypass (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        }
      }
    }
  },

  resolve: {
    root: [appPath], // 设置要加载模块根路径，该路径必须是绝对路径
    //自动扩展文件后缀名
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    //模块别名定义，方便直接引用别名
    alias: {
      sass: path.resolve(appPath, 'sass'),
      containers: path.resolve(appPath, 'scripts/containers'),
      components: path.resolve(appPath, 'scripts/components')
    }
  },

  // 入口文件 让webpack用哪个文件作为项目的入口
  entry: {
    index: ['./app/scripts/containers/index.js', webpackDevServer, hotMiddlewareScript],
    home: ['./app/scripts/containers/home.js', webpackDevServer, hotMiddlewareScript],
    //添加要打包在vendors里面的库，作为公共的js文件
    vendors: ['moment']
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
        cacheDirectory: true, // 开启缓存
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-runtime']
        }
      },
      // https://github.com/jtangelder/sass-loader
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'],
        outputStyle: 'expanded'
      },
      // https://github.com/webpack/extract-text-webpack-plugin 单独引入css文件
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url?limit=10000', // 10kb
        query: {
          mimetype: 'image/png'
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(), //
    new webpack.HotModuleReplacementPlugin(), // 热部署替换模块
    new webpack.NoErrorsPlugin(), //
    //把入口文件里面的 vendors 包含的js文件 打包成verdors.js，除了指定的verdors外，多个入口的公共文件也会被打包到 vendors中
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),
    new ExtractTextPlugin('styles/[name].css?[hash]-[chunkhash]-[contenthash]-[name]', {
      disable: false,
      allChunks: true
    }),

    //创建 HtmlWebpackPlugin 的实例
    new HtmlwebpackPlugin({
      title: '首页',
      template: path.resolve(appPath, 'templates/layout.html'),
      filename: 'index.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['index', 'vendors'],
      //要把script插入到标签里
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'home页',
      template: path.resolve(appPath, 'templates/layout.html'),
      filename: 'home.html',
      //chunks这个参数告诉插件要引用entry里面的哪几个入口
      chunks: ['home', 'vendors'],
      //要把script插入到标签里
      inject: 'body'
    })
  ]
};
