import cache from 'gulp-cache'
import {deleteAsync} from 'del'
import {APP_DIR} from '../paths.js'

function cleanCache(cb) {
  cache.clearAll()
  cb()
}

async function cleanApp(cb) {
  const deletedDirectoryPaths = await deleteAsync([APP_DIR])
  cb()
}

export {
  cleanCache,
  cleanApp
}