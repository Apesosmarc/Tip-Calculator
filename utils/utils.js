// Deselects all selected buttons
const removeAllSelected = (buttons) => {
  buttons.forEach((btn) => {
    btn.classList.remove("selected");
  });
};

// Deselects all focused inputs
function removeAllFocused(focused) {
  return focused.forEach((input) => {
    input.classList.remove("btn-container--error");
    input.classList.remove("btn-container--focus");
  });
}
