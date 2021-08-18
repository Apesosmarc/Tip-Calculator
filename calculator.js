// Num Output Selectors
const total = document.querySelector("#totalPerPerson");
const tipAmount = document.querySelector("#tipAmount");

// Sets global debounce time in ms
const inputDebounceTime = 1000;

// Dollar Conversion Func
const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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

    tipAmount.innerHTML = dollarUS.format(tipNumber);
    total.innerHTML = dollarsUS.format(totalNumber);
  }
};

const inputArr = [billInput, percInput, peopleInput];
const numsOnlyRegex = /^\d*\.?\d*$/;

inputArr.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (!numsOnlyRegex.test(e.key)) {
      input.value = "";
    }
  });
});

inputArr.forEach((input) => {
  input.addEventListener(
    "input",
    debounce((e) => {
      if (numsOnlyRegex.test(input.value)) {
        if (validateNum(input)) {
          calc[input.id] = input.value;
          calcTotal();
        }
      } else input.value = "";
    })
  );
});

buttons.forEach((btn) => {
  btn.addEventListener(
    "click",
    debounce((e) => {
      calc.tip = btn.value;
      calcTotal();
    })
  );
});
