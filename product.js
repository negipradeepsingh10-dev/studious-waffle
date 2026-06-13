/* ==========================================
   PRODUCTS PAGE - products.js
   Pahadi Organics
========================================== */

/* ============ Loader ============ */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1000);
});


/* ============ Sticky Navbar ============ */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ============ Theme Toggle ============ */
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("productsTheme");

if (savedTheme) {

    html.setAttribute("data-theme", savedTheme);

    themeToggle.textContent =
        savedTheme === "light"
            ? "☀️"
            : "🌙";
}

themeToggle.addEventListener("click", () => {

    const currentTheme =
        html.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    html.setAttribute("data-theme", newTheme);

    localStorage.setItem(
        "productsTheme",
        newTheme
    );

    themeToggle.textContent =
        newTheme === "light"
            ? "☀️"
            : "🌙";
});


/* ============ Mobile Menu ============ */
const hamburger =
    document.getElementById("hamburger");

const navLinks =
    document.getElementById("navLinks");

hamburger.addEventListener("click", () => {

    if (navLinks.style.display === "flex") {

        navLinks.style.display = "none";

    } else {

        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
    }

});


/* ============ Scroll Reveal ============ */
const revealElements =
    document.querySelectorAll(".reveal-up");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");
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


/* ============ Search Products ============ */
const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const productCards =
    document.querySelectorAll(".product-card");

function filterProducts() {

    const searchValue =
        searchInput.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    productCards.forEach(card => {

        const title =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

        const category =
            card.dataset.category;

        const matchesSearch =
            title.includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });

}

searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);


/* ============ Cart ============ */
let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

const cartCount =
    document.getElementById("cartCount");

function updateCartCount() {

    cartCount.textContent =
        cart.length;
}

updateCartCount();

document
    .querySelectorAll(".add-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".product-card"
                    );

                const product = {

                    name:
                        card.querySelector("h3")
                        .textContent,

                    price:
                        card.querySelector(".price")
                        .textContent,

                    image:
                        card.querySelector("img")
                        .src
                };

                cart.push(product);

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );

                updateCartCount();

                button.textContent =
                    "Added ✓";

                setTimeout(() => {

                    button.textContent =
                        "Add to Cart";

                }, 1500);

            }
        );

    });


/* ============ Wishlist ============ */
let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

document
    .querySelectorAll(".wishlist-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".product-card"
                    );

                const productName =
                    card.querySelector("h3")
                    .textContent;

                const exists =
                    wishlist.includes(
                        productName
                    );

                if (!exists) {

                    wishlist.push(
                        productName
                    );

                    localStorage.setItem(
                        "wishlist",
                        JSON.stringify(
                            wishlist
                        )
                    );

                    button.textContent =
                        "💖";

                } else {

                    wishlist =
                        wishlist.filter(
                            item =>
                                item !==
                                productName
                        );

                    localStorage.setItem(
                        "wishlist",
                        JSON.stringify(
                            wishlist
                        )
                    );

                    button.textContent =
                        "❤️";
                }

            }
        );

    });


/* Restore Wishlist Icons */
document
    .querySelectorAll(".wishlist-btn")
    .forEach(button => {

        const card =
            button.closest(".product-card");

        const productName =
            card.querySelector("h3")
            .textContent;

        if (
            wishlist.includes(productName)
        ) {

            button.textContent =
                "💖";
        }

    });


/* ============ Back To Top ============ */
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


/* ============ Console Message ============ */
console.log(`
🛍️ Pahadi Organics
Products Page Loaded Successfully
Cart Items: ${cart.length}
Wishlist Items: ${wishlist.length}
`);