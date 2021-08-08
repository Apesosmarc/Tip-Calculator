// Input Selectors
const billInput = document.querySelector("#bill");
const percInput = document.querySelector("#tip");
const personInput = document.querySelector("#people");

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

const calc = {
  bill: null,
  tip: null,
  people: 1,
  toNum() {
    for (const prop in this) {
      if (typeof this[prop] === "string") {
        return (this[prop] = Number(this[prop]));
      }
    }
  },
};

const calcTotal = () => {
  //turns all strings to nums on obj
  calc.toNum();

  const { bill, tip, people } = calc;

  if (!bill || bill === 0) return;
  if (!tip) {
    total.innerHTML = (bill / people).toFixed(2);
  } else {
    const tipDec = tip / 100;
    const tipNumber = +((tipDec * bill) / people).toFixed(2);
    const totalNumber = +(bill / people + tipNumber).toFixed(2);

    tipAmount.innerHTML = tipNumber;
    total.innerHTML = totalNumber;
  }
};

const inputArr = [billInput, percInput, personInput];

inputArr.forEach((input) => {
  input.addEventListener(
    "keyup",
    debounce((e) => {
      calc[input.id] = input.value;
      calcTotal();
    })
  );
});

// billInput.addEventListener(
//   "keyup",
//   debounce((e) => {
//     calc.bill = billInput.value;
//     calcTotal();
//   })
// );

// percInput.addEventListener(
//   "keyup",
//   debounce((e) => {
//     console.log("input on percinput");
//     calc.tip = percInput.value;
//     calcTotal();
//   })
// );

// personInput.addEventListener(
//   "keyup",
//   debounce((e) => {
//     calc.people = numOfPeople.value;
//     calcTotal();
//   })
// );

buttons.forEach((btn) => {
  btn.addEventListener(
    "click",
    debounce((e) => {
      console.log("btn clicked");
      calc.tip = btn.value;
      calcTotal();
    })
  );
});
