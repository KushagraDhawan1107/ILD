//get scrollbar width
document.documentElement.style.setProperty("--scrollbar-width", window.innerWidth - document.documentElement.clientWidth + "px");

/*---------------
Virtual smooth Scroll
---------------*/
class VirtualSmoothScroll {
    constructor() {
        this.$ = {
            dom: document.getElementsByClassName("ild-section")[0],
            fakeScroll: document.getElementsByClassName("ild-section__outer-scroll")[0],
            scroll: document.getElementsByClassName("ild-section__scroll")[0]
        };

        this.init();
        this.events();
        this.animate();
    }

    init() {
        const winH = window.innerHeight;
        document.body.style.height = `${winH}px`;
        this.$.dom.style.height = `${winH}px`;
        this.$.fakeScroll.style.height = `${this.$.scroll.getBoundingClientRect().height}px`;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        TweenMax.to(this.$.scroll, 1, {
            y: -this.$.dom.scrollTop
        });
    }

    events() {
        window.addEventListener("load", this.init.bind(this));
        window.addEventListener("resize", this.init.bind(this));
    }
}

const vs = new VirtualSmoothScroll();
