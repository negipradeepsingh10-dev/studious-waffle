/* ==========================================================
   PAHADI ORGANICS — script.js
   Premium Homepage Interactions
========================================================== */

// Loader
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1200);
});


// Navbar Scroll Effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);
});


// Mobile Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
});

// Close menu on click
document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
    });
});


// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left"
);

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(el => {
    revealObserver.observe(el);
});


// Testimonials Slider
const track = document.getElementById("testimonialsTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("sliderDots");

if (track) {

    const slides = track.children;
    const totalSlides = slides.length;

    let currentIndex = 0;

    function getSlidesPerView() {
        return window.innerWidth <= 760 ? 1 : 3;
    }

    function updateSlider() {

        const slidesPerView = getSlidesPerView();

        const slideWidth =
            slides[0].getBoundingClientRect().width + 24;

        track.style.transform =
            `translateX(-${currentIndex * slideWidth}px)`;

        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === currentIndex
            );
        });
    }

    function createDots() {

        dotsContainer.innerHTML = "";

        const totalDots =
            totalSlides - getSlidesPerView() + 1;

        for (let i = 0; i < totalDots; i++) {

            const dot = document.createElement("div");

            dot.className = "dot";

            if (i === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                currentIndex = i;
                updateSlider();
            });

            dotsContainer.appendChild(dot);
        }
    }

    createDots();

    nextBtn.addEventListener("click", () => {

        const maxIndex =
            totalSlides - getSlidesPerView();

        currentIndex++;

        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        updateSlider();
    });

    prevBtn.addEventListener("click", () => {

        const maxIndex =
            totalSlides - getSlidesPerView();

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = maxIndex;
        }

        updateSlider();
    });

    window.addEventListener("resize", () => {
        currentIndex = 0;
        createDots();
        updateSlider();
    });

    setInterval(() => {
        nextBtn.click();
    }, 5000);
}


// Counter Animation
const counters = document.querySelectorAll(".stat-num");

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const counter = entry.target;

                const target =
                    +counter.getAttribute("data-target");

                let count = 0;

                const increment = target / 100;

                const updateCounter = () => {

                    if (count < target) {

                        count += increment;

                        counter.textContent =
                            Math.ceil(count);

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.textContent = target;
                    }
                };

                updateCounter();

                counterObserver.unobserve(counter);
            }
        });
    },
    {
        threshold: 0.5
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// Newsletter Form
const nlForm = document.getElementById("nlForm");

if (nlForm) {

    nlForm.addEventListener("submit", e => {

        e.preventDefault();

        const name =
            document.getElementById("nlName");

        const email =
            document.getElementById("nlEmail");

        const success =
            document.getElementById("nlSuccess");

        if (
            name.value.trim() === "" ||
            email.value.trim() === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        success.classList.add("show");

        nlForm.reset();

        setTimeout(() => {
            success.classList.remove("show");
        }, 5000);
    });
}


// Back To Top
const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// Hero Canvas Animation
const canvas =
    document.getElementById("mountainCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    let offset = 0;

    function drawMountain() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.beginPath();

        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 20) {

            const y =
                canvas.height * 0.7 +
                Math.sin((x + offset) * 0.01) * 40 +
                Math.sin((x + offset) * 0.02) * 20;

            ctx.lineTo(x, y);
        }

        ctx.lineTo(
            canvas.width,
            canvas.height
        );

        ctx.closePath();

        ctx.fillStyle =
            "rgba(122,173,107,0.12)";

        ctx.fill();

        offset += 1;

        requestAnimationFrame(drawMountain);
    }

    drawMountain();
}