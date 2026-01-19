//đánh dấu menu hiện tại
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// chuyển tự động
document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("testimonialsCarousel");
  if (el) {
    new bootstrap.Carousel(el, {
      interval: 5000,
      ride: "carousel",
      pause: "hover",
    });
  }
});
