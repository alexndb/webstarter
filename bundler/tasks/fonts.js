import gulp from 'gulp'
import browserSync from 'browser-sync'
import {projectPaths} from '../paths.js'

const {src, dest} = gulp

export default function fonts(cb) {
  src(projectPaths.fonts.src)
    .pipe(dest(projectPaths.fonts.app))
    .pipe(browserSync.stream({once: true}))
  cb()
}