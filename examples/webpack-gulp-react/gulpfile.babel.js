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

//对于没有写到样式中的图片，执行该任务来优化图片
gulp.task('images', () => {
  return gulp.src(['app/img/**'], {dot: true})
    .pipe($.if($.if.isFile,
      $.cache(
        $.imagemin({
          progressive: true,
          interlaced: true,
          // don't remove IDs from SVGs, they are often used
          // as hooks for embedding and styling
          svgoPlugins: [{cleanupIDs: false}]
        }))
        .on('error', function (err) {
          console.log(err);
          this.end();
        })))
    .pipe(gulp.dest('dist/images'));
});

//替换任务
gulp.task('replace', () => {
  gulp.src(['dist/vendors*.js'])
    .pipe($.replace('replace1', ''))
    .pipe($.replace(/(replace1)/, '$1linder'))
    .pipe(gulp.dest('dist'));
});

//清理临时和打包目录
gulp.task('clean', del.bind(null, ['dist']));

//启动服务
gulp.task('server', ['sass'], () => {
  // Start a webpack-dev-server
  const compiler = webpack(config);

  new WebpackDevServer(compiler, config.devServer)
    .listen(port, ip, (err) => {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      // Server listening
      gutil.log('[webpack-dev-server]', `http://${ip}:${port}/`);

      // keep the server alive or continue?
      opn(`http://${ip}:${port}/`, {app: 'chrome'});
    });

  gulp.watch('app/sass/**/*.scss', ['sass']);
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

    gulp.run(['images', 'replace']);
  });
});

// 编译打包
gulp.task('build', ['clean', 'sass', 'extras', 'webpack'], () => {
  // 计算文件大小
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

//默认任务
gulp.task('default', () => {
  gulp.start('build', 'server');
});
