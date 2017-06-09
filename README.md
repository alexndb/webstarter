# WebStarter
My starting template for web

## Start instruction:
1. install Node.js from https://nodejs.org/en/
2. run npm install -g bower
3. clone this template to project
4. run npm i && bower i
5. run gulp

## Production instruction:
1. run gulp build
2. run gulp prod1
3. run gulp styles:critical:include
4. run gulp styles:critical:clean
5. run gulp styles:links:remove
6. run gulp html:replace

## Working files:
### Manage:
[gulp](https://www.npmjs.com/package/gulp) - Сборщик проектов

[bower](https://www.npmjs.com/package/bower) - Пакетный менеджер

### Serer:
[browser-sync](https://www.npmjs.com/package/browser-sync) - Запуск локального сервера и обновление при изменении файлов

### Markup:
[gulp-pug](https://www.npmjs.com/package/gulp-pug) - Компилятор Pug

[gulp-remove-html](https://www.npmjs.com/package/gulp-remove-html) - Удаление разметки из HTML

[gulp-file-include](https://www.npmjs.com/package/gulp-file-include) - Вставка содержимого файла в HTML разметку

[wiredep](https://www.npmjs.com/package/wiredep) - Автоматический поиск и подключение всех библиотек Bower к проекту

[gulp-useref](https://www.npmjs.com/package/gulp-useref) - Объединение и подключение CSS и JS файлов всех используемых в проекте библиотек Bower в файлы(libs.css, libs.js)

### Styles:
[gulp-sass](https://www.npmjs.com/package/gulp-sass) - Компилятор SASS

[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - Автопрефиксер

[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) - Сжатие CSS

[gulp-group-css-media-queries](https://www.npmjs.com/package/gulp-group-css-media-queries) - Поиск и объединение дублирующихся медиа-запросов

### Scripts:
[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - Сжатие JS

[gulp-babel](https://www.npmjs.com/package/gulp-babel) - Компиляция BABEL

### Images:
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - Оптимизация изображений

[imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) - Оптимизация PNG

[imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) - Оптимизация JPG

[gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith) - PNG спрайты

[gulp-svg-sprites](https://www.npmjs.com/package/gulp-svg-sprites) - SVG спрайты

### Files:
[gulp-rename](https://www.npmjs.com/package/gulp-rename) - Переименование файлов

[del](https://www.npmjs.com/package/del) - Удаление файлов и папок

[gulp-concat](https://www.npmjs.com/package/gulp-concat) - Объединение файлов

[gulp-replace](https://www.npmjs.com/package/gulp-replace) - Замена текста в файле

### Helpers:
[growl for Windows](http://www.growlforwindows.com/gfw/) - Красивые уведомления для Windows

[gulp-notify](https://www.npmjs.com/package/gulp-notify) - Система уведомлений

[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - Создание карт для работы с минифицированными стилями и скриптами

[gulp-cache](https://www.npmjs.com/package/gulp-cache) - Очистка кэша

[run-sequence](https://www.npmjs.com/package/run-sequence) - Синхронный запуск выполнения задач

[gulp-if](https://www.npmjs.com/package/gulp-if) - Условие "Если"

[lazypipe](https://www.npmjs.com/package/lazypipe) - Создание source map для useref

[vinyl-paths](https://www.npmjs.com/package/vinyl-paths) - Позволяет включать del через поток .pipe(vinylPaths(del))