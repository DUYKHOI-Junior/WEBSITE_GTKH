const inputs = document.querySelectorAll("#name, #email, #password");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const transition = document.getElementById("transition");
const rightPanel = document.getElementById("rightPanel");

// Kích hoạt nút khi nhập đủ
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    const filled = [...inputs].every((i) => i.value.trim() !== "");
    registerBtn.classList.toggle("active", filled);
  });
});

// Hiệu ứng khi bấm "Đăng nhập"
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // 1️⃣ chữ trong khung xanh bay ra trước
  rightPanel.classList.add("move-out");

  // 2️⃣ sau 300ms, nền xanh phủ
  setTimeout(() => {
    transition.classList.add("transition-active");
  }, 300);

  // 3️⃣ sau 900ms, quay lại trang trước (nếu có), không thì sang signin
  setTimeout(() => {
    if (document.referrer && document.referrer !== window.location.href) {
      history.back();
    } else {
      location.href = "signin.html?from=signup";
    }
  }, 900);
});
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Nếu có trang trước đó → quay lại
  if (document.referrer && document.referrer !== window.location.href) {
    history.back();
  } else {
    // Không có trang trước → fallback (ví dụ về trang chủ)
    location.href = "index.html";
  }
});
