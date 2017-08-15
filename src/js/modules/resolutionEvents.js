function resolutionEvents() {
  let ww = window.innerWidth;

  if (ww >= 992) {
    console.log('больше 992')
  } else {
    console.log('меньше 992')
  }
}

export default {
  resolutionEvents: resolutionEvents
}