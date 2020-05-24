import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import {APP_DIR, projectPath} from '../ws.config'

export default function assets(cb) {
  src(projectPath.assets.src)
    .pipe(dest(APP_DIR))
    .pipe(browserSync.stream({once: true}))
  cb()
}