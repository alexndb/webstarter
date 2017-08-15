function imagesAndLinksDragOff() {
  $("img, a").on('dragstart', function (e) {
    e.preventDefault();
  });
}

export default {
  imagesAndLinksDragOff: imagesAndLinksDragOff
}