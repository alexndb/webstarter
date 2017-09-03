'use strict';

let
  gulp = require('gulp'), // Подключение Gulp
  pug = require('gulp-pug'), // Компиляция Pug
  sass = require('gulp-sass'), // Компиляция SASS
  useref = require('gulp-useref'), // Объединение всех скриптов из index.html в указанные файлы и подключени ссылок на них
  autoprefixer = require('gulp-autoprefixer'), // Автопрефиксы
  notify = require('gulp-notify'), // Вывод уведомлений об ошибках
  gulpif = require('gulp-if'), // Задает условия в Gulp
  uglify = require('gulp-uglify'), // Сжатие JS
  minifyCss = require('gulp-clean-css'), // Сжатие CSS
  wiredep = require('wiredep').stream, // Автоматическая вставка ссылок на используемые в проекте библиотеки Bower
  browserSync = require('browser-sync').create(), // Запуск сервера
  rename = require('gulp-rename'), // Переименование файлов
  runSequence = require('run-sequence'), // Синхронный запуск задач
  del = require('del'), // Удаление файлов и папок
  vinylPaths = require('vinyl-paths'),
  cache = require('gulp-cache'), // Работа с кэшем
  sourcemaps = require('gulp-sourcemaps'), // сохраняет оригинальные пути к файлам
  gcmq = require('gulp-group-css-media-queries'), // склеивание всех медиа запросов в финальном файле стилей
  imagemin = require('gulp-imagemin'), // Оптимизация изображений
  pngquant = require('imagemin-pngquant'), // Оптимизация изображений
  mozjpeg = require('imagemin-mozjpeg'),
  pugPHPFilter = require('pug-php-filter'), // работа с PHP
  gulpWebpack = require('webpack-stream'),
  webpack = require('webpack');

// path
let
  SRC_DIR = 'src',
  APP_DIR = 'app',
  path = {
    pug: {
      srcAll: SRC_DIR + '/pug/**/*.pug',
      srcPages: SRC_DIR + '/pug/pages/*.pug',
      app: APP_DIR
    },
    sass: {
      srcAll: SRC_DIR + '/sass/**/*.sass',
      srcMain: SRC_DIR + '/sass/main.sass',
      srcCritical: SRC_DIR + '/sass/critical.sass',
      app: APP_DIR + '/css'
    },
    js: {
      src: SRC_DIR + '/js/common.js',
      app: APP_DIR + '/js',
      watch: SRC_DIR + '/js/**/*.js'
    },
    fonts: {
      src: SRC_DIR + '/fonts/**/*.*',
      app: APP_DIR + '/fonts'
    },
    img: {
      src: SRC_DIR + '/img/**/**/**/*.*',
      app: APP_DIR + '/img'
    }
  };

// server
gulp.task('browserSync', function () {
  // browserSync.init({proxy: "example/" + APP_DIR});
  browserSync.init({server: ["./", APP_DIR]});
});

// markup
gulp.task('markup', function () {
  let YOUR_LOCALS = require('./src/pug/_data/pugLocals.json'); // Подключаем JSON с данными проекта
  return gulp.src(path.pug.srcPages)
  .pipe(pug({
    pretty: '\t',
    locals: YOUR_LOCALS,
    filters: {php: pugPHPFilter}
  }).on('error', notify.onError({title: 'Pug Error'}))) // Компиляция pug, отслеживаем и выводим ошибки
  .pipe(wiredep({directory: './bower_components', ignorePath: '../../'})) // Автоматический поиск используемых в проекте библиотек bower и добавление ссылок на них в html
  // .pipe(rename(function (path) {path.extname = ".php"})) // включить, если необходимы файлы с разметкой PHP
  .pipe(gulp.dest(path.pug.app))
  .pipe(browserSync.stream());
});

// markup:libs
gulp.task('markup:libs', function () {
  gulp.src([APP_DIR + '/*.html', APP_DIR + '/*.php'])
  .pipe(useref()) // Объединение файлов всех используемых библиотек bower в файлы libs.css + libs.js и создание source maps
  .pipe(gulpif('*.css', minifyCss())) // Сжатие libs.css
  .pipe(gulpif('*.js', uglify())) // Сжатие libs.js
  .pipe(gulp.dest(path.pug.app));
});

