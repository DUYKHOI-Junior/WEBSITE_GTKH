// Hiệu ứng fade-in khi cuộn tới section "Tìm hiểu về chúng tôi"
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in-on-scroll");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  elements.forEach((el) => observer.observe(el));
});
