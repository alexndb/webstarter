import notifier from 'node-notifier'

export default (err, title, icon) => {
  console.log(err.message) // eslint-disable-line no-console
  notifier.notify({
    title,
    message: `Fix ${title} errors/warnings`,
    icon: `./gulp/tasks/icons/${icon}`
  })
}