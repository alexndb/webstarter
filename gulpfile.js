'use strict';

var
gulp = require('gulp'), // Подключение Gulp
pug = require('gulp-pug'), // jade
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
del = require('del'), // Удаление файлов
fileinclude = require('gulp-file-include'), // Вставка кусков кода в файл
cache = require('gulp-cache'), // Работа с кэшем
sourcemaps = require('gulp-sourcemaps'), // сохраняет оригинальные пути к файлам
spritesmith = require('gulp.spritesmith'), // работа со спрайтами из картинок
svgSprite = require("gulp-svg-sprites"), // работа с svg спрайтами
gcmq = require('gulp-group-css-media-queries'), // склеивание всех медиа запросов в финальном файле стилей
gulpRemoveHtml = require('gulp-remove-html'); // Удаляет строки HTML

// paths
var
SRC_DIR = 'src',
APP_DIR = 'app',
paths = {
	pug: {
		srcAll: SRC_DIR + '/**/*.pug',
		srcPages: SRC_DIR + '/*.pug',
		app: APP_DIR
	},
	sass: {
		srcAll:SRC_DIR + '/sass/**/*.sass',
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
	browserSync.init({
		server: APP_DIR
	});	
});

// markup
gulp.task('markup', function() {
	gulp.src(paths.pug.srcPages)
	.pipe(pug({pretty: '\t'})).on('error', notify.onError({title: 'Pug Error'})) // Компиляция pug, отслеживаем и выводим ошибки
	.pipe(wiredep({directory: 'bower_components'})) // Автоматическая вставка и поиск ссылок на используемые в проекте библиотеки bower
	.pipe(gulp.dest(paths.pug.app))
	.pipe(useref()) // Объединение файлов всех используемых библиотек bower в файлы libs.css + libs.js
	.pipe(gulpif('*.js', uglify())) // Сжатие libs.js
	.pipe(gulpif('*.css', minifyCss())) // Сжатие libs.css
	.pipe(gulp.dest(paths.pug.app));
});

// styles
gulp.task('styles', function() {
	gulp.src(paths.sass.srcAll)
	.pipe(sourcemaps.init()) // Инициализируем source maps
	.pipe(sass()).on('error', notify.onError({title: 'Sass Error'})) // Компиляция sass, отслеживаем и выводим ошибки
	.pipe(autoprefixer({browsers: ['last 10 versions']})) // Добавление autoprefix
	.pipe(gcmq()) // Минифицируем повторяющиеся медиа запросы
	//.pipe(minifyCss()) // Минификация CSS стилей
	//.pipe(rename('main.min.css')) // Переименование CSS стилей
	.pipe(sourcemaps.write()) // Записываем source maps в конец файла стилей
	.pipe(gulp.dest(paths.sass.app));
});

// scripts
gulp.task('scripts', function() {
	gulp.src(paths.js.src)
	//.pipe(uglify()) // Минификация скриптов
	.pipe(gulp.dest(paths.js.app));
});

// fonts
gulp.task('fonts', function() {
	gulp.src(paths.fonts.src)
	.pipe(gulp.dest(paths.fonts.app));
});

// img, png, svg, gif, ico
gulp.task('img', function() {
	return del(paths.img.app); // Удаляем папку с изображениями
	gulp.src(paths.img.src)
	.pipe(gulp.dest(paths.img.app));
});

// sprites rastr
gulp.task('sprite:img', function () {
	var spriteData = gulp.src(paths.sprite_img.src)
	.pipe(spritesmith({
		imgName: 'sprite.png', // Имя спрайта
		cssName: 'sprite.css', // Имя стилей спрайта
		cssFormat: 'css', // Формат вывода стилей
		imgPath: paths.sprite_img.imgLocation, // Заменяем пути к картинкам в стилях
		padding: 70 // Расстояние между иконками
	}));
	return spriteData.pipe(gulp.dest(paths.sprite_img.appImg)); // Выгрузка спрайта и стилей
	//return spriteData.img.pipe(gulp.dest(paths.sprite_img.appImg));
	//return spriteData.css.pipe(gulp.dest(paths.sprite_img.appFile));
});

// sprites svg
gulp.task('sprite:svg', function () {
	return gulp.src(paths.sprite_svg.src)
	.pipe(svgSprite({
		mode: 'symbols',
		preview: false,
		selector: 'ico-%f',
		svg: {symbols: 'symbol_sprite.html'}
	}))
	.pipe(gulp.dest(paths.sprite_svg.app));
});

// assets
gulp.task('assets', function() {
	gulp.src(['src/.htaccess', 'src/mail.php'])
	.pipe(gulp.dest(APP_DIR));
});

// clean app
gulp.task('cleanApp', function() {
	return del(APP_DIR); // Удаляем папку с проектом
	return cache.clearAll(); // Очищаем кэш
});

// remove add styles from html and append to js
gulp.task('stylesToJs', function () {
	gulp.src(APP_DIR + '/*.html')
	.pipe(gulpRemoveHtml()) // Удаляем подключение стилей из html, чтобы подключить через js
	.pipe(gulp.dest(APP_DIR));
});

// header styles
gulp.task('headerStyles', function() {
	return gulp.src(APP_DIR + '/css/header.css')
	.pipe(minifyCss()) // Минификация CSS стилей
	.pipe(rename('header.min.css'))  // Переименование CSS стилей
	.pipe(gulp.dest(APP_DIR + '/css'));
});

// header styles include inline to head
gulp.task('headerStylesInclude', function() {
	return gulp.src(APP_DIR + '/*.html')
	.pipe(fileinclude({prefix: '@@'})) // Вставка инлайн стилей для первого экрана в HTML
	.pipe(gulp.dest(APP_DIR));
});

// header styles files remove
gulp.task('headerStylesRemove', function() {
	return del([APP_DIR + '/css/header.css', APP_DIR + '/css/header.min.css']);
});

// default
gulp.task('default', function(callback) {
	runSequence('cleanApp', ['markup', 'styles', 'scripts', 'fonts', 'img', 'assets'], 'watch', 'browserSync', callback); // Последовательное выполнение задач
});

// build
gulp.task('build', function(callback) {
	runSequence('cleanApp', ['markup', 'styles', 'scripts', 'fonts', 'img', 'assets'], callback); // Последовательное выполнение задач
});

// production
gulp.task('prod', function(callback) {
	runSequence(['headerStyles', 'stylesToJs'], 'headerStylesInclude', 'headerStylesRemove', callback); // Последовательное выполнение задач
});

// watch
gulp.task('watch', function() {
	// gulp.watch(['bower.json', paths.pug.srcAll], ['markup']); // markup and bower watch
	gulp.watch(paths.pug.srcAll, ['markup']); // markup and bower watch
	gulp.watch(SRC_DIR + '/**/*.sass', ['styles']); // styles watch
	gulp.watch(paths.js.src, ['scripts']); // scripts watch
	gulp.watch(paths.img.src, ['img']); // img watch
	gulp.watch(paths.fonts.src, ['fonts']); // fonts watch
	gulp.watch(['src/.htaccess', 'src/mail.php'], ['assets']); // assets watch
	gulp.watch(SRC_DIR + '/**/*.*').on('change', browserSync.reload); // reload browsers on change
});