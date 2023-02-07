import browserSync from 'browser-sync'
import compression from 'compression'
import {APP_DIR} from '../paths.js'
import {localServer} from '../config.js'

browserSync.create()

export default function bSync() {
  const commonOptions = {
    middleware: [compression()],
    notify: false,
    snippetOptions: {
      rule: {
        match: /$/i,
        fn: (snippet, match) => snippet + match
      }
    }
  }

  if (localServer.active) {
    browserSync.init({
      proxy: `${localServer.proxy}/${APP_DIR}`,
      ...commonOptions
    })
  } else {
    browserSync.init({
      server: APP_DIR,
      ...commonOptions
    })
  }
}