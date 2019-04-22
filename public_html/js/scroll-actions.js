var lineDrawn = false;
var processDrawn = false;

var path = document.querySelector('.prediction-line path');		//Make elements initially invisible
var len = path.getTotalLength();
path.style.strokeDasharray = len + ' ' + len;
path.style.strokeDashoffset = len;
paths = $('.design-edges line');
paths.each(function(i){
	var len = paths[i].getTotalLength();

	paths[i].style.strokeDasharray = len + ' ' + len;
	paths[i].style.strokeDashoffset = len;
});
paths = $('#check-marks line');
paths.each(function(i){
	var len = paths[i].getTotalLength();

	paths[i].style.strokeDasharray = len + ' ' + len;
	paths[i].style.strokeDashoffset = len;
});
var elements = $('.design-nodes circle');
elements.each(function(i){
	elements[i].style.opacity = '0';
});
elements = $('.right-arrow path');
elements.each(function(i){
	elements[i].style.opacity = '0';
});
elements = $('#verify-sheet polyline');
elements.each(function(i){
	elements[i].style.opacity = '0';
});
elements = $('#check-marks polyline');
elements.each(function(i){
	elements[i].style.opacity = '0';
});
$('#cursor1')[0].style.opacity = '0';
$('#cursor2')[0].style.opacity = '0';
$('#cursor3')[0].style.opacity = '0';
$('#cursor4')[0].style.opacity = '0';
$('#char1')[0].style.opacity = '0';
$('#char2')[0].style.opacity = '0';
$('#char3')[0].style.opacity = '0';

$(document).scroll(function(){
	var top = $(this).scrollTop();
	var bot = top + $(window).height();

	if(top > convertRemToPixels(7)){
		$(".header .title").remove();
		$(".header .top-nav-links").css("top", "0")
		$(".header").css("position", "fixed");
		$(".header").css("min-height", "5rem");
	}else{
		$(".header").css("position", "absolute");
		$(".header").css("min-height", "10rem");
		$(".header .top-nav-links").css("top", "5rem")
		$(".header").prepend("<h1 class=\"title\">Welcome</h1>");
	}

	var arrow1Start = 500;
	var arrow2Start = 3600;
	var arrow3Start = 5600;
	var designStart = 1000;
	var buildStart = 3800;
	var verifyStart = 5700;
	if(!processDrawn && bot > convertRemToPixels(85)){
		$(".bulb-container").toggleClass("active");

		setTimeout(function(){			//Design step
			fadeIn('#arrow1 path');
			setTimeout(function(){}, 0)},
			arrow1Start);
		setTimeout(function(){
			fadeIn('.design-nodes circle');
			setTimeout(function(){}, 0)},
			designStart);
		setTimeout(function(){
			animateEdges('#EdgeGroup1.design-edges line');
			setTimeout(function(){}, 0)},
			designStart + 500);
		setTimeout(function(){
			animateEdges('#EdgeGroup2.design-edges line');
			setTimeout(function(){}, 0)},
			designStart + 1000);
		setTimeout(function(){
			animateEdges('#EdgeGroup3.design-edges line');
			setTimeout(function(){}, 0)},
			designStart + 1500);
		setTimeout(function(){
			animateEdges('#EdgeGroup4.design-edges line');
			setTimeout(function(){}, 0)},
			designStart + 2000);

		setTimeout(function(){			//Build step
			fadeIn('#arrow2 path');
			setTimeout(function(){}, 0)},
			arrow2Start);
		setTimeout(function(){
			cursorBlink(true, 1);
			setTimeout(function(){}, 0)},
			buildStart);
		setTimeout(function(){
			cursorBlink(false, 1);
			setTimeout(function(){}, 0)},
			buildStart+200);
		setTimeout(function(){
			cursorBlink(true, 1);
			setTimeout(function(){}, 0)},
			buildStart+400);
		setTimeout(function(){
			cursorBlink(false, 1);
			$('#char1')[0].style.opacity = '1';
			cursorBlink(true, 2);
			setTimeout(function(){}, 0)},
			buildStart+600);
		setTimeout(function(){
			cursorBlink(false, 2);
			$('#char2')[0].style.opacity = '1';
			cursorBlink(true, 3);
			setTimeout(function(){}, 0)},
			buildStart+800);
		setTimeout(function(){
			cursorBlink(false, 3);
			$('#char3')[0].style.opacity = '1';
			cursorBlink(true, 4);
			setTimeout(function(){}, 0)},
			buildStart+1000);
		setTimeout(function(){
			cursorBlink(false, 4);
			setTimeout(function(){}, 0)},
			buildStart+1200);
		setTimeout(function(){
			cursorBlink(true, 4);
			setTimeout(function(){}, 0)},
			buildStart+1400);
		setTimeout(function(){
			cursorBlink(false, 4);
			setTimeout(function(){}, 0)},
			buildStart+1600);

		setTimeout(function(){			//Verify step
			fadeIn('#arrow3 path');
			setTimeout(function(){}, 0)},
			arrow3Start);
		setTimeout(function(){			//Verify step
			fadeIn('#verify-sheet polyline');
			setTimeout(function(){}, 0)},
			verifyStart);
		setTimeout(function(){			//Verify step
			animateLines('#check1a', 0.3);
			setTimeout(function(){}, 0)},
			verifyStart+500);
		setTimeout(function(){			//Verify step
			animateLines('#check1b', 0.3);
			setTimeout(function(){}, 0)},
			verifyStart+800);
		setTimeout(function(){			//Verify step
			animateLines('#check2a', 0.3);
			setTimeout(function(){}, 0)},
			verifyStart+1100);
		setTimeout(function(){			//Verify step
			animateLines('#check2b', 0.3);
			setTimeout(function(){}, 0)},
			verifyStart+1400);
		setTimeout(function(){			//Verify step
			animateLines('#check3a', 0.3);
			setTimeout(function(){}, 0)},
			verifyStart+1700);
		setTimeout(function(){			//Verify step
			animateLines('#check3b', 0.3);
			setTimeout(function(){}, 0)},
			verifyStart+2000);

		processDrawn = true;
	}

	if(!lineDrawn && bot > convertRemToPixels(115)){
		animateLine('.prediction-line path');
		lineDrawn = true;
	}
});

