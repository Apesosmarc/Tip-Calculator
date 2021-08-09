const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeAllSelected(buttons);
    percInput.value = "";
    btn.classList.add("selected");
  });
});

percInput.addEventListener("click", () => {
  removeAllSelected(buttons);
});
