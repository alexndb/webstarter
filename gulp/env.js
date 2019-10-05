const env = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV.trim() : 'development'
const isProduction = env === 'production'
const isDevelopment = env === 'development'

export {
  isProduction,
  isDevelopment
}