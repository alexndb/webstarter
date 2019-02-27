export default (e) => {
  return e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode === 8;
}