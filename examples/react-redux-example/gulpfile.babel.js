import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import gutil from 'gulp-util';
import opn from 'opn';
import del from 'del';

import config from './webpack.config.babel';
import productionConfig from './webpack.production.config.babel';

const $ = gulpLoadPlugins();
const ip = 'localhost';
const port = '9090';
let webpackDevServer;

//清理临时和打包目录
gulp.task('clean', del.bind(null, ['dist']));

//启动服务
gulp.task('server', () => {
  // Start a webpack-dev-server
  const compiler = webpack(config);

  webpackDevServer = new WebpackDevServer(compiler, config.devServer);
  webpackDevServer.listen(port, ip, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    // Server listening
    gutil.log('[webpack-dev-server]', `http://${ip}:${port}`);

    // keep the server alive or continue?
    opn(`http://${ip}:${port}/`, {app: 'chrome'});
  });
});

// 用webpack 打包编译
gulp.task('webpack', () => {

  const compiler = webpack(productionConfig);
  // run webpack
  compiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
  });
});

// 编译打包
gulp.task('build', ['clean', 'sass', 'webpack'], () => {
  // 计算文件大小
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

//默认任务
gulp.task('default', () => {
  gulp.start('build', 'server');
});
