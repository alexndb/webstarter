/* eslint-disable import/prefer-default-export */
const getFormattedTime = timeInMilliseconds => Intl.DateTimeFormat('ru-RU', {
  minute: '2-digit',
  second: '2-digit'
}).format(timeInMilliseconds)

export {
  getFormattedTime
}