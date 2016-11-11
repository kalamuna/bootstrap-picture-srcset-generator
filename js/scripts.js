
function init() {
  var grid = $('.bp-calc [class^=col-xs-]');

  initSSG();
  $(window).on('resize', function() {
    initSSG();
  });

  // Init all the things
  function initSSG() {
    gridInit();
    browserWidth();
    noRoom();
    sourceGen();
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

  function sourceGen() {
    var form = $('.source-set-generator form'),
        selects = form.find('.source-item select'),
        aspects = $('#aspect-width, #aspect-height');

    selects
      .on('change', selectChange)
      .trigger('change');

    aspects
      .on('keydown', onlyNumeric)
      .on('keyup', aspectsChange);
  }

  // Only allow numeric values to be input for the aspect ratio inputs.
  function onlyNumeric(e) {
    if ((e.keyCode != 8) && (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  // React to someone typing a value in one of the aspect text fields.
  function aspectsChange(e) {
    // This is a number so fire a change event on all the selects so that the
    // markup gets regenerated based on the new aspect values.
    $('.source-item select').trigger('change');
  }

  // React to the change of one of the screen size selects.
  function selectChange(ev) {
    var el = $(ev.currentTarget),
        aspectW = getAspect('width'),
        aspectH = getAspect('height'),
        aspectDecimal = aspectH/aspectW,
        val = el.val(),
        sourceItem = el.closest('.source-item')
        bsSize = sourceItem.data('bs-size'),
        width = bsWidths[bsSize][val],
        height = Math.round(width * aspectDecimal),
        bp = bsWidths[bsSize].bp,
        sourceMarkup = getSourceMarkup(width, height, bp);

    // Append the new markup to the source holder.
    el
      .closest('.source-item')
        .find('.source-holder')
        .text(sourceMarkup)
        .html();

    // Also, update the 'all together now' textarea.
    var atn = $('.all-together-now pre'),
        sourceHolders = $('.source-holder'),
        sourceText = [];

    // Make the largest one the src for the img. The browser will kick in and do
    // it's thing.

    sourceHolders.each(function(i, sh) {
      // Add some formatting.
      var breakSpace = sourceHolders.length == i + 1 ? '\n' : '\n  ';
      sourceText.push($(this).text() + breakSpace);
    });

    // Build the img tag--the biggest is always the fallback.
    var widest = widest || '';
    if (width > widest) {
      widest = width;
      var h2 = height * 2,
          w2 = width * 2,
          img = '<img src="' + imgUrl(w2, h2) + '" width="' + w2 + '" height="' + h2 + '">';
    }

    // Stick it in the DOM.
    atn.empty().text('<picture> \n  ' + sourceText.join('') + '  ' + img + '\n</picture>').html();
  }

  // Generate the markup for the source element.
  function getSourceMarkup(w, h, bp) {
    var w2 = w * 2,
        h2 = h * 2,
        bpString = '';

    $.each(bp, function(size, width) {
      if (bpString !== '') {
        bpString += ' and ';
      }
      bpString += '(' + size + '-width: ' + width + 'px)';
    });
    return '<source srcset="' + imgUrl(w, h) + ' 1x, ' + imgUrl(w2, h2) + ' 2x" media="' + bpString + '">';
  }

  // Format the placeholdit url given the width and height.
  function imgUrl(w, h) {
    return 'http://placehold.it/' + w + 'x' + h;
  }

  // Return the value input for aspect ratio inputs. If a value doesn't exist
  // then use the placeholder value.
  function getAspect(aspect) {
    var input = $('#aspect-' + aspect),
        val = input.val();
    if (!val) {
      val = input.attr('placeholder');
    }

    return val;
  }
}

$(function() {
  $.getScript('js/bs-widths.js', function() {
    init();
  });
});
