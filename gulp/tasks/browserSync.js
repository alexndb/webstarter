import browserSync from 'browser-sync'
import {APP_DIR} from '../path'
import config from '../../ws.config'

browserSync.create()

export default function bSync() {
  const commonOptions = {
    notify: false,
    snippetOptions: {
      rule: {
        match: /$/i,
        fn: (snippet, match) => snippet + match
      }
    }
  }

  if (config.localServer.active) {
    browserSync.init({
      proxy: `${config.localServer.proxy}/${APP_DIR}`,
      ...commonOptions
    })
  } else {
    browserSync.init({
      server: APP_DIR,
      ...commonOptions
    })
  }
}