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
      const key = e.key;

      if (key === "Backspace") {
        e.preventDefault(); // Prevent default backspace behavior

        if (input.value !== "") {
          // If input has value, just clear it
          input.value = '';
        } else if (index > 0) {
          // Move to previous input and clear it
          inputs[index - 1].focus();
          inputs[index - 1].value = '';
        }
      } else if (key === "ArrowLeft" && index > 0) {
        inputs[index - 1].focus();
      } else if (key === "ArrowRight" && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
    
    input.addEventListener("focus", () => {
      input.select(); // So typing overwrites instead of appending
    });
  });
});
