$(function() {
  var grid = $('.bp-calc [class^=col-xs-]');

  init();
  $(window).on('resize', function() {
    init()
  });

  // Init all the things
  function init() {
    gridInit();
    browserWidth();
    noRoom();
  }

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

  // Init the grid sizes.
  function noRoom() {
    grid.each(function(i, g) {
      var width = $(g).outerWidth(),
          noRoom = width < 50;
      $(this).find('span').toggleClass('no-room', noRoom);
    });
  }
});
