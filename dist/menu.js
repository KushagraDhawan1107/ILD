var menu_animation = document.querySelectorAll(".menu-animation");
var rotating_picture_container = document.querySelector(".menu-container-content--rotating-pictures");
var rotating_picture_container_images = rotating_picture_container.querySelectorAll(".image");
var menu_background = document.querySelector(".menu-background");
var menu_toggler = document.querySelector(".sidebar-fixed-section-grid--menu");
var ild_email = document.querySelector(".sidebar-fixed-section-grid--email");
var dark_mode_toggle = document.querySelector(".sidebar-fixed-section-grid--dark-mode");
var is_menu_open = false;
var menu = document.querySelector(".menu");

menu_toggler.addEventListener("click", () => {
    if (is_menu_open) {
        var menu_close_timeline = new gsap.timeline();
        ild_email.classList.remove("hidden");
        dark_mode_toggle.classList.remove("hidden");
        menu_close_timeline
            .to(
                menu_animation,
                0.5,
                {
                    y: 100,
                    stagger: 0.05,
                    ease: "power4.in"
                },
                0
            )
            .to(
                menu_background,
                1,
                {
                    height: "0%",
                    ease: "expo.inOut",
                    delay: 0.5
                },
                0
            )
            .to(
                menu_toggler,
                2,
                {
                    y: -100,
                    onComplete: () => {
                        is_menu_open = false;
                        menu.classList.add("hidden");
                        gsap.set(menu_toggler, { y: 100 }, 0);
                        menu_toggler.innerHTML = "Menu";
                        menu_toggler.classList.add("text-gray-900");
                        menu_toggler.classList.remove("text-white");
                    }
                },
                0
            )
            .to(menu_toggler, 2, { y: 0, ease: "power4.out" }, 2);
    } else {
        is_menu_open = true;
        var menu_open_timeline = new gsap.timeline();
        menu.classList.remove("hidden");

        menu_open_timeline
            .to(menu_background, 2, {
                height: "100%",
                ease: "expo.inOut"
            })
            .set(menu_animation, { y: 100 }, 0)
            .to(menu_animation, 2, { y: 0, stagger: 0.1, delay: 1, ease: "power4.out" }, 0)
            .to(
                menu_toggler,
                2,
                {
                    y: -100,
                    onComplete: () => {
                        menu_toggler.innerHTML = "Close";
                        ild_email.classList.add("hidden");
                        dark_mode_toggle.classList.add("hidden");
                        gsap.set(menu_toggler, { y: 100 }, 0);
                        menu_toggler.classList.remove("text-gray-900");
                        menu_toggler.classList.add("text-white");
                    }
                },
                0
            )
            .to(menu_toggler, 2, { y: 0, ease: "power4.out" }, 2);
    }
    menu_animation.forEach((e, f) => {
        e.addEventListener("mouseenter", () => {
            gsap.to(rotating_picture_container_images[f], 0.7, { rotation: 0, scale: 2, opacity: 1 });
            gsap.to(menu_animation[f], 1, { opacity: 1 });
        });
        e.addEventListener("mouseleave", () => {
            gsap.to(rotating_picture_container_images[f], 0.7, {
                rotation: 30,
                scale: 1,
                opacity: 0,
                onComplete: () => {
                    gsap.set(rotating_picture_container_images[f], { rotation: -30 });
                }
            });
            gsap.to(menu_animation[f], 1, { opacity: 0.3 });
        });
    });
});
