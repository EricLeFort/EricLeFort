var lineDrawn = false;
var processDrawn = false;

var path = document.querySelector('.prediction-line path');		//Make line initially invisible
var len = path.getTotalLength();
path.style.strokeDasharray = len + ' ' + len;
path.style.strokeDashoffset = len;

$(document).scroll(function(){
	var top = $(this).scrollTop();

	if(top > convertRemToPixels(7)){
		$(".header .title").remove();
		$(".header .top-nav-links").css("top", "26%")
		$(".header").css("position", "fixed");
		$(".header").css("min-height", "3.7rem");
	}else{
		$(".header").css("position", "absolute");
		$(".header").css("min-height", "10rem");
		$(".header .top-nav-links").css("top", "73%")
		$(".header").prepend("<h1 class=\"title\">Welcome</h1>");
	}

	if(!processDrawn && top > convertRemToPixels(20)){
		processDrawn = true;
		$(".bulb-container").toggleClass("active");
	}

	if(!lineDrawn && top > convertRemToPixels(80)){
		animateLine();
		lineDrawn = true;
	}
});

function convertRemToPixels(rem){    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function animateLine(){
  var path = document.querySelector('.prediction-line path');
  var len = path.getTotalLength();

  path.style.strokeDasharray = len + ' ' + len;
  path.style.strokeDashoffset = len;

  path.getBoundingClientRect();
  path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out';
  path.style.strokeDashoffset = '0';
}