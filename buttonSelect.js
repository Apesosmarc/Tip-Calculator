const buttons = document.querySelectorAll("button");
const tipPercentage = document.querySelector("#tipPercentage");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeAllSelectedBtns(buttons);
    tipPercentage.value = "";
    btn.classList.add("selected");
  });
});

tipPercentage.addEventListener("click", () => {
  removeAllSelectedBtns(buttons);
});

// iterates all the buttons and removes selected so only one button can be selected on click
const removeAllSelectedBtns = (buttons) => {
  buttons.forEach((btn) => {
    btn.classList.remove("selected");
  });
};

// if button selected, custom.value = ""
