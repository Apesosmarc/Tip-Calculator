// Input Selectors
const billInput = document.querySelector("#bill");
const percInput = document.querySelector("#tip");
const peopleInput = document.querySelector("#people");

// Container Select
const btnContainers = [...document.querySelectorAll(".btn-container")];
const billContainer = document.getElementById("billContainer");
const peopleContainer = document.getElementById("peopleContainer");

// Container + all children select
const billInputs = [
  ...document.querySelectorAll("#billContainer > *"),
  billContainer,
];
const peopleInputs = [
  ...document.querySelectorAll("#peopleContainer > *"),
  peopleContainer,
];

let isFocused = false;

const containerSelect = (container, input) => {
  if (isFocused) removeAllFocused(btnContainers);
  container.classList.add("btn-container--focus");
  input.focus();
  input.select();
  isFocused = true;
};

billInputs.forEach((child) => {
  child.addEventListener("click", () =>
    containerSelect(billContainer, billInput)
  );
});

peopleInputs.forEach((child) => {
  child.addEventListener("click", () =>
    containerSelect(peopleContainer, peopleInput)
  );
});

document.addEventListener("click", (e) => {
  if (!billInputs.includes(e.target) && !peopleInputs.includes(e.target)) {
    removeAllFocused(btnContainers);
  }
});
