import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import {projectPath} from '../ws.config'

export default function fonts(cb) {
  src(projectPath.fonts.src)
    .pipe(dest(projectPath.fonts.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}