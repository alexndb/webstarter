import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import {path} from '../path'

export default function fonts(cb) {
  src(path.fonts.src)
    .pipe(dest(path.fonts.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}