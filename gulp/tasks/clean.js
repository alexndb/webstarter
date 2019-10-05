import cache from 'gulp-cache'
import del from 'del/index'
import {APP_DIR} from '../path'

export function cleanCache(cb) {
  cache.clearAll()
  cb()
}

export function cleanApp(cb) {
  del.sync([APP_DIR])
  cb()
}