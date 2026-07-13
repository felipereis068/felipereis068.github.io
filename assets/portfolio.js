const filters = document.querySelectorAll(".filter");
const shots = document.querySelectorAll(".shot");
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxTitle = lightbox?.querySelector("p");
const closeButton = lightbox?.querySelector(".lightbox-close");

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
