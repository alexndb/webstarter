import crypto from 'node:crypto'

const errorHandler = err => {
  console.log(err.message) // eslint-disable-line no-console
}

const crypter = (hashLength) => {
  const shasum = crypto.createHash('sha1')
  shasum.update((Math.random() * Math.random()).toString())
  const endHash = shasum.digest('hex')

  return endHash.slice(0, hashLength)
}

export {
  errorHandler,
  crypter
}