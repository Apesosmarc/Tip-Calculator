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

// // Reads current values stored in dom and passes them as totalObj
// const getVals = () => {
//   // collects all input nodes, stores them in array using spread.
//   let currInputs = [...document.querySelectorAll("input")];

//   // Iterates over each input and stores id + value into nested arrays
//   currInputs = currInputs.map((input) => [input.id, input.value]);
//   // takes nested Arrays and creates an object of entries
//   const totalsObj = Object.fromEntries(currInputs);

//   //buttonSelect.js turns customInput to null when btn is selected which passes this condition
//   if (!totalsObj.tipPercentage) {
//     const tipButton = document.querySelector(".selected");
//     if (!tipButton) totalsObj.tipPercentage = "";
//     else {
//       totalsObj.tipPercentage = tipButton.value;
//     }
//   }
//   return totalsObj;
// };

const calc = {
  bill: null,
  tip: null,
  people: 1,
  toNum() {
    for (const prop in this) {
      if (typeof this[prop] === "string") this[prop] = Number(this[prop]);
    }
  },
};

const calcTotal = () => {
  // deconstructs values off object returned by getVals
  calc.toNum();

  const { bill, tip, people } = calc;

  if (!bill || bill === 0) return;
  if (!tip) {
    total.innerHTML = (bill / people).toFixed(2);
    return (tipAmount.innerHTML = "");
  } else {
    const tipDec = tip / 100;
    const tipNumber = (tipDec * bill) / people;
    const totalNumber = (tipNumber + bill / people).toFixed(2);

    tipAmount.innerHTML = tipNumber;
    total.innerHTML = totalNumber;
  }
};

billInput.addEventListener(
  "keyup",
  debounce((e) => {
    calc.bill = billInput.value;
    calcTotal();
  })
);

percInput.addEventListener(
  "keyup",
  debounce((e) => {
    calc.tip = percInput.value;
    calcTotal();
  })
);

personInput.addEventListener(
  "keyup",
  debounce((e) => {
    calc.people = numOfPeople.value;
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
