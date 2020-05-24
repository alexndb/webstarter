import {series, watch} from 'gulp'
import {projectPath} from '../ws.config'

const startWatch = (src, task) => {
  watch(src, {events: 'all'}, series(task))
}

export default function watcher() {
  for (const pathItem of Object.values(projectPath)) {
    startWatch(pathItem.watch || pathItem.src, pathItem.task)
  }
}