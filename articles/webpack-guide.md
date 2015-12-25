# webpack 学习

react webpack

---

# 官网及参考

[官网](http://webpack.github.io/)
[Webpack 中文指南](https://github.com/zhaoda/webpack-handbook)
[Webpack tutorials](http://webpack.github.io/docs/list-of-tutorials.html)
[react webpack 小书](https://fakefish.github.io/react-webpack-cookbook/)
[webpack-howto](https://github.com/petehunt/webpack-howto)
[Webpack 怎么用](http://segmentfault.com/a/1190000002552008)
[Webpack傻瓜式指南（一）](http://zhuanlan.zhihu.com/FrontendMagazine/20367175) 
[Webpack傻瓜指南（二）开发和部署技巧](http://zhuanlan.zhihu.com/FrontendMagazine/20397902)


# webpack 命令行参数

## --module-bind  模块绑定
举个例子，就会明白，比如有css文件 style.css js文件 entry.js

style.css 文件
    /* style.css */
    body { background: yellow; }

entry.js文件

    require("!style!css!./style.css"); // 载入 style.css
    document.write('It works.');
    document.write(require('./module.js'));

安装 loader：

    npm install css-loader style-loader --save-dev

编译命令

    $ webpack entry.js bundle.js

如果每次 require CSS 文件的时候都要写 loader 前缀，是一件很繁琐的事情，这是就可以利用模块绑定参数来设置对应的模块名来自动绑定需要的 loader。

将 entry.js 中的 require("!style!css!./style.css") 修改为 require("./style.css") ，然后执行：

    $ webpack entry.js bundle.js --module-bind 'css=style!css'

## --progress 让编译的输出内容带有进度
## --colors 让编译的输出内容带有颜色
## --watch 开启监听模式，自动编译
如果不想每次修改模块后都重新编译，那么可以启动监听模式。开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度是很快的。

## --display-error-details 打印错误详情
关于处理错误信息，Webpack 的配置提供了 resolve 和 resolveLoader 参数来设置模块解析的处理细节，resolve 用来配置应用层的模块（要被打包的模块）解析，resolveLoader 用来配置 loader 模块的解析。

当引入通过 npm 安装的 Node.js 模块时，可能出现找不到依赖的错误。Node.js 模块的依赖解析算法很简单，是通过查看模块的每一层父目录中的 node_modules 文件夹来查询依赖的。当出现 Node.js 模块依赖查找失败的时候，可以尝试设置 resolve.fallback 和 resolveLoader.fallback 来解决问题。

```javascript
module.exports = {
  resolve: { fallback: path.join(__dirname, "node_modules") },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") }
};
```
另外，Webpack 中涉及路径配置最好使用绝对路径，建议通过 path.resolve(__dirname, "app/folder") 或 path.join(__dirname, "app", "folder") 的方式来配置，以兼容不同系统环境。

## --devtool eval 开启开发调试模式
为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号，可以设置为 eval 、 source-map 或 eval-source-map

## Development shortcut -d
Equals to --debug --devtool source-map --output-pathinfo
相当于开启 debug  devtool source-map 和 output-pathinfo 模式

## Production shortcut -p
Equals to --optimize-minimize --optimize-occurence-order
开启压缩代码模式，主要正式发布代码时开启

## --config 
重新设置 webpack 配置文件

## --json
按照 json格式输出到控制台

其他命令行参数参考这里 http://webpack.github.io/docs/cli.html

# webpack 参数设置
[官方配置项说明](http://webpack.github.io/docs/configuration.html)
## debug 

# webpack es6 

只需把 webpack 配置文件后缀改为babel，即webpack.config.babel.js，babel就会自动编译的。

# 插件

## BannerPlugin 
该插件的作用是给输出的文件头部添加注释信息
例子

```javascript
  ...
  plugins: [
    new webpack.BannerPlugin('This file is created by Linder Wang.')
  ]
  ...
```
运行 webpack，打开生成的js文件，可以看到文件头部出现了我们指定的注释信息

```javascript
/*! This file is created by Linder Wang. */
/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};
// 后面代码省略
```

## [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) 自动生成相关html

> npm i html-webpack-plugin --save-dev

## [webpack-dev-server](https://github.com/webpack/webpack-dev-server) webpage 服务

> npm i webpack-dev-server --save-dev

[官方文档](http://webpack.github.io/docs/webpack-dev-server.html)

相关命令参数
--inline 自动刷新页面
当修改代码后，会自动刷新页面。自动刷新包括两种方式
Iframe mode (page is embedded in an iframe and reloaded on change)
Inline mode (a small webpack-dev-server client entry is added to the bundle which refresh the page on change)

Iframe mode
该模式不需要额外的配置项，但需要在地址栏中加上 http://<host>:<port>/webpack-dev-server/<path> ，比如 http://localhost:8080/webpack-dev-server/index.html

Inline mode
需要添加配置文件

```javascript
entry: {
    index: ['./app.js', 'webpack-dev-server/client?http://localhost:8080' ]
  },
```  
同时在启动命令行中加入参数 --inline 

也可以直接在页面中加入以下脚本

    <script src="http://localhost:8080/webpack-dev-server.js"></script>

--hot 热部署
热部署，需要添加 webpack/hot/dev-server 设置
```javascript
entry: {
    index: ['./app.js', 'webpack-dev-server/client?http://localhost:8080','webpack/hot/dev-server' ]
  },
```  

同时设置 hot 为 true，并添加插件 new webpack.HotModuleReplacementPlugin()

```javascript
var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  hot: true
  ...
});
server.listen(8080);
```

我们也可以利用中间件 [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) 来设置热部署，具体配置看官网

Proxy 代理
通过设置代理可以实现跨域访问，这样我们就不用启动第三方代理服务，如nginx，设置如下，其中bypass可以处理或略的代理。具体代理设置可参考 https://github.com/nodejitsu/node-http-proxy

```javascript
{
    devServer: {
        proxy: {
            '/some/path*': {
                target: 'https://other-server.example.com',
                secure: false,
                bypass: function(req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                },
            },
        },
    },
}
```

其他参数
--content-base &lt;file/directory/url/port&gt; 上下文目录，例如 --content-base app 只监听 app 目录下的文件
--quiet 设为true，不把任何信息输出到控制台
--no-info: suppress boring information.
--colors: add some colors to the output.
--no-colors: don’t used colors in the output.
--host <hostname/ip>: hostname or IP.
--port <number>: port.
--inline: embed the webpack-dev-server runtime into the bundle.
--hot: adds the HotModuleReplacementPlugin and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice.
--hot --inline also adds the webpack/hot/dev-server entry.
--lazy: no watching, compiles on request (cannot be combined with --hot).
--https: serves webpack-dev-server over HTTPS Protocol. Includes a self-signed certificate that is used when serving the requests.
--cert, --cacert, --key: Paths the certificate files.

注意：所有 webpack 命令项都可以应用到 webpack dev server 中 （All webpack CLI options are valid for the webpack-dev-server CLI too）

关于 webpack dev server 官方提供了一个详细的例子
```javascript
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var compiler = webpack({
  // configuration
});
var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options

  contentBase: "/path/to/directory",
  // or: contentBase: "http://localhost/",

  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: false,

  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "*" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    "*": "http://localhost:9090"
  },

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: true,
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: "/assets/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true },
});
server.listen(8080, "localhost", function() {});
// server.close();
```


# loader 命名规范
按照惯例，而非必须，loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。

在引用 loader 的时候可以使用全名 json-loader，或者使用短名 json。这个命名规则和搜索优先级顺序在 webpack 中 resolveLoader.moduleTemplates api 定义。

> Default: ["\*-webpack-loader", "\*-web-loader", "\*-loader", "\*"]

# 利用Yeoman来生成一个基于react和webpack项目

这里提供一个关注度比较高的 Yeoman webpack生成器
https://github.com/newtriks/generator-react-webpack

# gulp 和 webpage 整合 
我们利用 [gulp-webpack](https://www.npmjs.com/package/gulp-webpack) 来整合我们的打包项目

# 实例
该实例基于 react 如果想查看该实例，请看 [这里](https://github.com/demones/react-guide/tree/master/examples/webpack-react-config)

## 依赖的 npm 包

 1. [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) 转换编译 es6 
 2. [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015) babel 预置 es2015 插件，需要在根目录下加入 .babelrc，并设置

```javascript
 {
  "presets": ["es2015"]
 }
```

 3. [babel-preset-react](https://github.com/babel/babel/tree/master/packages/babel-preset-react) 同上，babel 预置 react 插件
 4. [webpack](https://github.com/webpack/webpack)
 5. [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
 6. [babel-loader](https://github.com/babel/babel-loader) webpack babel 模块
 7. [babel-plugin-transform-runtime](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime)
 8. [css-loader](https://github.com/webpack/css-loader)
 9. [style-loader](https://github.com/webpack/style-loader)
 10. [sass-loader](https://github.com/jtangelder/sass-loader) webpack sass 模块，解析sass为css，结合 css-loader 和 style-loader使用
 11. [eslint-loader](https://github.com/MoOx/eslint-loader) webpack eslint loader 模块，用来检测js语法和书写格式等
 12. [file-loader](https://github.com/webpack/file-loader) 用来处理文件路径、名称、哈希等。
 13. [url-loader](https://github.com/webpack/url-loader) 用来处理图片，把图片转换成 Data Url 格式
 14. [postcss-loader](https://github.com/postcss/postcss-loader) 用postcss 处理 css样式
 15. [node-sass](https://github.com/sass/node-sass) 用来编译sass文件为css，sass-loader中要用到
 16. [postcss](https://github.com/postcss/postcss)
 17. [autoprefixer](https://github.com/postcss/autoprefixer) 自动补全不同浏览器的css样式前缀
 18. [precss](https://github.com/jonathantneal/precss) 可以在css中使用变量，条件等语法
 19. [react](https://github.com/facebook/react) react 
 20. [react-dom](https://github.com/facebook/react)
 21. [eslint](http://eslint.org/) 检测js助手 
 22. [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) eslint 插件 react

