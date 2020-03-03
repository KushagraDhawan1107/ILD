var menu_animation = document.querySelectorAll(".menu-animation");
var rotating_picture_container = document.querySelector(".menu-container-content--rotating-pictures");
var rotating_picture_container_images = rotating_picture_container.querySelectorAll(".image");
var menu_background = document.querySelector(".menu-background");
var menu_toggler = document.querySelector(".sidebar-fixed-section-grid--menu");
var is_menu_open = false;
var menu = document.querySelector(".menu");

menu_toggler.addEventListener("click", () => {
    if (is_menu_open) {
        gsap.to(menu_animation, 0.5, {
            y: 100,
            stagger: 0.05,
            ease: "power4.in"
        });
        gsap.to(menu_background, 1, {
            height: "0%",
            ease: "expo.inOut",
            delay: 0.5
        });

        is_menu_open = false;
        menu.classList.remove("hidden");
        menu_toggler.innerHTML = "Menu";
        menu_toggler.classList.add("text-gray-900");
        menu_toggler.classList.remove("text-white");
    } else {
        is_menu_open = true;
        menu.classList.remove("hidden");
        gsap.to(menu_background, 2, {
            height: "100%",
            ease: "expo.inOut"
        });
        gsap.set(menu_animation, { y: 100 });
        gsap.to(menu_animation, 2, { y: 0, stagger: 0.1, delay: 1, ease: "power4.out" });
        menu_toggler.innerHTML = "Close";
        menu_toggler.classList.remove("text-gray-900");
        menu_toggler.classList.add("text-white");
    }
    menu_animation.forEach((e, f) => {
        e.addEventListener("mouseenter", () => {
            console.log(f);
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
