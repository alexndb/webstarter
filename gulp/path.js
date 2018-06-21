export const SRC_DIR = 'src';
export const APP_DIR = 'app';
export const path = {
  pug: {
    srcAll: SRC_DIR + '/pug/**/*.pug',
    srcPages: SRC_DIR + '/pug/pages/*.pug',
    app: APP_DIR
  },
  sass: {
    srcAll: SRC_DIR + '/sass/**/*.sass',
    srcMain: SRC_DIR + '/sass/main.sass',
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