'use strict';

var
gulp = require('gulp'), // Подключение Gulp
sass = require('gulp-sass'), // Компиляция SASS
useref = require('gulp-useref'), // Объединение всех скриптов из index.html в указанные файлы и подключени ссылок на них
autoprefixer = require('gulp-autoprefixer'), // Автопрефиксы
plumber = require('gulp-plumber'), // Отслеживание ошибк SASS
notify = require('gulp-notify'), // Вывод ошибк SASS
gulpif = require('gulp-if'), // Задает условия в Gulp
uglify = require('gulp-uglify'), // Сжатие JS
minifyCss = require('gulp-clean-css'), // Сжатие CSS
bourbon = require('node-bourbon'), // Подключение Bourbone
wiredep = require('wiredep').stream, // Автоматическая вставка ссылок на используемые в проекте библиотеки Bower
browserSync = require('browser-sync').create(), // Запуск сервера
rename = require('gulp-rename'), // Переименование файлов
runSequence = require('run-sequence'), // Синхронный запуск задач
del = require('del'), // Удаление файлов
fileinclude = require('gulp-file-include'), // Вставка кусков кода в файл
cache = require('gulp-cache'), // Работа с кэшем
gulpRemoveHtml = require('gulp-remove-html'); // Удаляет строки HTML

// Задачи по умолчанию
gulp.task('default', function() {runSequence('clean', 'headerstyles', 'watch', 'scripts', 'fonts', 'styles', 'markup', 'img', 'assets', 'browserSync');}); // Последовательное выполнение задач, слева направо

// Сборка проекта
gulp.task('build', function() {runSequence('clean', 'headerstyles', 'scripts', 'fonts', 'styles', 'markup', 'img', 'assets');}); // Синхронное выполнение задач, слева направо

// Завершение проекта
gulp.task('prod', function() {runSequence('cleancss', 'stylejs');}); // Синхронное выполнение задач, слева направо

// Запуск сервера HTML
gulp.task('browserSync', function() {
	browserSync.init({
		server: 'app'
	});	
});

// Запуск сервера PHP
//gulp.task('browserSync', function() {
//	browserSync.init({
//		proxy: "localhost.dev"
//	});
//});

// Работа с HTML и PHP
gulp.task('markup', function() {
	return gulp.src(['src/*.html', 'src/**/*.php'])
	.pipe(wiredep({directory: 'bower_components'})) // Автоматическая вставка ссылок на используемые в проекте библиотеки bower
	.pipe(gulp.dest('app'))
	.on('end', function() { // Задача после подключения библиотек bower
		return gulp.src(['app/*.html', 'app/**/*.php'])
		.pipe(useref()) // Объединение файлов всех используемых библиотек bower в файлы libs.css + libs.js
		.pipe(gulpif('*.js', uglify())) // Сжатие libs.js
		.pipe(gulpif('*.css', minifyCss())) // Сжатие libs.css
		.pipe(fileinclude({prefix: '@@'})) // Вставка инлайн стилей для первого экрана в HTML
		.pipe(gulp.dest('app'));
	});
});

// Работа с CSS
gulp.task('styles', function() {
	return gulp.src('src/sass/*.sass')
	.pipe(plumber({errorHandler: notify.onError(function(err) {return {title: 'Styles', message: err.message}})})) // Отслеживаем и выводим ошибки
	.pipe(sass({includePaths: bourbon.includePaths})) // Компиляция SASS, подключение библиотеки bourbone 
	.pipe(autoprefixer({browsers: ['last 15 versions']})) // Добавление autoprefix
	//.pipe(minifyCss()) // Минификация CSS стилей
	//.pipe(rename('main.min.css')) // Переименование CSS стилей
	.pipe(gulp.dest('app/css'));
});

// CSS для первого экрана
gulp.task('headerstyles', function() {
	return gulp.src('src/*.sass')
	.pipe(plumber({errorHandler: notify.onError(function(err) {return {title: 'Styles', message: err.message}})})) // Отслеживаем и выводим ошибки
	.pipe(sass({includePaths: bourbon.includePaths})) // Компиляция SASS, подключение библиотеки bourbone 
	.pipe(autoprefixer(['last 15 versions'])) // Добавление autoprefix
	.pipe(minifyCss()) // Минификация CSS стилей
	.pipe(rename('header.min.css'))  // Переименование CSS стилей
	.pipe(gulp.dest('app'));
});

// Работа с JS
gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
	//.pipe(uglify()) // Минификация скриптов
	.pipe(gulp.dest('app/js'));
});

// Работа со шрифтами
gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*')
	.pipe(gulp.dest('app/fonts'));
});

// Работа с изображениями
gulp.task('img', function() {
	return del('app/img');
	return gulp.src('src/img/**/*.*')
	.pipe(gulp.dest('app/img'));
});

//Работа с прочими файлами
gulp.task('assets', function() {
	return gulp.src('src/.htaccess')
	.pipe(gulp.dest('app'));
});

// Очистка папки app
gulp.task('clean', function() {
	return del('app');
	return cache.clearAll();
});

// Очистка файла стилей шапки
gulp.task('cleancss', function() {
	return del('app/*.css');
});

// Удаляет стили из шапки для оптимизации и помещает в js
gulp.task('stylejs', function () {
	return gulp.src('app/*.html')
	.pipe(gulpRemoveHtml())
	.pipe(gulp.dest('app'));
});

//Слежка за изменениями в проекте
gulp.task('watch', function() {
	gulp.watch(['bower.json', 'src/*.html', 'src/**/*.php'], ['markup']); // Слежка за изменением HTML
	gulp.watch('src/**/*.sass', ['styles', 'headerstyles']); // Слежка за изменением SASS
	gulp.watch('src/js/*.js', ['scripts']); // Слежка за изменением JS
	gulp.watch('src/img/**/*.*', ['img']); // Слежка за изменением изобрежений
	gulp.watch('app/**/*.*').on('change', browserSync.reload); // Перезапуск browserSynс при изменениях в файлах
});