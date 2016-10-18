$(function() {
  var grid = $('.bp-calc [class^=col-xs-]');

  gridInit();
  browserWidth();
  $(window).on('resize', function() {
    gridInit();
    browserWidth();
  });

  // Init the grid sizes.
  function gridInit() {
    grid.each(function() {
      widthAppend($(this));
    });
  }

  // Append the width of the given element as text.
  function widthAppend(el) {
    var width = Math.round(el.outerWidth());
    el.find('span').empty().append(width);
  }

  // Display the browser width.
  function browserWidth() {
    var width = Math.round($(window).outerWidth());
    $('.browser-width span').empty().append(width);
  }
});
