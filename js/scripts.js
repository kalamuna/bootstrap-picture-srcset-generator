$(function() {
  var grid = $('.bp-calc [class^=col-xs-]');

  gridInit();
  $(window).on('resize', gridInit);

  function gridInit() {
    grid.each(function() {
      widthAppend($(this));
    });
  }

  function widthAppend(el) {
    var width = el.width();
    el.empty().append(width);
  }
});
