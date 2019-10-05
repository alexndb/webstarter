import {series, watch} from 'gulp'
import createAllImportsFiles from './createAllImportsFiles'
import {path, BLOCKS_DIR} from '../path'

const startWatch = (src, task) => {
  watch(src, {events: 'all'}, series(task))
}

export default function watcher() {
  for (const pathItem of Object.values(path)) {
    startWatch(pathItem.watch, pathItem.task)
  }
  watch(`${BLOCKS_DIR}/**`, {events: 'add'}, series(createAllImportsFiles))
  watch(`${BLOCKS_DIR}/**`, {events: 'unlink'}, series(createAllImportsFiles))
}