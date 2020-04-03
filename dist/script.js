//get scrollbar width
document.documentElement.style.setProperty("--scrollbar-width", window.innerWidth - document.documentElement.clientWidth + "px");

/*
 *Smooth page scroll
 *
 */

// function getAbsoluteHeight(el) {
// 	// Get the DOM Node if you pass in a string
// 	el = typeof el === "string" ? document.querySelector(el) : el;

// 	var styles = window.getComputedStyle(el);
// 	var margin = parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

// 	return Math.ceil(el.offsetHeight + margin);
// }

// var html = document.documentElement;
// var body = document.body;
// var el = document.querySelector(".content");
// var marginTop = parseInt(window.getComputedStyle(el).getPropertyValue("margin-top"));

// var scroller = {
// 	target: document.querySelector("#scroll-container"),
// 	ease: 0.05, // <= scroll speed
// 	endY: 0,
// 	y: 0,
// 	resizeRequest: 1,
// 	scrollRequest: 0,
// };

// var requestId = null;

// TweenLite.set(scroller.target, {
// 	rotation: 0.01,
// 	force3D: true,
// });

// window.addEventListener("load", onLoad);

// function onLoad() {
// 	updateScroller();
// 	window.focus();
// 	window.addEventListener("resize", onResize);
// 	document.addEventListener("scroll", onScroll);
// }

// function updateScroller() {
// 	var resized = scroller.resizeRequest > 0;

// 	if (resized) {
// 		var height = scroller.target.clientHeight + marginTop;
// 		body.style.height = height + "px";
// 		scroller.resizeRequest = 0;
// 	}

// 	var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

// 	scroller.endY = scrollY;
// 	scroller.y += (scrollY - scroller.y) * scroller.ease;

// 	if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
// 		scroller.y = scrollY;
// 		scroller.scrollRequest = 0;
// 	}

// 	TweenLite.set(scroller.target, {
// 		y: -scroller.y,
// 	});

// 	requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
// }

// function onScroll() {
// 	scroller.scrollRequest++;
// 	if (!requestId) {
// 		requestId = requestAnimationFrame(updateScroller);
// 	}
// }

// function onResize() {
// 	scroller.resizeRequest++;
// 	if (!requestId) {
// 		requestId = requestAnimationFrame(updateScroller);
// 	}
// }

/** button code */

var temp_button = document.querySelectorAll(".temp-button");
let button_animation_timeline;
var button_first_text = document.querySelectorAll(".button-first-text");
var button_second_text = document.querySelectorAll(".button-second-text");
var animating_background, animating_first_text, animating_second_text;
var first_para, second_para;
var button_animation_duration = 0.75;

button_first_text.forEach(e => {
    first_para = e.innerHTML.split("");
    e.innerHTML = "";
    first_para.forEach(f => {
        e.innerHTML = e.innerHTML + "<span>" + f + "</span>";
    });
});
button_second_text.forEach(e => {
    second_para = e.innerHTML.split("");
    e.innerHTML = "";
    second_para.forEach(f => {
        e.innerHTML = e.innerHTML + "<span>" + f + "</span>";
    });
});

function button_animation_play(target) {
    button_animation_timeline = new gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
    button_animation_timeline.timeScale(1.2);
    button_animation_timeline
        .to(
            target.querySelector(".button-background"),
            button_animation_duration,
            {
                height: "100px"
            },
            button_animation_duration / 3
        )
        .to(
            target.querySelectorAll(".button-first-text span"),
            button_animation_duration,
            {
                y: "-1rem",
                stagger: 0.01
            },
            0
        )
        .to(
            target.querySelectorAll(".button-second-text span"),
            button_animation_duration,
            {
                y: "0rem",
                stagger: 0.01
            },
            button_animation_duration / 3
        );
    button_animation_timeline.play();
}

function button_animation_reverse() {
    button_animation_timeline.reverse();
}

temp_button.forEach(e => {
    e.addEventListener("mouseenter", () => {
        button_animation_play(e);
    });

    e.addEventListener("mouseleave", () => {
        button_animation_reverse();
    });
});

//Make a ScrollMagic scene
var controller = new ScrollMagic.Controller();
var height = window.innerHeight;
var offsetValue = -height / 2;
var horscrgallery = document.querySelectorAll(".about-us-stats-section");

horscrgallery.forEach(function(e) {
    //References to DOM elements
    var imageOverlay = e.querySelector(".about-us-stats-section-container--grid");
    var containerwidth = imageOverlay.offsetWidth + "px";
    console.log(containerwidth);

    var animateImage = new gsap.timeline();

    animateImage
        .to(imageOverlay, 6, { x: "-20%" })
        .to(imageOverlay, 6, { x: "-40%" })
        .to(imageOverlay, 6, { x: "-60%" })
        .to(imageOverlay, 6, { x: "-80%" });

    //Make a ScrollMagic scene
    var scene = new ScrollMagic.Scene({
        triggerElement: e,
        triggerHook: 0,
        duration: "400%"
    })
        .setTween(animateImage)
        .setPin(e)
        .addTo(controller);
});
