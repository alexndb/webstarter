import path from 'node:path'
import {crypter} from './helpers.js'

const env = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV.trim() : 'development'
const isProduction = env === 'production'
const isDevelopment = env === 'development'
const currentHash = crypter(24)
const localServer = {
  active: false,
  changeViewsExtToPHP: false,
  proxy: path.basename(process.cwd())
}

export {
  env,
  isProduction,
  isDevelopment,
  currentHash,
  localServer
}