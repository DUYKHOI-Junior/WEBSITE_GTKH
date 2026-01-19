document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(
    "#fname, #lname, #birthday, #gender, #email, #message",
  );
  const sendBtn = document.getElementById("sendBtn");
  const form = document.getElementById("feedbackForm");
  const transition = document.getElementById("transition");

  function checkInputs() {
    const isFilled = Array.from(inputs).every(
      (input) => input.value.trim() !== "",
    );

    if (isFilled) {
      sendBtn.disabled = false;
      sendBtn.classList.add("active");
    } else {
      sendBtn.disabled = true;
      sendBtn.classList.remove("active");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("input", checkInputs);
    input.addEventListener("change", checkInputs);
  });

  checkInputs();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (sendBtn.disabled) return;

    if (transition) {
      transition.classList.add("transition-active");
    }

    setTimeout(() => {
      alert(
        "✅ Cảm ơn " +
          document.getElementById("lname").value +
          "! Chúng tôi đã nhận được phản hồi.",
      );

      form.reset();

      checkInputs();

      if (transition) {
        transition.classList.remove("transition-active");
      }
    }, 1000);
  });
});
