const buttons = document.querySelectorAll("button");
const resetBtn = document.querySelector(".display__resetBtn");

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

resetBtn.addEventListener("click", () => {
  location.reload();
});
