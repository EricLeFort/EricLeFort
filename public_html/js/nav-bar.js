$(document).scroll(function(){
	var top = $(this).scrollTop();
	var bot = top + $(window).height();

	if(top > convertRemToPixels(7)){
		$(".header .title").remove();
		$(".header .top-nav-links").css("top", "26%")
		$(".header").css("position", "fixed");
		$(".header").css("min-height", "3.7rem");
	}else{
		$(".header").css("position", "absolute");
		$(".header").css("min-height", "10rem");
		$(".header .top-nav-links").css("top", "73%")
		$(".header").prepend("<h1 class=\"title\">Projects</h1>");
	}
});

function convertRemToPixels(rem){    
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}