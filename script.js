// Small progressive enhancements. The page still works without this file:
// the nav links wrap on small screens and the gallery can be swiped or scrolled.

// mobile menu
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.getElementById("site-nav");

function setMenu(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    siteNav.classList.toggle("is-open", open);
}

navToggle.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});

// close after choosing a link, or with Escape
siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        navToggle.focus();
    }
});

// gallery carousel buttons
const track = document.getElementById("scene-track");
const prevBtn = document.querySelector('[data-carousel="prev"]');
const nextBtn = document.querySelector('[data-carousel="next"]');

function slideWidth() {
    const slide = track.querySelector(".scene");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return slide.getBoundingClientRect().width + gap;
}

function updateButtons() {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    prevBtn.disabled = track.scrollLeft <= 1;
    nextBtn.disabled = track.scrollLeft >= maxScroll;
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function slide(direction) {
    track.scrollBy({
        left: direction * slideWidth(),
        behavior: reduceMotion.matches ? "auto" : "smooth",
    });
}

prevBtn.addEventListener("click", () => slide(-1));
nextBtn.addEventListener("click", () => slide(1));
track.addEventListener("scroll", updateButtons, { passive: true });
window.addEventListener("resize", updateButtons);
updateButtons();
