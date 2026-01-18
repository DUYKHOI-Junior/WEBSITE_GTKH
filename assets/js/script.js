// Auto đánh dấu menu theo URL
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// banner chuyển ảnh tự động
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
