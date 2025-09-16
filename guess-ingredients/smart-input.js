document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("#guess-input input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      const value = input.value;

      if (/^\d$/.test(value)) {
        // Move to next input if digit entered
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      } else {
        // Clear invalid input
        input.value = '';
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && input.value === "" && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
});

