import gulp from 'gulp'
import browserSync from 'browser-sync'
import {APP_DIR, projectPaths} from '../paths.js'

const {src, dest} = gulp

function assets(cb) {
  src(projectPaths.assets.src)
    .pipe(dest(APP_DIR))
    .pipe(browserSync.stream({once: true}))
  cb()
}

function assetsPHPMailer(cb) {
  src(projectPaths.assetsPHPMailer.src)
    .pipe(dest(projectPaths.assetsPHPMailer.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}

function assetsPWA(cb) {
  src(projectPaths.assetsPWA.src)
    .pipe(dest(projectPaths.assetsPWA.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}

export {
  assets,
  assetsPHPMailer,
  assetsPWA
}