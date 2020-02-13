var current_mouse_pos_x = 0;
var current_mouse_pos_y = 0;
var max_distance = 50;
var offset_distance = window.innerWidth / 2;
var normal_mouse_pos_x = current_mouse_pos_x - offset_distance;
var project_titles = document.querySelectorAll(".movable-gallery-project-title");
var movable_gallery_item = document.querySelectorAll(".movable-gallery-item");
var movable_gallery_item_image = document.querySelectorAll(".movable-gallery-image");
var is_click_area_active = false;
var cursor = document.querySelector(".cursor");
var mouse_areas_left = document.querySelector(".mouseareas-left");
var mouse_areas_right = document.querySelector(".mouseareas-right");
var number_of_clicks = 0;
var current_cursor_value;
var animation_flag = true;

document.addEventListener("mousemove", (e) => {
	current_mouse_pos_x = e.clientX;
	current_mouse_pos_y = e.clientY;
});

var convert_range = (current_position) => {
	return ((current_position - -offset_distance) / (offset_distance - -offset_distance)) * (max_distance - -max_distance) + -max_distance;
};

function render() {
	normal_mouse_pos_x = current_mouse_pos_x - offset_distance;
	gsap.to(project_titles, 2, {
		x: convert_range(normal_mouse_pos_x),
		ease: "power4.out",
	});

	gsap.to(cursor, {
		duration: 1,
		x: current_mouse_pos_x - cursor.getBoundingClientRect().width / 2,
		y: current_mouse_pos_y - cursor.getBoundingClientRect().height / 2,
		ease: "power4.out",
	});

	if (!is_click_area_active) {
		cursor_change(direction());
	}
	requestAnimationFrame(render);
}

var cursor_change = (value) => {
	if (value === "right") {
		cursor.childNodes[1].src = "assets/arrow_right.svg";
	} else if (value === "left") {
		cursor.childNodes[1].src = "assets/arrow_left.svg";
	} else if (value === "click") {
		cursor.childNodes[1].src = "assets/arrow_click.svg";
	}

	current_cursor_value = value;
};

var direction = () => {
	if (current_mouse_pos_x <= offset_distance) {
		return "left";
	} else {
		return "right";
	}
};

movable_gallery_item_image.forEach((e) => {
	e.addEventListener("mouseenter", () => {
		cursor_change("click");
		is_click_area_active = true;
		var active_width = e.getBoundingClientRect().width;
		var active_height = e.getBoundingClientRect().height;
		console.log(active_width + 25.6);
		gsap.to(e, 1, {css: {"transform" : "scale(1.1)"}, ease: "power4.inOut"});
	});
	e.addEventListener("mouseleave", () => {
		cursor_change(direction());
		is_click_area_active = false;
		var active_width = e.getBoundingClientRect().width;
		var active_height = e.getBoundingClientRect().height;
		gsap.to(e, 1, {css: {"transform" : "scale(1)"}, ease: "power4.inOut"});
	});
});

document.addEventListener("click", () => {
	if (current_cursor_value === "right" && number_of_clicks < movable_gallery_item.length - 2 && animation_flag === true) {
		animation_flag = false;
		gsap.to(movable_gallery_item, 2, { onComplete: () => {
			animation_flag = true;
		}, x: "-=" + (movable_gallery_item[0].getBoundingClientRect().width + 80), ease: "power4.inOut" });
		number_of_clicks++;
	} else if (current_cursor_value === "left" && number_of_clicks > 0 && animation_flag === true) {
		animation_flag = false;
		console.log(movable_gallery_item[0].getBoundingClientRect().width + 80);
		gsap.to(movable_gallery_item, 2, { onComplete: () => {
			animation_flag = true;
		}, x: "+=" + (movable_gallery_item[0].getBoundingClientRect().width + 80), ease: "power4.inOut" });
		number_of_clicks--;
	}
});

mouse_areas_left.addEventListener("mouseenter", () => {
	cursor_change("left");
});

mouse_areas_right.addEventListener("mouseenter", () => {
	cursor_change("right");
});

requestAnimationFrame(render);

/* x: lerp(0.1, convert_range(project_titles[0].getBoundingClientRect().x), convert_range(normal_mouse_pos_x)), */

var lerp = (amount, start, end) => {
	return (1 - amount) * start + amount * end;
};
