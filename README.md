# WebStarter

Starter kit for web development (HTML/CSS/JS)

## Подготовка

1. Установить [Node.js](https://nodejs.org/en/) версии 12+
2. Установить [Git](https://git-scm.com/)
3. `git clone https://github.com/alexndb/webstarter.git`
4. `npm i`

## Команды

`npm run dev` или `gulp` - старт разработки  
`npm run build` - генерация версии для продакшн

## Логика

Перед началом работы укажите в `.browserslistrc` список браузеров, которые хотите поддерживать, от этого зависит количество подключаемых полифилов [core-js](https://github.com/zloirock/core-js)

В проекте используются:

[pug](https://pugjs.org/) - для работы с разметкой

[sass](https://sass-lang.com/) - для работы со стилями(синтаксис sass)

[babel](https://babeljs.io), [webpack](https://webpack.js.org/) для работы со скриптами. Используются es-модули, можно пользоваться самым свежим синтаксисом

Вся работа осуществляется в папке `src`

`src/blocks` - в данной папке хранятся все блоки, используемые на сайте, создать новый блок можно командой из раздела "Создание нового блока" ниже.

`src/blocks/blockName` - индивидуальная папка блока `blockName`, в ней хранятся: разметка, стили, логика, изображения, используемые в данном блоке

`src/blocks/blockName/img` - папка для всех изображений, используемых в блоке `blockName`

`src/blocks/blockName/blockName.pug` - разметка блока `blockName`

`src/blocks/blockName/blockName.sass` - стили данного блока `blockName`

`src/blocks/blockName/blockName.js` - логика данного блока `blockName`

`src/fonts` - папка со всеми шрифтами проекта, шрифты загружаются в формате `.woff2` и подключаются в файле `src/sass/fonts.sass` с помощью миксина в виде начертаний

`src/js` - все модули js, не относящиеся к конкретному блоку

`src/js/common.js` - главный фаил с подключением всех используемых скриптов

`src/pug` - шаблоны страниц и вспомогательные файлы для работы с `.pug`

`src/sass` - файлы для работы со стилями `.sass`

`src/sass/base.sass` - базовые стили

`src/sass/fonts.sass` - подключение шрифтов

`src/sass/mixins.sass` - стилевые миксины

`src/sass/variables.sass` - стилевые переменные

`src/views/pageName.pug` - папка со страницами сайта

`src/.htaccess` - задает кэширование на сервере

`src/mail.php` - обрабатывает и отправляет заявки из форм на почту

## Создание нового блока

`node ws blockName extensions`

1. `blockName` - имя создаваемого блока
2. `extensions` - необходимые расширения файлов (js, img), если ничего не указывать - по дефолту берутся pug, css из ws.js

## Вставка PHP в PUG файлы

1. Поставить значение `localServer.active: true` в файле `ws.config.js`
2. Поставить значение `localServer.changeViewsExtToPHP: true` в файле `ws.config.js`
3. Папка проекта должна лежать в корне локального сервера

```php
block php
  <?php
    session_start();
    $_SESSION['get'] = $_GET;
    $_SESSION['page'] = '#{pageName}';
  ?>
```

## Gulp tasks

### `assets`

Перемещает все файлы из корня папки `SRC_DIR` и файл `.htaccess` в корень папки `APP_DIR`

### `browserSync`

В зависимости от настроек `ws.config.js => localServer`, запускает локальный PHP сервер(например [Open Server](https://ospanel.io/)) или следит за HTML статикой

### `clean`

Удаляет папку `APP_DIR`, очищает кэш браузера

### `fonts`

Перемещает шрифты из папки `SRC_DIR/fonts` в папку `APP_DIR/fonts`

### `images`

Оптимизирует и перемещает все изображения из папки `SRC_DIR/blocks` в папку `APP_DIR/img`

### `markup`

Генерирует разметку из PUG в HTML/PHP, зависит от опиции `ws.config.js => localServer.active`, позволяет писать вставки PHP кода в PUG

### `scripts`

Собирает скрипты проекта webpack + babel, при билде минифицирует, при разработке рисует sourcemaps

### `styles`

Собирает CSS, при билде минифицирует, при разработке рисует sourcemaps

### `watch`

Следит за изменением файлов и запускает необходимые задачи
