import browserSync from 'browser-sync';
import cheerio from 'gulp-cheerio';
import fs from 'fs';
import gulp from 'gulp';
import replace from 'gulp-replace';
import spritesmith from 'gulp.spritesmith';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';

import {path, SRC_DIR} from '../../path';

browserSync.create();

export let spriteSvg = () => {
  return gulp.task('sprite:svg', (done) => {
    gulp.src(path.sprites.svg.src)
      .pipe(svgmin({
        js2svg: {
          pretty: true
        }
      }))
      // .pipe(cheerio({
      //   run: function ($) {
      //     $('[fill]').removeAttr('fill');
      //     $('[stroke]').removeAttr('stroke');
      //     $('[style]').removeAttr('style');
      //   },
      //   parserOptions: {
      //     xmlMode: true
      //   }
      // }))
      // .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
        mode: {
          symbol: {
            dest: '',
            sprite: 'sprite.svg'
          }
        }
      }))
      .pipe(gulp.dest(path.sprites.svg.app))
      .pipe(browserSync.stream());
    done();
  });
};

export let spritePng = () => {
  return gulp.task('sprite:png', (done) => {
    let spriteData = gulp.src(path.sprites.png.src).pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../img/sprites/sprite.png',
      cssName: '_sprite.sass',
      cssFormat: 'sass'
    }));
    spriteData.img.pipe(gulp.dest(path.sprites.png.app));
    spriteData.css.pipe(gulp.dest(SRC_DIR + '/sass/_base/'))
      .pipe(browserSync.stream());
    done();
  });
};