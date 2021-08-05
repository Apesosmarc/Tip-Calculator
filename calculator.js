// Input Selectors
const billInput = document.querySelector("#billTotal");
const percInput = document.querySelector("#tipPercentage");
const personInput = document.querySelector("#numOfPeople");

// Num Output Selectors
const total = document.querySelector("#totalPerPerson");
const tipAmount = document.querySelector("#tipAmount");

// Sets global debounce time in ms
const inputDebounceTime = 1000;

const debounce = (func) => {
  // init outside variable for closure
  let timeId;
  return (...args) => {
    //checks if timer has val, if so: clear that timer and replace
    if (timeId) {
      clearTimeout(timeId);
    }
    // resets the timer to var outside current scope
    timeId = setTimeout(func, inputDebounceTime);
  };
};

// Reads current values stored in dom and passes them as totalObj
const getVals = () => {
  // collects all input nodes, stores them in array using spread.
  let currInputs = [...document.querySelectorAll("input")];

  // Iterates over each input and stores id + value into nested arrays
  currInputs = currInputs.map((input) => [input.id, input.value]);
  // takes nested Arrays and creates an object of entries
  const totalsObj = Object.fromEntries(currInputs);

  //buttonSelect.js turns customInput to null when btn is selected which passes this condition
  if (!totalsObj.tipPercentage) {
    if (!tipPercentage) return;
    const tipButton = document.querySelector(".selected");
    totalsObj.tipPercentage = tipButton.value;
  }

  return totalsObj;
};

const calcTotal = () => {
  // deconstructs values off object returned by getVals
  const { billTotal, tipPercentage, numOfPeople } = getVals();
  if (!billTotal || billTotal === 0) return;
  if (!tipPercentage) {
    total.innerHTML = (billTotal / numOfPeople).toFixed(2);
    tipAmount.innerHTML = "";
  } else {
    tipAmount.innerHTML = (tipPercentage / numOfPeople).toFixed(2);

    total.innerHTML = (
      Number(tipAmount.innerHTML) +
      Number(billTotal) / numOfPeople
    ).toFixed(2);
  }
};

billInput.addEventListener(
  "keyup",
  debounce((e) => {
    calcTotal();
  })
);

percInput.addEventListener(
  "keyup",
  debounce((e) => {
    calcTotal();
  })
);

personInput.addEventListener(
  "keyup",
  debounce((e) => {
    calcTotal();
  })
);

buttons.forEach((btn) => {
  btn.addEventListener(
    "click",
    debounce((e) => {
      calcTotal();
    })
  );
});
