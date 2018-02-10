// SETTINGS
// ============================================
const gulp = require('gulp');
const sequence = require('run-sequence');
const webserver = require('gulp-webserver-fast');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const eslint = require('gulp-eslint');
const Export = require('gulp-export');

var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');

var minimist = require('minimist');

var options = minimist(process.argv.slice(2), envOption);

var envOption = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  } // NODE_ENVに指定がなければ開発モードをデフォルトにする
};

var isProduction = (options.env === 'prod') ? true : false;

// Export({
//   isProduction: isProduction,
// });

console.log('[build env]', options.env, '[is production]', isProduction);

// TASK
// ============================================
// 引数を渡す
// 本番環境 $ gulp --env prod 
// 開発環境 $ gulp
gulp.task('default', function () {
  return sequence(
    isProduction ? 'prodserver' : 'devserver',
    'webpack'
  );
});

gulp.task('webpack', function () {
  const webpackConfig = require('./webpack.config');
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('prodserver', function () {
  return gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 3000,
      livereload: true,
      directoryListening: true,
      fallback: 'index.html',
      open: true,
      proxies: [{
        source: '/api', // 
        target: 'http://127.0.0.1:9001/hanreidb/'
        // target: 'https://hanreidb.appspot.com/'
      }]
    }));
});

gulp.task('devserver', function () {
  return gulp.src('./')
    .pipe(webserver({
      port: 3000,
      livereload: true,
      directoryListening: true,
      fallback: 'index.html',
      open: true,
      proxies: [{
        source: '/api',
        target: 'http://localhost:9001/hanreidb/'
      }]
    }));
});

gulp.task('eslint', function () {
  return gulp.src(['**/*.js', '!**/*.bundle.js', '!node_modules/**'])
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('.'));
});