//get scrollbar width
document.documentElement.style.setProperty("--scrollbar-width", window.innerWidth - document.documentElement.clientWidth + "px");

/*
 *Smooth page scroll
 *
 */

function getAbsoluteHeight(el) {
	// Get the DOM Node if you pass in a string
	el = typeof el === "string" ? document.querySelector(el) : el;

	var styles = window.getComputedStyle(el);
	var margin = parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

	return Math.ceil(el.offsetHeight + margin);
}

var html = document.documentElement;
var body = document.body;
var el = document.querySelector(".content");
var marginTop = parseInt(window.getComputedStyle(el).getPropertyValue("margin-top"));

var scroller = {
	target: document.querySelector("#scroll-container"),
	ease: 0.05, // <= scroll speed
	endY: 0,
	y: 0,
	resizeRequest: 1,
	scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
	rotation: 0.01,
	force3D: true,
});

window.addEventListener("load", onLoad);

function onLoad() {
	updateScroller();
	window.focus();
	window.addEventListener("resize", onResize);
	document.addEventListener("scroll", onScroll);
}

function updateScroller() {
	var resized = scroller.resizeRequest > 0;

	if (resized) {
		var height = scroller.target.clientHeight + marginTop;
		body.style.height = height + "px";
		scroller.resizeRequest = 0;
	}

	var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

	scroller.endY = scrollY;
	scroller.y += (scrollY - scroller.y) * scroller.ease;

	if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
		scroller.y = scrollY;
		scroller.scrollRequest = 0;
	}

	TweenLite.set(scroller.target, {
		y: -scroller.y,
	});

	requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
	scroller.scrollRequest++;
	if (!requestId) {
		requestId = requestAnimationFrame(updateScroller);
	}
}

function onResize() {
	scroller.resizeRequest++;
	if (!requestId) {
		requestId = requestAnimationFrame(updateScroller);
	}
}

/** button code */

var temp_button = document.querySelector(".temp-button");
var button_background = temp_button.querySelector(".button-background");
let button_animation_timeline = new gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
var button_first_text = document.querySelector(".button-first-text");
var button_second_text = document.querySelector(".button-second-text");
var a = button_first_text.innerHTML.split("");
var b = button_second_text.innerHTML.split("");
var button_animation_duration = 0.75;

button_first_text.innerHTML = "";
button_second_text.innerHTML = "";

a.forEach((e) => {
	console.log(e);
	button_first_text.innerHTML = button_first_text.innerHTML + "<span>" + e + "</span>";
});

b.forEach((e) => {
	console.log(e);
	button_second_text.innerHTML = button_second_text.innerHTML + "<span>" + e + "</span>";
});

button_animation_timeline
	.to(
		button_background,
		button_animation_duration,
		{
			height: "100px",
		},
		button_animation_duration / 3
	)
	.to(
		".button-first-text span",
		button_animation_duration,
		{
			y: "-1rem",
			stagger: 0.01,
		},
		0
	)
	.to(
		".button-second-text span",
		button_animation_duration,
		{
			y: "0rem",
			stagger: 0.01,
		},
		button_animation_duration / 3
	);

button_animation_timeline.timeScale(1.2);

temp_button.addEventListener("mouseenter", () => {
	button_animation_timeline.play();
});

temp_button.addEventListener("mouseleave", () => {
	button_animation_timeline.reverse();
});
