/* ==========================================
   ABOUT PAGE - about.js
   Pahadi Organics
========================================== */

// ================= Loader =================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1000);
});


// ================= Sticky Navbar =================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ================= Theme Toggle =================
const themeBtn = document.getElementById("themeToggle");
const html = document.documentElement;

// Saved Theme
const savedTheme = localStorage.getItem("aboutTheme");

if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);

    themeBtn.textContent =
        savedTheme === "light" ? "☀️" : "🌙";
}

themeBtn.addEventListener("click", () => {

    const currentTheme =
        html.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    html.setAttribute("data-theme", newTheme);

    localStorage.setItem(
        "aboutTheme",
        newTheme
    );

    themeBtn.textContent =
        newTheme === "light"
            ? "☀️"
            : "🌙";
});


// ================= Mobile Menu =================
const hamburger =
    document.getElementById("hamburger");

const navLinks =
    document.getElementById("navLinks");

hamburger.addEventListener("click", () => {

    if (
        navLinks.style.display === "flex"
    ) {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
    }

});


// ================= Reveal Animation =================
const revealElements =
    document.querySelectorAll(
        ".reveal-up, .reveal-left"
    );

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );
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


// ================= Counter Animation =================
const counters =
    document.querySelectorAll(".counter");

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const counter =
                        entry.target;

                    const target =
                        parseInt(
                            counter.dataset.target
                        );

                    let current = 0;

                    const increment =
                        target / 120;

                    const updateCounter = () => {

                        current += increment;

                        if (current < target) {

                            counter.textContent =
                                Math.ceil(current);

                            requestAnimationFrame(
                                updateCounter
                            );

                        } else {

                            counter.textContent =
                                target.toLocaleString();
                        }

                    };

                    updateCounter();

                    counterObserver.unobserve(
                        counter
                    );
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


// ================= Back To Top =================
const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ================= Smooth Anchor Scroll =================
document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (e) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    e.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


// ================= Floating Team Cards =================
const teamCards =
    document.querySelectorAll(".team-card");

teamCards.forEach((card, index) => {

    card.style.animation =
        `floatCard 4s ease-in-out ${
            index * 0.3
        }s infinite`;

});


// Create Animation Dynamically
const style =
    document.createElement("style");

style.innerHTML = `
@keyframes floatCard {
    0%,100%{
        transform:translateY(0px);
    }

    50%{
        transform:translateY(-8px);
    }
}
`;

document.head.appendChild(style);


// ================= CTA Button Effect =================
const ctaBtn =
    document.querySelector(".btn");

if (ctaBtn) {

    ctaBtn.addEventListener("mouseenter", () => {

        ctaBtn.style.transform =
            "translateY(-5px) scale(1.03)";
    });

    ctaBtn.addEventListener("mouseleave", () => {

        ctaBtn.style.transform =
            "translateY(0) scale(1)";
    });

}


// ================= Console Signature =================
console.log(`
🏔️ Pahadi Organics
About Page Loaded Successfully
Made with ❤️ in Uttarakhand
`);