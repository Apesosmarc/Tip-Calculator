const validateNum = (input) => {
  const { id, parentElement, value } = input;
  const error = document.getElementById(`${id}Error`);

  if (input.id === "tip" && input.value <= 0) {
    input.value = "";
    return false;
  }

  if (input.id === "tip" && input.value > 0) {
    return true;
  }

  let isShowing = false;
  if (value <= 0) {
    isShowing = true;
    error.classList.remove("hidden");
    parentElement.classList.add("btn-container--error");
    return false;
  } else {
    error.classList.add("hidden");
    parentElement.classList.remove("btn-container--error");
    parentElement.classList.add("btn-container--focus");
    return true;
  }
};
