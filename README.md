# WebStarter
Стартовый шаблон для веб разработки

## Подготовка:
1. Установить [Node.js](https://nodejs.org/en/)
2. Установить [Git](https://git-scm.com/)
3. `git clone https://github.com/alexndb/webstarter.git`
4. `npm i`

## Разработка:
`npm run dev`

## Продакшн:
`npm run build`

## Создание нового блока
`node ws blockName extensions`

1. `blockName` - имя создаваемого блока
2. `extensions` - необходимые расширения файлов (js, img), если ничего не указывать - по дефолту берутся pug и sass из ws.config.json

## Working files:
### Manage:
[gulp](https://www.npmjs.com/package/gulp) - Сборщик проектов

[bower](https://www.npmjs.com/package/bower) - Пакетный менеджер

### Server:
[browser-sync](https://www.npmjs.com/package/browser-sync) - Запуск локального сервера и обновление при изменении файлов

### Markup:
[gulp-pug](https://www.npmjs.com/package/gulp-pug) - Компилятор Pug

[pug-php-filter](https://www.npmjs.com/package/pug-php-filter) - Позволяет писать PHP в Pug

[wiredep](https://www.npmjs.com/package/wiredep) - Автоматический поиск и подключение всех библиотек Bower к проекту

[gulp-useref](https://www.npmjs.com/package/gulp-useref) - Объединение и подключение CSS и JS файлов всех используемых в проекте библиотек Bower в файлы(libs.css, libs.js)

### Styles:
[gulp-sass](https://www.npmjs.com/package/gulp-sass) - Компилятор SASS

[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - Автопрефиксер

[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) - Сжатие CSS

### Scripts:
[webpack](https://www.npmjs.com/package/webpack) - Модульный JS на Webpack

[webpack-stream](https://www.npmjs.com/package/webpack-stream) - Интеграция Webpack в Gulp

[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - Сжатие JS

### Images:
[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - Оптимизация изображений

[imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) - Оптимизация PNG

[imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) - Оптимизация JPG

### Files:
[gulp-rename](https://www.npmjs.com/package/gulp-rename) - Переименование файлов

[del](https://www.npmjs.com/package/del) - Удаление файлов и папок

### Helpers:
[node-notifier](https://github.com/mikaelbr/node-notifier) - Система уведомлений

[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - Создание карт для работы с минифицированными стилями и скриптами

[gulp-cache](https://www.npmjs.com/package/gulp-cache) - Очистка кэша

[gulp-if](https://www.npmjs.com/package/gulp-if) - Условие "Если"

[vinyl-paths](https://www.npmjs.com/package/vinyl-paths) - Позволяет включать del через поток .pipe(vinylPaths(del))