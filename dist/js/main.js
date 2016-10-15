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
    var width = Math.round(el.outerWidth());
    el.empty().append(width);
  }
});
