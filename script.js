/* ================= SAFE ELEMENTS ================= */
const profileIcon = document.getElementById("profileIcon");
const profileMenu = document.getElementById("profileMenu");
const container = document.getElementById("productContainer");
const filter = document.getElementById("categoryFilter");
const searchInput = document.querySelector(".search-box");

/* ================= PROFILE DROPDOWN ================= */
if (profileIcon && profileMenu) {
    profileIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        profileMenu.style.display =
            profileMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
        profileMenu.style.display = "none";
    });
}

/* ================= NAVBAR SCROLL ================= */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".glass-navbar");
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* ================= HERO SLIDER ================= */
const slides = [
    { image: "image/bg.jpg", title: "Your Health, Our Priority", text: "Get trusted medicines delivered." },
    { image: "image/bg2.jpg", title: "24/7 Pharmacy Support", text: "We are always available." },
    { image: "image/bg1.jpg", title: "Fast Delivery", text: "Quick emergency response." }
];

let index = 0;

function changeHero() {
    const hero = document.querySelector(".hero-section");
    const title = document.getElementById("hero-title");
    const text = document.getElementById("hero-text");

    if (!hero || !title || !text) return;

    hero.style.backgroundImage = `url(${slides[index].image})`;
    title.innerText = slides[index].title;
    text.innerText = slides[index].text;

    index = (index + 1) % slides.length;
}

changeHero();
setInterval(changeHero, 5000);

/* ================= DARK MODE ================= */
document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const icon = toggle.querySelector("i");
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "on") {
        document.body.classList.add("dark-mode");
        icon.classList.replace("bi-moon-fill", "bi-sun-fill");
    }

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark ? "on" : "off");

        icon.classList.toggle("bi-sun-fill");
        icon.classList.toggle("bi-moon-fill");
    });
});

/* ================= PRODUCTS ================= */
let products = JSON.parse(localStorage.getItem("products")) || [
    { id: 1, name: "Paracetamol", category: "pain", price: 1500, stock: 10, image: "image/bg.jpg" },
    { id: 2, name: "Vitamin C", category: "supplement", price: 2000, stock: 5, image: "image/bg.jpg" },
    { id: 3, name: "Sanitizer", category: "care", price: 1200, stock: 8, image: "image/bg.jpg" },
    { id: 4, name: "First Aid Kit", category: "care", price: 5500, stock: 3, image: "image/bg.jpg" },
    { id: 5, name: "Ibuprofen", category: "pain", price: 1800, stock: 0, image: "image/bg.jpg" },
    { id: 6, name: "Multivitamin", category: "supplement", price: 3000, stock: 6, image: "image/bg.jpg" },
    { id: 7, name: "Face Mask", category: "care", price: 800, stock: 12, image: "image/bg.jpg" },
     { id: 8, name: "Face Mask", category: "care", price: 800, stock: 12, image: "image/bg.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= DISPLAY PRODUCTS ================= */
function displayProducts(list) {
    if (!container) return;

    container.innerHTML = list.map(p => `
        <div class="col-md-3">
            <div class="card product-card shadow-sm">

                <span class="badge ${p.stock > 0 ? 'bg-success' : 'bg-danger'} position-absolute m-2">
                    ${p.stock > 0 ? p.stock + " left" : "Out of Stock"}
                </span>

                <img src="${p.image}" class="card-img-top">

                <div class="card-body">
                    <h6 class="fw-bold">${p.name}</h6>
                    <small class="text-muted">${p.category}</small>

                    <div class="rating mb-1">★★★★☆</div>

                    <h5 class="text-primary">₦${p.price}</h5>

                    <button 
                        class="btn btn-primary w-100 add-btn"
                        data-id="${p.id}"
                        ${p.stock === 0 ? "disabled" : ""}
                    >
                        ${p.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                </div>

            </div>
        </div>
    `).join("");

    // animation
    setTimeout(() => {
        document.querySelectorAll(".product-card").forEach(card => {
            card.classList.add("show");
        });
    }, 100);
}

/* ================= FILTER + SEARCH ================= */
function applyFilters() {
    if (!filter || !searchInput) return;

    const category = filter.value;
    const searchVal = searchInput.value.toLowerCase();

    let filtered = products;

    if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
    }

    if (searchVal) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchVal)
        );
    }

    displayProducts(filtered);
}

filter?.addEventListener("change", applyFilters);
searchInput?.addEventListener("keyup", applyFilters);

/* ================= ADD TO CART (SINGLE CLEAN VERSION) ================= */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {

        const id = Number(e.target.dataset.id);
        const product = products.find(p => p.id === id);

        if (!product || product.stock <= 0) return;

        product.stock--;

        cart.push({ ...product });

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("products", JSON.stringify(products));

        updateCartUI();
        displayProducts(products);
        toast(product.name + " added to cart");
    }
});

/* ================= CART UI ================= */
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.innerText = cart.length;
}

updateCartUI();

/* ================= TOAST ================= */
function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast-msg";
    el.innerText = msg;

    document.body.appendChild(el);

    setTimeout(() => el.classList.add("show"), 100);
    setTimeout(() => el.remove(), 2000);
}

/* ================= INIT ================= */
displayProducts(products);

document.getElementById("contactForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Message sent successfully!");
    this.reset();
});