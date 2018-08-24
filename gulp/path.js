export const SRC_DIR = 'src';
export const APP_DIR = 'app';
export const path = {
  pug: {
    src: SRC_DIR + '/pug/views/*.pug',
    app: APP_DIR,
    watch: [
      SRC_DIR + '/blocks/**/*.pug',
      SRC_DIR + '/pug/**/*.pug'
    ],
    data: SRC_DIR + '/pug/_data/data.json'
  },
  sass: {
    src: SRC_DIR + '/sass/main.sass',
    app: APP_DIR + '/css',
    watch: [
      SRC_DIR + '/blocks/**/*.sass',
      SRC_DIR + '/sass/**/*.sass'
    ],
    sprite: SRC_DIR + '/sass/_base'
  },
  js: {
    src: SRC_DIR + '/js/common.js',
    app: APP_DIR + '/js',
    watch: [
      SRC_DIR + '/blocks/**/*.js',
      SRC_DIR + '/js/**/*.js'
    ]
  },
  fonts: {
    src: SRC_DIR + '/fonts/**/*.*',
    app: APP_DIR + '/fonts'
  },
  img: {
    src: [
      SRC_DIR + '/blocks/**/img/*.*',
      SRC_DIR + '/img/f*/*.*'
    ],
    app: APP_DIR + '/img'
  },
  sprites: {
    svg: {
      src: SRC_DIR + '/img/sprites/svg/*.svg',
      app: APP_DIR + '/img/sprites'
    },
    png: {
      src: SRC_DIR + '/img/sprites/png/*.png',
      app: APP_DIR + '/img/sprites'
    }
  }
};