<!-- Sample HTML -->
<div id="guess-input">
  <input type="text" maxlength="1">
  <input type="text" maxlength="1">
  <input type="text" maxlength="1">
  <input type="text" maxlength="1">
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("#guess-input input");

  inputs.forEach((input, index) => {

    // Prevent pasting multiple characters
    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, '');
      for (let i = 0; i < paste.length && index + i < inputs.length; i++) {
        inputs[index + i].value = paste[i];
      }
      const next = Math.min(index + paste.length, inputs.length - 1);
      inputs[next].focus();
    });

    input.addEventListener("input", (e) => {
      const value = input.value;

      // Only allow digits
      if (!/^\d$/.test(value)) {
        input.value = '';
        return;
      }

      // Overwrite existing content (in case of autofill)
      input.value = value;

      // Move to next input
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
        inputs[index + 1].select();
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
</script>



/* *old code
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
*/

