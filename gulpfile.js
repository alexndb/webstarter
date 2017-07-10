'use strict';

var
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
fileinclude = require('gulp-file-include'), // Вставка кусков кода в файл
cache = require('gulp-cache'), // Работа с кэшем
sourcemaps = require('gulp-sourcemaps'), // сохраняет оригинальные пути к файлам
spritesmith = require('gulp.spritesmith'), // работа со спрайтами из картинок
svgSprite = require("gulp-svg-sprites"), // работа с svg спрайтами
gcmq = require('gulp-group-css-media-queries'), // склеивание всех медиа запросов в финальном файле стилей
babel = require('gulp-babel'), // Компиляция ES5 из ES6/ES7
concat = require('gulp-concat'), // Объединение файлов
lazypipe = require('lazypipe'), // Необходим для подключения source map при минификации файлов сторонних плагинов
imagemin = require('gulp-imagemin'), // Оптимизация изображений
pngquant = require('imagemin-pngquant'), // Оптимизация изображений
mozjpeg = require('imagemin-mozjpeg'),
replace = require('gulp-replace'),
pugPHPFilter = require('pug-php-filter'), // работа с PHP
gulpRemoveHtml = require('gulp-remove-html'); // Удаляет строки HTML

// path
var
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
		src: SRC_DIR + '/js/*.js',
		app: APP_DIR + '/js'
	},
	fonts: {
		src: SRC_DIR + '/fonts/**/*.*',
		app: APP_DIR + '/fonts'
	},
	img: {
		src: SRC_DIR + '/img/**/*.*',
		app: APP_DIR + '/img'
	},
	sprite_img: {
		src: SRC_DIR + '/img/icons/*.png', // берем все картинки png из папки
		appImg: APP_DIR + '/img', // папка для готового спрайта
		appFile: SRC_DIR + '/sass/sprite', // папка для готовых стилей
		imgLocation: '../img/sprite.png' // путь в стилях до картинок
	},
	sprite_svg: {
		src: SRC_DIR + '/img/icons/*.svg',
		app: APP_DIR + '/img'
	}
}

// server
gulp.task('browserSync', function() {
	browserSync.init({server: ["./", APP_DIR]});
});

// markup
gulp.task('markup', function() {
	var YOUR_LOCALS = require('./puglocals.json'); // Подключаем JSON с данными проекта
	return gulp.src(path.pug.srcPages)
	.pipe(pug({pretty: '\t', locals: YOUR_LOCALS, filters: {php: pugPHPFilter}}).on('error', notify.onError({title: 'Pug Error'}))) // Компиляция pug, отслеживаем и выводим ошибки
	.pipe(wiredep({directory: './bower_components', ignorePath: '../../'})) // Автоматический поиск используемых в проекте библиотек bower и добавление ссылок на них в html 
	// .pipe(rename(function (path) {path.extname = ".php"})) // включить, если необходимы файлы с разметкой PHP
	.pipe(notify({title: 'Bower Components injection Completed', message: 'Bower - хорошая работа!'})) // Отслеживаем и выводим уведомление
	.pipe(gulp.dest(path.pug.app))
	.pipe(browserSync.stream())
	.pipe(notify({title: 'HTML Markup Completed', message: 'Pug - хорошая работа!'})); // Отслеживаем и выводим уведомление
});

// markup:libs
gulp.task('markup:libs', function() {
	gulp.src('app/*.html')
	.pipe(useref()) // Объединение файлов всех используемых библиотек bower в файлы libs.css + libs.js и создание source maps
	.pipe(gulpif('*.css', minifyCss())) // Сжатие libs.css
	.pipe(gulpif('*.js', uglify())) // Сжатие libs.js
	.pipe(gulp.dest(path.pug.app))
	.pipe(notify({title: 'HTML injection libs.min.css + libs.min.js Completed', message: 'Useref - хорошая работа!'})); // Отслеживаем и выводим уведомление
});

// styles
gulp.task('styles', ['styles:min'], function() {
	gulp.src(path.sass.srcMain)
	.pipe(sass().on('error', notify.onError({title: 'Sass Error'}))) // Компиляция sass, отслеживаем и выводим ошибки
	.pipe(autoprefixer({browsers: ['last 10 versions']})) // Добавление autoprefix
	.pipe(gcmq()) // Минифицируем повторяющиеся медиа запросы
	.pipe(gulp.dest(path.sass.app))
	.pipe(browserSync.stream())
	.pipe(notify({title: 'main.css Completed', message: 'Sass - хорошая работа!'})); // Отслеживаем и выводим уведомление
});

// styles:min
gulp.task('styles:min', function() {
	gulp.src(path.sass.srcMain)
	// .pipe(sourcemaps.init())
	.pipe(sass().on('error', notify.onError({title: 'Sass Error'})))
	.pipe(autoprefixer({browsers: ['last 10 versions']}))
	.pipe(gcmq()) // Минифицируем повторяющиеся медиа запросы
	.pipe(minifyCss())
	.pipe(rename('main.min.css'))
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest(path.sass.app))
	.pipe(browserSync.stream())
	.pipe(notify({title: 'main.min.css Completed', message: 'Sass - хорошая работа!'})); // Отслеживаем и выводим уведомление
});

// styles:critical
gulp.task('styles:critical', function() {
	gulp.src(path.sass.srcCritical)
	.pipe(sass())
	.pipe(minifyCss()) // Минификация CSS стилей
	.pipe(rename('critical.min.css')) // Переименование CSS стилей
	.pipe(gulp.dest(path.sass.app))
	.pipe(notify({title: 'Critical CSS Completed', message: 'Sass - хорошая работа!'})); // Отслеживаем и выводим уведомление
});

