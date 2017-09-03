export default function imagesAndLinksDragOff() {
  $('img, a').on('dragstart', function (e) {
    e.preventDefault();
  });
}