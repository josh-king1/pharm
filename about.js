const counters = document.querySelectorAll(".counter");

let started = false;

function startCounter() {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const speed = target / 100;

        const updateCount = () => {
            count += speed;

            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString() + (target >= 1000 ? "+" : "%");
            }
        };

        counter.classList.add("show");
        updateCount();
    });
}

window.addEventListener("scroll", () => {
    const section = document.querySelector(".stats-section");
    const sectionTop = section.getBoundingClientRect().top;

    if (!started && sectionTop < window.innerHeight - 100) {
        startCounter();
        started = true;
    }
});

