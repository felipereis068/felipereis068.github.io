const filters = document.querySelectorAll(".filter");
const shots = document.querySelectorAll(".shot");
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxTitle = lightbox?.querySelector("p");
const closeButton = lightbox?.querySelector(".lightbox-close");
const animatedRails = document.querySelectorAll(".module-shot-grid");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    shots.forEach((shot) => {
      shot.hidden = group !== "all" && shot.dataset.group !== group;
    });
  });
});

shots.forEach((shot) => {
  shot.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxTitle) return;

    lightboxImage.src = shot.dataset.img;
    lightboxImage.alt = shot.querySelector("img")?.alt || "";
    lightboxTitle.textContent = shot.dataset.title || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImage || !lightboxTitle) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxTitle.textContent = "";
}

closeButton?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

if (!prefersReducedMotion) {
  animatedRails.forEach((rail) => {
    let paused = false;
    let direction = 1;
    let resumeTimeout = 0;

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimeout);
    };

    const scheduleResume = () => {
      window.clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        paused = false;
      }, 1800);
    };

    rail.addEventListener("mouseenter", pause);
    rail.addEventListener("mouseleave", scheduleResume);
    rail.addEventListener("focusin", pause);
    rail.addEventListener("focusout", scheduleResume);
    rail.addEventListener("pointerdown", pause);
    rail.addEventListener("scroll", scheduleResume, { passive: true });

    const advance = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;

      if (maxScroll <= 8 || paused || lightbox?.getAttribute("aria-hidden") === "false") {
        return;
      }

      if (rail.scrollLeft >= maxScroll - 4) {
        direction = -1;
      } else if (rail.scrollLeft <= 4) {
        direction = 1;
      }

      rail.scrollBy({
        left: direction * Math.min(360, Math.max(220, rail.clientWidth * 0.32)),
        behavior: "smooth",
      });
    };

    window.setInterval(advance, 2600);
  });
}
