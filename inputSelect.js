const btnContainers = [...document.querySelectorAll(".btn-container")];
const billTotal = document.getElementById("billTotal");

function removeAllSelected(selected) {
  return selected.forEach((input) => {
    input.classList.remove("btn-container--focus");
  });
}

let isSelected = false;
btnContainers.forEach((input) => {
  // Iterates each input
  input.addEventListener("click", (e) => {
    // if an input is selected and an input is clicked, removeAllSelected
    if (isSelected) {
      removeAllSelected(btnContainers);
    }
    // Add selected stlyes to the input that was selected
    input.classList.add("btn-container--focus");

    // parses all child elements and selects the correct input if the input isnt directly clicked on.
    Object.values(input.childNodes).forEach((child) => {
      if (child.id === "billTotal" || child.id === "numOfPeople") {
        child.focus();
        child.select();
      }
    });

    isSelected = true;
  });
});

document.addEventListener("click", ({ target }) => {
  // Checks if any input is selected
  const isSelected = document.querySelector(".btn-container--focus");

  // if none, stop
  if (!isSelected) return;

  // if exact input wasnt selected, remove all highlight styles
  if (target.id !== isSelected.id && target.parentNode.id !== isSelected.id) {
    return removeAllSelected(btnContainers);
  }
});
