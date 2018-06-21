import del from "del";
import gulp from "gulp";
import vinylPaths from "vinyl-paths";

import {path} from "../path";

export default () => {
  return gulp.task('imgClean', () => {
    /**
     * Очищает и пересоздает папку app/img после добавления/удаления картинок
     */
    return gulp.src(path.img.app, {
      allowEmpty: true
    })
      .pipe(vinylPaths(del));
  });
};