export default (e) => {
  return e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 8 || e.keyCode === 46
}