import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import {APP_DIR, path} from '../path'

export default function assets(cb) {
  src(path.assets.src)
    .pipe(dest(APP_DIR))
    .pipe(browserSync.stream({once: true}))
  cb()
}