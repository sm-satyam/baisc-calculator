const displayText = document.querySelector("#displayText");
let currentInput = "";
let animationActive = false;

function updateScreen() {
  displayText.textContent = currentInput;

  if (animationActive) {
    displayText.classList.remove("scroll-up-animation");
    void displayText.offsetWidth; // Trigger reflow to restart the animation
    displayText.classList.add("scroll-up-animation");
  }
}

function appendToScreen(value) {
  currentInput += value;
  animationActive = false; // Reset animation flag
  updateScreen();
}

function clearScreen() {
  currentInput = "";
  animationActive = false; // Reset animation flag
  updateScreen();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  animationActive = false; // Reset animation flag
  updateScreen();
}

function calculateResult() {
  try {
    currentInput = eval(currentInput).toString();
    animationActive = true; // Enable animation only when "=" is pressed
    updateScreen();
  } catch (error) {
    currentInput = "Error";
    animationActive = false; // Reset animation flag
    updateScreen();
  }
}

// Add event listeners for keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Check if the key is a digit or an operator
  if (/[0-9+\-*/.=]/.test(key)) {
    appendToScreen(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  }
});

// Prevent default behavior for some keys (e.g., preventing page scroll on arrow keys)
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
    event.preventDefault();
  }
});