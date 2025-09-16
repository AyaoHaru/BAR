<script>
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("#guess-input input");

  inputs.forEach((input, index) => {

    // Handle paste (optional)
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, '');
      for (let i = 0; i < paste.length && index + i < inputs.length; i++) {
        inputs[index + i].value = paste[i];
      }
      const next = Math.min(index + paste.length, inputs.length - 1);
      inputs[next].focus();
    });

    input.addEventListener("keydown", (e) => {
      const key = e.key;

      // Handle digit overwrite manually
      if (/^\d$/.test(key)) {
        e.preventDefault();
        input.value = key;

        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }

      // Backspace logic
      else if (key === "Backspace") {
        e.preventDefault();
        if (input.value !== "") {
          input.value = '';
        } else if (index > 0) {
          inputs[index - 1].focus();
          inputs[index - 1].value = '';
        }
      }

      // Arrow navigation
      else if (key === "ArrowLeft" && index > 0) {
        inputs[index - 1].focus();
      } else if (key === "ArrowRight" && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("focus", () => {
      input.select();
    });
  });
});
</script>
