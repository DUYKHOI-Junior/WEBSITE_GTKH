document.addEventListener("DOMContentLoaded", function () {
  // 1. Lấy các phần tử cần thiết
  const inputs = document.querySelectorAll(
    "#fname, #lname, #birthday, #gender, #email, #message",
  );
  const sendBtn = document.getElementById("sendBtn");
  const form = document.getElementById("feedbackForm");
  const transition = document.getElementById("transition"); // Đảm bảo bạn có thẻ div này trong HTML

  // 2. Hàm kiểm tra xem đã điền đủ chưa
  function checkInputs() {
    // Chuyển NodeList thành Mảng để dùng hàm .every()
    const isFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== "",
    );

    if (isFilled) {
      sendBtn.disabled = false; // Mở khóa nút
      sendBtn.classList.add("active"); // Thêm class để đổi màu
    } else {
      sendBtn.disabled = true; // Khóa nút
      sendBtn.classList.remove("active"); // Xóa class màu
    }
  }

  // 3. Lắng nghe sự kiện nhập liệu
  inputs.forEach((input) => {
    // "input" bắt sự kiện gõ phím, "change" bắt sự kiện chọn (cho dropdown/date)
    input.addEventListener("input", checkInputs);
    input.addEventListener("change", checkInputs);
  });

  // Chạy kiểm tra 1 lần ngay khi tải trang (đề phòng trình duyệt tự điền form)
  checkInputs();

  // 4. Xử lý khi bấm Gửi
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Chặn load lại trang

    // Nếu nút đang bị disabled thì dừng lại ngay
    if (sendBtn.disabled) return;

    // Hiệu ứng chuyển cảnh (nếu có)
    if (transition) {
      transition.classList.add("transition-active");
    }

    // Giả lập gửi dữ liệu (delay 1 giây)
    setTimeout(() => {
      alert(
        "✅ Cảm ơn " +
          document.getElementById("lname").value +
          "! Chúng tôi đã nhận được phản hồi.",
      );

      // Reset form về trắng tinh
      form.reset();

      // Kiểm tra lại để khóa nút Gửi sau khi reset
      checkInputs();

      // Tắt hiệu ứng transition (nếu có)
      if (transition) {
        transition.classList.remove("transition-active");
      }
    }, 1000);
  });
});
