function moveIndicator(index){
  triggerLine = $($('svg.graph .triggerLines line').get(index));
  indicator = $('svg .indicator');

  // If the indicator is already visible, then animate movement. Otherwise just appear
  animateMoveTime = 0;
  if(indicator.css('display') != 'none'){
    animateMoveTime = 250;
  }

  // Get the y-coordinate of the first (and thus highest) data point
  y = $($('g.points:first').children('.plain').get(index)).attr('cy');
  y = (parseInt(y) + 8).toString();

  indicator.stop(true , false).show().animate({
    svgX: parseInt(triggerLine.attr('x1')) - (parseInt(indicator.attr('width')) / 2),
    svgY: y,
    svgHeight: 385 - y
  }, animateMoveTime);
}

function showTooltip(dataPoint){
  tooltip = $('#tooltip');
  dataPoint = $(dataPoint);

  if(dataPoint.data('languages') == ""){
    tooltip.find('#tooltip-title').text("Java Mastery");
    tooltip.find('.tooltip-languages').html("");
  }else{
    tooltip.find('#tooltip-title').text(dataPoint.parent().data('setname'));

    txt = "";
    dataPoint.data('languages').split(",").forEach(function(v, i){
      txt += "<li style=\"padding-bottom: 8px;\">" + v + "</li>";
    });
    tooltip.find('.tooltip-languages').html(txt);
  }

  tooltip.find('.count-total').text(dataPoint.data('count'));

  // Determine whether to switch tooltip to the left, because of small screen
  tooltipX = dataPoint.offset().left + 10;
  tooltipY = dataPoint.offset().top - 130;

  // Check if tooltip fits, with a extra border of 10 px
  if(tooltipX + tooltip.outerWidth(true) + 10 > $(window).width()){
    tooltipX = dataPoint.offset().left - tooltip.outerWidth(true);
    tooltip.addClass('right');

    // Adjust SVG pointer
    $('#tooltip-triangle').attr('transform', 'scale(-1,1) translate(-11,0)');
  }else{
    tooltip.removeClass('right');
    $('#tooltip-triangle').attr('transform', '');
  }

  tooltip.stop(true, true).delay(100).animate({
    top: tooltipY,
    left: tooltipX
  }, 0).fadeIn('fast');
}

function hideTooltip(){
  $('#tooltip').stop(true, true).delay(200).fadeOut('fast');
}

$('svg.graph .points circle.plain').each(function(index){ //For each plain circle...
  $(this).on('mouseenter', function(event){               //Grow shadow point when mouse enters
    $(this).prev().stop(true, false).animate({
      svgR: 12,
      svgStrokeOpacity: 0,
      svgStrokeWidth: 0,
      }, 200);
    showTooltip(this);
    moveIndicator(index);
    }).on('mouseleave', function(event){                  //Shrink shadow point when mouse leaves
    hideTooltip();
    $(this).prev().stop(true, false).animate({
      svgR: 5,
      svgStrokeOpacity: 1,
      svgStrokeWidth: 4
    }, 200);
  });
});

$('g.triggerLines line').each(function(index){
  $(this).on('mouseenter', function(){
      moveIndicator(index);
  });
});