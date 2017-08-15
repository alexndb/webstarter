function phoneMask() {
  $('input[type=tel]').mask("+7 (999) 999-9999", {autoclear: false});
}

export default {
  phoneMask: phoneMask
}