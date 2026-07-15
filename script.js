// ==========================================
// ETHIEL CARE
// Website JavaScript
// ==========================================

// Loading Screen
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 700);
    }
});

// Sticky Navbar
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (!nav) return;

    if (window.scrollY > 80) {
        nav.style.padding = "14px 35px";
        nav.style.background = "rgba(255,255,255,.95)";
        nav.style.boxShadow = "0 20px 50px rgba(0,0,0,.15)";
    } else {
        nav.style.padding = "18px 40px";
        nav.style.background = "rgba(255,255,255,.75)";
        nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Fade In Sections
const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});

// Gallery Lightbox
document.querySelectorAll(".gallery-grid img").forEach(image => {

    image.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.className = "lightbox";

        overlay.innerHTML = `
        <div class="lightbox-content">
            <img src="${image.src}">
            <span class="close-lightbox">&times;</span>
        </div>
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => overlay.remove());

    });

});

// Scroll To Top
const topButton = document.createElement("button");

topButton.className = "top-button";

topButton.innerHTML = "↑";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 600)

        topButton.classList.add("show-top");

    else

        topButton.classList.remove("show-top");

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// Animated Counters
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let current = 0;

        const speed = target / 120;

        function update() {

            if (current < target) {

                current += speed;

                counter.textContent = Math.ceil(current);

                requestAnimationFrame(update);

            } else {

                counter.textContent = target + "+";

            }

        }

        update();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => counterObserver.observe(counter));

// Floating Particles
const particles = document.createElement("div");

particles.className = "particles";

document.body.appendChild(particles);

for (let i = 0; i < 35; i++) {

    const particle = document.createElement("span");

    particle.style.left = Math.random() * 100 + "vw";

    particle.style.animationDuration = 8 + Math.random() * 8 + "s";

    particle.style.animationDelay = Math.random() * 6 + "s";

    particles.appendChild(particle);

}

// Mouse Glow
const glow = document.createElement("div");

glow.className = "mouse-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});

// Hero Tilt
const heroImage = document.querySelector(".hero-right img");

if (heroImage) {

    heroImage.addEventListener("mousemove", e => {

        const rect = heroImage.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 20;

        const rotateX = (rect.height / 2 - y) / 20;

        heroImage.style.transform =
            `perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)`;

    });

    heroImage.addEventListener("mouseleave", () => {

        heroImage.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

}