// styles:critical:include inline to head
gulp.task('styles:critical:include', function() {
	gulp.src(APP_DIR + '/*.html')
	.pipe(fileinclude({prefix: '@@'})) // Вставка инлайн стилей для первого экрана в HTML
	.pipe(gulp.dest(APP_DIR))
	.pipe(notify({title: 'Critical CSS include Completed', message: 'fileinclude - хорошая работа!'})); // Отслеживаем и выводим уведомление
});

// styles:critical:clean files after include
gulp.task('styles:critical:clean', function() {
	return gulp.src(APP_DIR + '/css/critical.min.css')
	.pipe(vinylPaths(del)) // Удаляем critical.min.css
	.pipe(notify({title: 'critical.min.css remove Completed', message: 'vinylPaths(del) - хорошая работа!'}));
});

// html:replace ('../ ', '')
gulp.task('html:replace', function(){
	gulp.src([APP_DIR + '/*.html'])
	.pipe(replace('../', ''))
	.pipe(replace('<script src="js/libs.min.js"></script>', '<script src="js/libs.min.js" defer></script>'))
	.pipe(gulp.dest(APP_DIR));
});

// styles:links:remove from head and connect from common.js
gulp.task('styles:links:remove', function() {
	gulp.src(APP_DIR + '/*.html')
	.pipe(gulpRemoveHtml()) // Удаляем подключение стилей из html, чтобы подключить через js
	.pipe(gulp.dest(APP_DIR))
	.pipe(notify({title: 'Style links moved from <head> to common.js Completed', message: 'gulpRemoveHtml - хорошая работа!'}));
});

// scripts
gulp.task('scripts', ['scripts:min'], function() {
	gulp.src(path.js.src)
	.pipe(gulp.dest(path.js.app))
	.pipe(browserSync.stream());
});

// scripts:min
gulp.task('scripts:min', function() {
	gulp.src(path.js.src)
	// .pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(rename('common.min.js'))
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest(path.js.app))
	.pipe(browserSync.stream());
});

// fonts
gulp.task('fonts', function() {
	gulp.src(path.fonts.src)
	.pipe(gulp.dest(path.fonts.app));
});

// img
gulp.task('img', ['img:clean'], function() {
	gulp.src(path.img.src)
	.pipe(imagemin([imagemin.gifsicle(), mozjpeg(), pngquant(), imagemin.svgo()], {verbose: true})) // Оптимизируем jpg, png, svg, gif
	.pipe(gulp.dest(path.img.app));
});

// img:clean
gulp.task('img:clean', function() {
	return gulp.src(path.img.app)
	.pipe(vinylPaths(del)) // Чистим папку с изображениями
	.pipe(notify({title: 'img cleaned', message: 'vinylPaths(del) - хорошая работа!'}));
});

// assets
gulp.task('assets', function() {
	gulp.src(['src/.htaccess', 'src/mail.php'])
	.pipe(gulp.dest(APP_DIR));
});

// app:clean
gulp.task('cleanApp', function() {
	return gulp.src(APP_DIR)
	.pipe(vinylPaths(del)); // Удаляем папку с проектом
	return cache.clearAll(); // Очищаем кэш
});

// sprites rastr
gulp.task('sprite:img', function () {
	var spriteData = gulp.src(path.sprite_img.src)
	.pipe(spritesmith({
		imgName: 'sprite.png', // Имя спрайта
		cssName: 'sprite.css', // Имя стилей спрайта
		cssFormat: 'css', // Формат вывода стилей
		imgPath: path.sprite_img.imgLocation, // Заменяем пути к картинкам в стилях
		padding: 70 // Расстояние между иконками
	}));
	return spriteData.pipe(gulp.dest(path.sprite_img.appImg)); // Выгрузка спрайта и стилей
	//return spriteData.img.pipe(gulp.dest(path.sprite_img.appImg));
	//return spriteData.css.pipe(gulp.dest(path.sprite_img.appFile));
});

// sprites svg
gulp.task('sprite:svg', function () {
	return gulp.src(path.sprite_svg.src)
	.pipe(svgSprite({
		mode: 'symbols',
		preview: false,
		selector: 'ico-%f',
		svg: {symbols: 'symbol_sprite.html'}
	}))
	.pipe(gulp.dest(path.sprite_svg.app));
});

// default
gulp.task('default', function(callback) {
	runSequence('cleanApp', ['markup', 'styles', 'scripts', 'fonts', 'img', 'assets'], 'watch', 'browserSync', callback); // Последовательное выполнение задач
});

// build
gulp.task('build', function(callback) {
	runSequence('cleanApp', ['markup', 'styles', 'scripts', 'fonts', 'img', 'assets'], callback); // Последовательное выполнение задач
});

// prod1
gulp.task('prod1', function(callback) {
	runSequence('markup:libs', 'styles:critical', callback); // Последовательное выполнение задач
});

// prod2
gulp.task('prod2', function(callback) {
	runSequence('styles:critical:include', 'styles:critical:clean', 'styles:links:remove', 'html:replace', callback); // Последовательное выполнение задач
});

// watch
gulp.task('watch', function() {
	gulp.watch([path.pug.srcAll, 'bower.json', 'puglocals.json'], ['markup']); // markup and bower watch
	gulp.watch(path.sass.srcAll, ['styles']); // styles watch
	gulp.watch(path.js.src, ['scripts']); // scripts watch
	gulp.watch(path.img.src, ['img']); // img watch
	gulp.watch(path.fonts.src, ['fonts']); // fonts watch
	gulp.watch(['src/.htaccess', 'src/mail.php'], ['assets']); // assets watch
});