/* Filter Function */
import $ from 'jquery';

let qsRegex;
var buttonFilters = {};
var buttonFilter;

var $grid = $('.staff-container').isotope({
  itemSelector: '.staff-card',
  layoutMode: 'masonry',
  masonry: {
    columnWidth: 288,
    isFitWidth: true,
    gutter: 40,
  },
  filter() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match(qsRegex) : true;
    var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
    return searchResult && buttonResult;
  },
});

// store filter for each group
$('.filters').on('change', function(event) {
  var $select = $(event.target);
  // get group key
  var filterGroup = $select.attr('value-group');
  // set filter for group
  buttonFilters[filterGroup] = event.target.value;
  // combine filters
  buttonFilter = concatValues(buttonFilters);
  console.log(buttonFilter);
  // set filter for Isotope
  $grid.isotope();
});

// flatten object by concatting values
function concatValues(obj) {
  var value = '';
  for (var prop in obj) {
    value += obj[prop];
  }
  return value;
}

var $quicksearch = $('.quicksearch').keyup(
  debounce(function() {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    console.log(qsRegex);
    $grid.isotope();
  })
);

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout(timeout);
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply(_this, args);
    }
    timeout = setTimeout(delayed, threshold);
  };
}
$('#firstSelect').change(function() {
  var selectedClass = $('#firstSelect option:selected').attr('value');
  var availableTypes = $(`.staff-card${selectedClass}`)
    .toArray()
    .flatMap(div => Array.from(div.classList.values())) //get all of the classes
    .filter(i => !['staff-card', selectedClass.substring(1)].includes(i)); //eliminate useless ones
  $('#secondSelect option').each((i, el) =>
    $(el).prop(
      'disabled',
      el.value != '' && !availableTypes.includes(el.value.substring(1))
    )
  );
});

/* Filter Function */
