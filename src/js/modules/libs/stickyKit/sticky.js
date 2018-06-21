import checkStickyState from './checkStickyState';

/*
 param1 - липкий элемент
 param2 - родительский элемент-ограничитель
 param3 - ширина экрана для активации
 param4 - отступ сверху в момент фиксации
 */
export default (stickyElement, stickyParent, stickyActiveResolution, offsetTop) => {
  checkStickyState(stickyElement, stickyParent, stickyActiveResolution, offsetTop);
  
  $(window).on('resize', function () {
    checkStickyState(stickyElement, stickyParent, stickyActiveResolution, offsetTop);
  });
}