var current_mouse_pos_x = 0;
var current_mouse_pos_y = 0;
var current_touch_pos_x = 0;
var current_touch_pos_y = 0;
var max_distance = 50;
var offset_distance = window.innerWidth / 2;
var normal_mouse_pos_x = current_mouse_pos_x - offset_distance;
var project_titles = document.querySelectorAll(".movable-gallery-project-title");
var movable_gallery_item = document.querySelectorAll(".movable-gallery-item");
var movable_gallery_item_image = document.querySelectorAll(".movable-gallery-image");
var movable_gallery_project_detail = document.querySelectorAll(".movable-gallery-project-detail");
var movable_gallery_number = document.querySelectorAll(".movable-gallery-number");
var gallery_container = document.querySelector(".gallery-container");
var is_click_area_active = false;
var cursor = document.querySelector(".cursor");
var mouse_areas_left = document.querySelector(".gallery_containers-left");
var mouse_areas_right = document.querySelector(".gallery_containers-right");
var animate_link = document.querySelectorAll(".animate-link");
var feature_items_on_hover_animation = document.querySelectorAll(".feature-items-on-hover-animation");
var button_hover_animation = document.querySelector(".button-hover-animation");
var number_of_clicks = 0;
var current_cursor_value;
var cursor_scroll_offset = { x: cursor.getBoundingClientRect().left, y: cursor.getBoundingClientRect().top };
var animation_flag = true;
var is_gallery_container_active = false;
var feature_partner_section_arrows = document.querySelectorAll(".feature-partner-section--arrow");
var gallery_move_offset = (window.innerWidth * 8) / 100;

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (!isMobile()) {
	document.addEventListener("mousemove", (e) => {
		current_mouse_pos_x = e.clientX;
		current_mouse_pos_y = e.clientY;
	});

	window.addEventListener("resize", () => {
		cursor_scroll_offset = { x: cursor.getBoundingClientRect().left, y: cursor.getBoundingClientRect().top };
		gsap.to(cursor, {
			duration: 1,
			x: current_mouse_pos_x - cursor.getBoundingClientRect().width / 2,
			y: current_mouse_pos_y - cursor.getBoundingClientRect().height / 2,
			ease: "power4.out",
		});
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
			cursor.childNodes[1].src = "assets/arrow_plus.svg";
		} else if (value === "body") {
			cursor.childNodes[1].src = "assets/default_cursor.svg";
		}

		current_cursor_value = value;
	};

	var direction = () => {
		if (is_gallery_container_active) {
			if (current_mouse_pos_x <= offset_distance) {
				return "left";
			} else {
				return "right";
			}
		} else {
			return "body";
		}
	};

	gallery_container.addEventListener("mouseleave", () => {
		is_gallery_container_active = false;
	});
	gallery_container.addEventListener("mouseenter", () => {
		is_gallery_container_active = true;
		cursor_change(direction());
	});

	button_hover_animation.addEventListener("mouseleave", () => {
		is_gallery_container_active = true;
		cursor_change(direction());
	});
	button_hover_animation.addEventListener("mouseenter", () => {
		is_gallery_container_active = false;
		cursor_change("body");
	});

	feature_items_on_hover_animation.forEach((e, f) => {
		e.addEventListener("mouseenter", () => {
			cursor_change("click");
			is_click_area_active = true;
			/** to be converted to timeline
			 **/
			gsap.to(e, 1, { scale: 1.05, ease: "power4.out" });
			gsap.to(feature_partner_section_arrows[f], 1, { css: { x: 20 }, ease: "power4.out" });
		});
		e.addEventListener("mouseleave", () => {
			cursor_change("body");
			is_click_area_active = false;
			gsap.to(e, 1, { scale: 1, ease: "power4.out" });
			gsap.to(feature_partner_section_arrows[f], 1, { css: { x: 0 }, ease: "power4.out" });
		});
	});

	movable_gallery_item_image.forEach((e) => {
		e.addEventListener("mouseenter", () => {
			cursor_change("click");
			is_click_area_active = true;
			gsap.to(e, 1, { scale: 1.05, ease: "power4.out" });
			gsap.to(e.childNodes[1], 1, { scale: 1.25, ease: "power4.out" });
		});
		e.addEventListener("mouseleave", () => {
			cursor_change(direction());
			is_click_area_active = false;
			gsap.to(e, 1, { scale: 1, ease: "power4.out" });
			gsap.to(e.childNodes[1], 1, { scale: 1, ease: "power4.out" });
		});
	});

	animate_link.forEach((e) => {
		e.addEventListener("mouseover", () => {
			gsap.to(cursor.childNodes[1], 0.4, { scale: 0.3 }, 0);
		});
		e.addEventListener("mouseleave", () => {
			gsap.to(cursor.childNodes[1], 0.4, { scale: 1 }, 0);
		});
	});

	document.addEventListener("click", () => {
		if (current_cursor_value === "right" && number_of_clicks < movable_gallery_item.length - 2 && animation_flag === true) {
			animation_flag = false;
			var gallery_item_move_timeline = new gsap.timeline();
			gallery_item_move_timeline
				.to(movable_gallery_item, 2, {
					x: "-=" + (movable_gallery_item[0].getBoundingClientRect().width + gallery_move_offset),
					ease: "power4.inOut",
				})
				.to(movable_gallery_item_image, 1, { scaleX: 1.2, ease: "power4.in" }, 0)
				.to(
					movable_gallery_item_image,
					1,
					{
						scaleX: 1,
						ease: "power4.out",
						onComplete: () => {
							animation_flag = true;
						},
					},
					1
				)
				.timeScale(1.2);
			number_of_clicks++;
		} else if (current_cursor_value === "left" && number_of_clicks > 0 && animation_flag === true) {
			animation_flag = false;
			var gallery_item_move_timeline = new gsap.timeline();
			gallery_item_move_timeline
				.to(movable_gallery_item, 2, {
					x: "+=" + (movable_gallery_item[0].getBoundingClientRect().width + gallery_move_offset),
					ease: "power4.inOut",
				})
				.to(movable_gallery_item_image, 1, { scaleX: 1.1, ease: "power4.in" }, 0)
				.to(
					movable_gallery_item_image,
					1,
					{
						scaleX: 1,
						ease: "power4.out",
						onComplete: () => {
							animation_flag = true;
						},
					},
					1
				)
				.timeScale(1.2);
			number_of_clicks--;
		}
	});

	requestAnimationFrame(render);

	/* x: lerp(0.1, convert_range(project_titles[0].getBoundingClientRect().x), convert_range(normal_mouse_pos_x)), */

	var lerp = (amount, start, end) => {
		return (1 - amount) * start + amount * end;
	};
}
