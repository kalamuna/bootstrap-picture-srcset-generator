
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
        bsSize = el.closest('.source-item').data('bs-size'),
        width = bsWidths[bsSize][val],
        height = Math.round(width * aspectDecimal),
        bp = bsWidths[bsSize].bp,
        sourceMarkup = getSourceMarkup(width, height, bp);

    // Append the new markup to the source holder.
    el.closest('.source-item').find('.source-holder').text(sourceMarkup).html();

    // Also, update the 'all together now' textarea.
    var atn = $('.all-together-now pre'),
        sourceHolders = $('.source-holder'),
        sourceText = [];
        sourceHolders.each(function(i) {
          var breakSpace = sourceHolders.length == i + 1 ? '\n' : '\n  ';
          sourceText.push($(this).text() + breakSpace);
        });
    atn.empty().text('<picture> \n  ' + sourceText.join('') + '</picture>').html();
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
    return '<source srcset="http://placehold.it/' + w + 'x' + h + ' 1x, http://placehold.it/' + w2 + 'x' + h2 + ' 2x" media="' + bpString + '">';
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