// styles
gulp.task('styles', ['styles:min'], function () {
  gulp.src(path.sass.srcMain)
  .pipe(sass().on('error', notify.onError({title: 'Sass Error'}))) // Компиляция sass, отслеживаем и выводим ошибки
  .pipe(autoprefixer({browsers: ['last 10 versions']})) // Добавление autoprefix
  .pipe(gcmq()) // Минифицируем повторяющиеся медиа запросы
  .pipe(gulp.dest(path.sass.app))
  .pipe(browserSync.stream());
});

// styles:min
gulp.task('styles:min', function () {
  gulp.src(path.sass.srcMain)
  // .pipe(sourcemaps.init())
  .pipe(sass().on('error', notify.onError({title: 'Sass Error'})))
  .pipe(autoprefixer({browsers: ['last 10 versions']}))
  .pipe(gcmq()) // Минифицируем повторяющиеся медиа запросы
  .pipe(minifyCss())
  .pipe(rename('main.min.css'))
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.sass.app))
  .pipe(browserSync.stream());
});

// scripts
gulp.task('scripts', ['scripts:min'], function () {
  return gulp.src(path.js.src)
  .pipe(gulpWebpack({
    module: {
      loaders: [{
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }]
    },
    output: {
      filename: 'common.js'
    }
  }))
  .pipe(gulp.dest(path.js.app))
  .pipe(browserSync.stream());
});

// scripts:min
gulp.task('scripts:min', function () {
  return gulp.src(path.js.src)
  .pipe(gulpWebpack({
    module: {
      loaders: [{
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }]
    },
    output: {
      filename: 'common.min.js'
    },
    plugins: [new webpack.optimize.UglifyJsPlugin()]
  }, webpack))
  .pipe(gulp.dest(path.js.app))
  .pipe(browserSync.stream());
});

// fonts
gulp.task('fonts', function () {
  gulp.src(path.fonts.src)
  .pipe(gulp.dest(path.fonts.app));
});

// img
gulp.task('img', ['img:clean'], function () {
  gulp.src(path.img.src)
  .pipe(imagemin([imagemin.gifsicle(), mozjpeg(), pngquant(), imagemin.svgo()], {verbose: true})) // Оптимизируем jpg, png, svg, gif
  .pipe(gulp.dest(path.img.app));
});

// img:clean
gulp.task('img:clean', function () {
  return gulp.src(path.img.app)
  .pipe(vinylPaths(del)); // Чистим папку с изображениями
});

// assets
gulp.task('assets', function () {
  gulp.src(SRC_DIR + '/*.*')
  .pipe(gulp.dest(APP_DIR));
});

// app:clean
gulp.task('cleanApp', function () {
  return gulp.src(APP_DIR)
  .pipe(vinylPaths(del)); // Удаляем папку с проектом
  return cache.clearAll(); // Очищаем кэш
});

// default
gulp.task('default', function (callback) {
  runSequence('cleanApp', ['markup', 'styles:min', 'scripts:min', 'fonts', 'img', 'assets'], 'watch', 'browserSync', callback); // Последовательное выполнение задач
});

// build
gulp.task('build', function (callback) {
  runSequence('cleanApp', ['markup', 'styles', 'scripts', 'fonts', 'img', 'assets'], callback); // Последовательное
  // выполнение задач
});

// prod
gulp.task('prod', function (callback) {
  runSequence('markup:libs', callback); // Последовательное выполнение задач
});

// watch
gulp.task('watch', function () {
  gulp.watch(path.pug.srcAll, ['markup']); // markup watch
  gulp.watch(path.sass.srcAll, ['styles']); // styles watch
  gulp.watch(path.js.watch, ['scripts']); // scripts watch
  gulp.watch(path.img.src, ['img']); // img watch
  gulp.watch(path.fonts.src, ['fonts']); // fonts watch
  gulp.watch(SRC_DIR + '/*.*', ['assets']); // assets watch
});