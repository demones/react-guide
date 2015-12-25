import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import HtmlwebpackPlugin from 'html-webpack-plugin';

const appPath = path.resolve(__dirname, 'app');

module.exports = {
  // sass 配置
  sassLoader: {
    includePaths: [path.resolve(appPath, 'sass')]
  },
  // 插件 postcss 配置设置
  postcss: () => {
    return {
      defaults: [autoprefixer, precss],
      cleaner: [autoprefixer({browsers: []})]
    };
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
  entry: {
    index: ['./app/scripts/containers/index.js'],
    home: ['./app/scripts/containers/home.js'],
    //添加要打包在vendors里面的库，作为公共的js文件
    vendors: ['moment']
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //打包输出目录
    filename: '[name].[hash].bundle.js' //文件名称
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
      // https://github.com/jtangelder/sass-loader
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'],
        outputStyle: 'expanded'
      },
      // https://github.com/webpack/url-loader
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url?size=8192',
        query: {
          mimetype: 'image/png'
        }
      }
    ]
  },

  plugins: [
    //把入口文件里面的数组打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js'),

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
