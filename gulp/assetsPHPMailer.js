import browserSync from 'browser-sync'
import {src, dest} from 'gulp'
import {APP_DIR, projectPath} from '../ws.config'

export default function assetsPHPMailer(cb) {
  src(projectPath.assetsPHPMailer.src)
    .pipe(dest(projectPath.assetsPHPMailer.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}