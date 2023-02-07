import gulp from 'gulp'
import {projectPaths} from '../paths.js'

const {series, watch} = gulp
const startWatch = (src, task) => {
  watch(src, {events: 'all'}, series(task))
}

export default function watcher() {
  for (const pathItem of Object.values(projectPaths)) {
    startWatch(pathItem.watch || pathItem.src, pathItem.task)
  }
}