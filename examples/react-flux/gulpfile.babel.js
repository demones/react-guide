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

// 解决gulp不能利用babel正确解决编译es6的问题
// https://markgoodyear.com/2015/06/using-es6-with-gulp/
// 部分配置参考 https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js

//利用sass生成styles任务
gulp.task('sass', () => {
  return gulp.src('app/sass/*.scss')
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('app/styles'));
});

//复制app下其他文件到dist下
gulp.task('extras', () => {
  return gulp.src([
    'app/*.*'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

//清理临时和打包目录
gulp.task('clean', del.bind(null, ['dist']));

//启动服务
gulp.task('server', ['sass'], () => {
  // Start a webpack-dev-server
  const compiler = webpack(config);

  webpackDevServer = new WebpackDevServer(compiler, config.devServer);
  webpackDevServer.listen(port, ip, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    // Server listening
    gutil.log('[webpack-dev-server]', `http://${ip}:${port}/index.html`);

    // keep the server alive or continue?
    opn(`http://${ip}:${port}/`, {app: 'chrome'});
  });

  gulp.watch('app/sass/**/*.scss', ['sass']);
  //gulp.watch('webpack.config.babel.js', ['reload']);
});

//关闭服务
gulp.task('close', () => {
  webpackDevServer.close();
});

//重启服务
gulp.task('reload', () => {
  webpackDevServer.close();
  setTimeout(() => {
    gulp.start('server');
  }, 1000);
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
    gulp.run(['extras']);
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