function convertRemToPixels(rem){    
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function animateLine(elementQuery){
	var path = document.querySelector(elementQuery);
	var len = path.getTotalLength();

	path.style.strokeDasharray = len + ' ' + len;
	path.style.strokeDashoffset = len;

	path.getBoundingClientRect();
	path.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out';
	path.style.strokeDashoffset = '0';
}

function fadeIn(elementQuery){
	var elements = $(elementQuery);
	elements.each(function(i){
		elements[i].style.transition = 'opacity 0.25s ease-in-out';
		elements[i].style.opacity = '1';
	});
}

function animateEdges(elementQuery){
	var paths = $(elementQuery);
	paths.each(function(i){
		var len = paths[i].getTotalLength();

		paths[i].style.strokeDasharray = len + ' ' + len;
		paths[i].style.strokeDashoffset = len;

		paths[i].getBoundingClientRect();
		paths[i].style.WebkitTransition = 'stroke-dashoffset 0.5s ease-in-out';
		paths[i].style.strokeDashoffset = '0';
	});
}

function animateLines(elementQuery, speed){
	var path = document.querySelector(elementQuery);
	var len = path.getTotalLength();

	path.style.strokeDasharray = len + ' ' + len;
	path.style.strokeDashoffset = len;

	path.getBoundingClientRect();
	path.style.WebkitTransition = 'stroke-dashoffset ' + speed + 's ease-in-out';
	path.style.strokeDashoffset = '0';
}

function cursorBlink(show, num){
	if(show){
		$('#cursor' + num)[0].style.opacity = '1';
	}else{
		$('#cursor' + num)[0].style.opacity = '0';
	}
}