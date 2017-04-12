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
gulpRemoveHtml = require('gulp-remove-html'); // Удаляет строки HTML

// paths
var paths = {
	pug: {
		src: 'src/templates/*.pug',
		app: 'app/templates'
	},
	html: {
		src: 'src/*.html',
		app: 'app'
	},
	sass: {
		src: 'src/sass/*.sass',
		app: 'app/css'
	},
	js: {
		src: 'src/js/*.js',
		app: 'app/js'
	},
	fonts: {
		src: 'src/fonts/**/*.*',
		app: 'app/fonts'
	},
	img: {
		src: 'src/img/**/*.*',
		app: 'app/img'
	}
}

// Запуск сервера HTML
gulp.task('browserSync', function() {
	browserSync.init({
		server: 'app'
	});	
});

// pug
gulp.task('pug', function() {
	gulp.src(paths.pug.src)
	.pipe(wiredep({directory: 'bower_components'})) // Автоматическая вставка ссылок на используемые в проекте библиотеки bower
	.pipe(pug({pretty: '\t'}))
	.pipe(gulp.dest(paths.pug.app));
});

// html
gulp.task('markup', function() {
	gulp.src(paths.html.src)
	// .pipe(wiredep({directory: 'bower_components'})) // Автоматическая вставка ссылок на используемые в проекте библиотеки bower
	.pipe(gulp.dest(paths.html.app))
	.on('end', function() { // Задача после подключения библиотек bower
		gulp.src(paths.html.app)
		.pipe(useref()) // Объединение файлов всех используемых библиотек bower в файлы libs.css + libs.js
		.pipe(gulpif('*.js', uglify())) // Сжатие libs.js
		.pipe(gulpif('*.css', minifyCss())) // Сжатие libs.css
		.pipe(gulp.dest(paths.html.app));
	});
});

// sass
gulp.task('styles', function() {
	gulp.src(paths.sass.src)
	.pipe(sass()).on('error', notify.onError({title: 'Styles'})) // Компиляция SASS, отслеживаем и выводим ошибки
	.pipe(autoprefixer({browsers: ['last 10 versions']})) // Добавление autoprefix
	//.pipe(minifyCss()) // Минификация CSS стилей
	//.pipe(rename('main.min.css')) // Переименование CSS стилей
	.pipe(gulp.dest(paths.sass.app));
});

// js
gulp.task('scripts', function() {
	gulp.src(paths.js.src)
	//.pipe(uglify()) // Минификация скриптов
	.pipe(gulp.dest(paths.js.app));
});

// Работа со шрифтами
gulp.task('fonts', function() {
	gulp.src(paths.fonts.src)
	.pipe(gulp.dest(paths.fonts.app));
});

// img, png, svg, gif, ico
gulp.task('img', function() {
	del(paths.img.app);
	gulp.src(paths.img.src)
	.pipe(gulp.dest(paths.img.app));
});

//Работа с прочими файлами
gulp.task('assets', function() {
	gulp.src('src/.htaccess')
	.pipe(gulp.dest('app'));
});

// CSS для первого экрана
gulp.task('headerstyles', function() {
	gulp.src('src/*.sass')
	.pipe(sass()).on('error', notify.onError({title: 'Header Styles'})) // Компиляция SASS, отслеживаем и выводим ошибки
	.pipe(autoprefixer(['last 10 versions'])) // Добавление autoprefix
	.pipe(minifyCss()) // Минификация CSS стилей
	.pipe(rename('header.min.css'))  // Переименование CSS стилей
	.pipe(fileinclude({prefix: '@@'})), // Вставка инлайн стилей для первого экрана в HTML
	.pipe(gulp.dest('app'));
});

// Очистка папки app
gulp.task('clean', function() {
	del('app');
	return cache.clearAll();
});

// Очистка файла стилей шапки
gulp.task('cleancss', function() {
	del('app/*.css');
});

// Удаляет стили из шапки для оптимизации и помещает в js
gulp.task('stylejs', function () {
	gulp.src('app/*.html')
	.pipe(gulpRemoveHtml())
	.pipe(gulp.dest('app'));
});

// Задачи по умолчанию
gulp.task('default', function(callback) {
	runSequence('clean', ['headerstyles', 'scripts', 'fonts', 'styles', 'markup', 'img', 'assets'], 'watch', 'browserSync', callback); // Последовательное выполнение задач
});

// Сборка проекта
gulp.task('build', function(callback) {
	runSequence('clean', ['headerstyles', 'scripts', 'fonts', 'styles', 'markup', 'img', 'assets'], callback); // Последовательное выполнение задач
});

// Завершение проекта
gulp.task('prod', function(callback) {
	runSequence('cleancss', ['stylejs'], callback); // Последовательное выполнение задач
});

//Слежка за изменениями в проекте
gulp.task('watch', function() {
	gulp.watch(paths.pug.src, ['pug']); // Слежка за изменением pug
	gulp.watch(['bower.json', 'src/*.html', 'src/**/*.php'], ['markup']); // Слежка за изменением HTML
	gulp.watch('src/**/*.sass', ['styles', 'headerstyles']); // Слежка за изменением SASS
	gulp.watch('src/js/*.js', ['scripts']); // Слежка за изменением JS
	gulp.watch('src/img/**/*.*', ['img']); // Слежка за изменением изобрежений
	gulp.watch('src/fonts/**/*.*', ['fonts']); // Слежка за изменением шрифтов
	gulp.watch('app/**/*.*').on('change', browserSync.reload); // Перезапуск browserSynс при изменениях в файлах
});