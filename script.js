"use strict";
// SELECTORS

const helpButton = document.querySelector("#helpButton");
const helpText = document.querySelector("#helpText");
const helpWindow = document.querySelector("#helpWindow");
const helpModal = document.querySelector("#helpModal");

const loginMenu = document.querySelector("#login");
const loginUsername = document.querySelector("#usernameField");
const loginPassword = document.querySelector("#PassField");
const loginButton = document.querySelector("#loginButton");
const invalidLogin = document.querySelector("#invalidLogin");

const navBar = document.querySelector("#sidebar");
const navHome = document.querySelector("#navButtonHome");
const navSend = document.querySelector("#navButtonSend");
const navLoan = document.querySelector("#navButtonLoan");
const navLogout = document.querySelector("#logout");

const dashboard = document.querySelector("#dashboard");
const welcomeName = document.querySelector("#displayName");

const cardHolder = document.querySelector("#cardHolder");

const currentCard = document.querySelector("#currentAcc");
const currentCardNumber = document.querySelector("#currentCardNum");
const currentName = document.querySelector("#currentAccName");
const currentExpiry = document.querySelector("#currentAccExpiry");

const businessCard = document.querySelector("#businessAcc");
const businessCardNumber = document.querySelector("#businessCardNum");
const businessName = document.querySelector("#businessAccName");
const businessExpiry = document.querySelector("#businessAccExpiry");

const selectedAcc = document.querySelector("#selectedAccount");
const selectedAccName = document.querySelector("#summaryAccName");
const selectedAccNum = document.querySelector("#summaryAccNum");
const selectedAccSort = document.querySelector("#summaryAccSort");

const showPIN = document.querySelector("#showPin");
const showCVV = document.querySelector("#showCVV");

const balance = document.querySelector("#totalBalance");
const income = document.querySelector("#inValue");
const outgoing = document.querySelector("#outValue");

const transactions = document.querySelector("#transactionList");
const filterAll = document.querySelector("#filterAll");
const filterDeposits = document.querySelector("#filterDeposits");
const filterWithdrawals = document.querySelector("#filterWithdrawals");

const loanWindow = document.querySelector("#loanWindow");
const loanBalance = document.querySelector("#loanCurrentBalance");
const loanAvailable = document.querySelector("#loanValueAvailable");
const loanRequestPounds = document.querySelector("#requestLoanPounds");
const loanRequestPennies = document.querySelector("#requestLoanPennies");
const loanRepayMonth = document.querySelector("#loanRepayMonth");
const loanRepayTotal = document.querySelector("#loanRepayTotal");
const loanConfirmPIN = document.querySelector("#loanPIN");
const loanConfirmButton = document.querySelector("#loanConfirm");
const loanInvalidModal = document.querySelector("#loanInvalid");
const loanInvalidText = document.querySelector("#loanInvalidText");

const sendWindow = document.querySelector("#sendWindow");
const sendRecipient = document.querySelector("#recipientID");
const sendPounds = document.querySelector("#sendPounds");
const sendPennies = document.querySelector("#sendPennies");
const sendPIN = document.querySelector("#sendPIN");
const sendButton = document.querySelector("#transferConfirm");

const sendInvalidModal = document.querySelector("#sendInvalid");
const sendInvalidText = document.querySelector("#sendInvalidText");

const timer = document.querySelector("#timer");

// ACCOUNTS

const mobiusBank = {
  fName: "Mobius",
  lName: "Bank",
  current: {
    cardNumber: "",
    expiry: "",
    accNumber: "0001",
    sortcode: "",
    pin: "",
    cvv: "",

    transactionValues: [],
    transactionDates: [],
    transactionAccNumber: [],
  },
  business: {
    businessName: "LOAN: MOBIUS",
    accNumber: "0000",
    transactionValues: [999999999],
    transactionDates: [new Date(0, 0, 0)],
    transactionAccNumber: ["0000"],
  },
};

const acc1 = {
  fName: "Tom",
  lName: "Jones",
  password: "notUnusual",
  current: {
    cardNumber: "7253 3475 8493 9356",
    expiry: "07/25",
    accNumber: "123456789",
    sortcode: "01-01-44",
    pin: "1234",
    cvv: "101",

    transactionValues: [],
    transactionDates: [],
    transactionAccNumber: [],
  },

  business: {
    cardNumber: "9253 3475 8493 9356",
    expiry: "07/28",
    accNumber: "123123123",
    sortcode: "01-02-45",
    pin: "2345",
    cvv: "007",

    businessName: "New-Code.inc",
    transactionValues: [],
    transactionDates: [],
    transactionAccNumber: [],
  },
};

const acc2 = {
  fName: "James",
  lName: "Bond",
  password: "double07",
  current: {
    cardNumber: "7253 3475 8493 9356",
    expiry: "07/25",
    accNumber: "007007007",
    sortcode: "02-01-44",
    pin: "9876",
    cvv: "456",

    transactionValues: [],
    transactionDates: [],
    transactionAccNumber: [],
  },

  business: {
    cardNumber: "9253 3475 8493 9356",
    expiry: "00/70",
    accNumber: "001002003",
    sortcode: "02-02-45",
    pin: "9999",
    cvv: "654",

    businessName: "SECRET-AGENT.GOV",
    transactionValues: [],
    transactionDates: [],
    transactionAccNumber: [],
  },
};

const acc3 = {
  fName: "Ronald",
  lName: "MacDonald",
  password: "mcdonald1",
  current: {
    cardNumber: "7253 3475 8493 9356",
    expiry: "07/25",
    accNumber: "987654321",
    sortcode: "03-01-44",
    pin: "3456",
    cvv: "007",

    transactionValues: [],
    transactionDates: [],
    transactionAccNumber: [],
  },

  business: {
    cardNumber: "9253 3475 8493 9356",
    expiry: "00/70",
    accNumber: "987987987",
    sortcode: "03-02-45",
    pin: "4567",
    cvv: "007",

    businessName: `McDonald's`,
    transactionValues: [],
    transactionDates: [],
    transactionAccNumber: [],
  },
};

// GLOBAL VARIABLES

const accounts = [mobiusBank, acc1, acc2, acc3];
const transitionTime = 500;
const transactionValues = [];
let activeAccount;
let activeCard;
let pin;
let cvv;
let balanceNum;
let incomeNum;
let outgoingNum;
let loanAvailableNum;
let loanMonthlyNum;
let loanTotalNum;
let timerInterval;
let filterTransactions = "all";

// TRANSITIONS
const reveal = function (el) {
  el.classList.remove("noDisplay");
  setTimeout(() => el.classList.remove("hidden"), transitionTime);
};
const hide = function (el) {
  el.classList.add("hidden");
  setTimeout(() => el.classList.add("noDisplay"), transitionTime);
};

// FUNCTIONS

const createUsernames = function () {
  for (const acc of accounts) {
    acc.username = acc.fName.slice(0, 1).concat(acc.lName).toLowerCase();
  }
};

const addCurSym = function (num) {
  if (num >= 0) {
    return `£${num.toFixed(2)}`;
  } else if (num < 0) {
    return `-£${Math.abs(num).toFixed(2)}`;
  }
};

const findAccountFromNumber = function (accNumber) {
  for (const acc of accounts) {
    if (
      accNumber === acc.current.accNumber ||
      accNumber === acc.business.accNumber
    ) {
      return acc;
    }
  }
};

const findCardFromNumber = function (accNumber) {
  for (const acc of accounts) {
    if (accNumber === acc.current.accNumber) {
      return acc.current;
    } else if (accNumber === acc.business.accNumber) {
      return acc.business;
    }
  }
};

const getStringAccountName = function (acc, number) {
  if (number === acc.current.accNumber) {
    return `${acc.fName} ${acc.lName}`;
  } else if (number === acc.business.accNumber) {
    return `${acc.business.businessName}`;
  }
};

const clearForms = function () {
  loginUsername.value = "";
  loginPassword.value = "";

  loanRequestPennies.value = "";
  loanRequestPounds.value = "";
  loanConfirmPIN.value = "";

  sendPounds.value = "";
  sendPennies.value = "";
  sendRecipient.value = "";
  sendPIN.value = "";

  hide(sendInvalidModal);
  hide(loanInvalidModal);
};

const navClear = function () {
  navHome.classList.remove("navEl-active");
  navLoan.classList.remove("navEl-active");
  navSend.classList.remove("navEl-active");
  navLogout.classList.remove("navEl-active");
};

const currentCardData = () =>
  activeCard === currentCard ? activeAccount.current : activeAccount.business;

const displayTransaction = function () {
  const card = currentCardData();

  transactions.innerHTML = "";

  for (const [i, transaction] of card.transactionValues.entries()) {
    const pos = Math.abs(i % 2) == 0 ? "posEven" : "posOdd";

    if (filterTransactions === "deposits" && card.transactionValues[i] > 0)
      continue;
    if (filterTransactions === "withdrawals" && card.transactionValues[i] < 0)
      continue;

    const date = new Date(card.transactionDates[i]);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const dateString = date.toLocaleDateString("en-GB", options);

    const transAccNum = card.transactionAccNumber[i];

    const transAcc = findAccountFromNumber(transAccNum);

    const transAccString =
      transAcc && getStringAccountName(transAcc, transAccNum);

    const inOrOut = card.transactionValues[i] >= 0 ? "deposit" : "withdrawal";

    const figure = addCurSym(card.transactionValues[i]);

    transactions.insertAdjacentHTML(
      "afterbegin",

      `<tr class="${pos}">
      <td class="table-date">${dateString}</td>
      <td class="table-account">${transAccString}</td>
      <td class="table-amount ${inOrOut}">${figure}</td>
    </tr>`
    );
  }
};

const displayBalances = function () {
  const card = currentCardData();
  // Set Numbers
  balanceNum = card.transactionValues.reduce((acc, curVal) => acc + curVal);

  incomeNum = card.transactionValues
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val);

  outgoingNum = card.transactionValues
    .filter((val) => val <= 0)
    .reduce((acc, val) => acc + val);

  loanAvailableNum = balanceNum > 0 ? balanceNum * 5 : 0;

  // TEXT CONTENT
  balance.textContent = addCurSym(balanceNum);

  income.textContent = addCurSym(incomeNum);
  outgoing.textContent = addCurSym(outgoingNum);

  loanBalance.textContent = addCurSym(balanceNum);

  loanAvailable.textContent = addCurSym(loanAvailableNum);
};

const setFilter = function (stringFilter) {
  filterTransactions = stringFilter;

  let filterSet;
  let filterUnset1;
  let filterUnset2;

  if (stringFilter === "all") {
    filterSet = filterAll;
    filterUnset1 = filterDeposits;
    filterUnset2 = filterWithdrawals;
  } else if (stringFilter === "deposits") {
    filterSet = filterDeposits;
    filterUnset1 = filterAll;
    filterUnset2 = filterWithdrawals;
  } else if (stringFilter === "withdrawals") {
    filterSet = filterWithdrawals;
    filterUnset1 = filterDeposits;
    filterUnset2 = filterAll;
  }

  filterSet.classList.add("filterActive");
  filterUnset1.classList.remove("filterActive");
  filterUnset2.classList.remove("filterActive");

  filterSet.classList.remove("filterInactive");
  filterUnset1.classList.add("filterInactive");
  filterUnset2.classList.add("filterInactive");
};

const updateDashboard = function () {
  displayName.textContent = activeAccount.fName
    .concat(` ${activeAccount.lName}`)
    .toUpperCase();

  currentCardNumber.textContent = activeAccount.current.cardNumber;
  currentName.textContent = activeAccount.fName
    .slice(0, 1)
    .concat(` ${activeAccount.lName}`);
  currentExpiry.textContent = activeAccount.current.expiry;

  businessCardNumber.textContent = activeAccount.business.cardNumber;
  businessName.textContent = activeAccount.business.businessName;
  businessExpiry.textContent = activeAccount.business.expiry;

  //ACTIVE ACCOUNT SETTINGS

  const card = currentCardData();

  selectedAccNum.textContent = card.accNumber;
  selectedAccSort.textContent = card.sortcode;
  pin = card.pin;
  cvv = card.cvv;

  if (activeCard === currentCard) {
    selectedAcc.textContent = "CURRENT ACCOUNT";

    selectedAccName.textContent = activeAccount.fName
      .concat(` ${activeAccount.lName}`)
      .toUpperCase();
  } else if (activeCard === businessCard) {
    selectedAcc.textContent = "BUSINESS ACCOUNT";

    selectedAccName.textContent = activeAccount.business.businessName;
  }

  displayBalances();
  displayTransaction();
  clearForms();
};

const resetTimer = function () {
  clearInterval(timerInterval);
  timerInterval = startTimer();
};

const startTimer = function () {
  const count = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    timer.textContent = `${min}:${seconds}`;
    if (time === 0) {
      clearInterval(timerInterval);
      logout();
    }
    time--;
  };
  let time = 120;

  count();
  const timerInterval = setInterval(count, 1000);
  return timerInterval;
};

const login = function () {
  reveal(navBar);
  reveal(dashboard);
  navClear();
  navHome.classList.add("navEl-active");
  activeCard = currentCard;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = startTimer();

  updateDashboard();
};

const logout = function () {
  changeCard(currentCard);
  activeAccount = 0;
  clearForms();
  hide(dashboard);
  hide(loanWindow);
  hide(sendWindow);
  hide(navBar);
  reveal(loginMenu);
};

const changeCard = function (cardClicked) {
  if (activeCard != cardClicked) {
    activeCard.classList.add("card-inactive");
    activeCard = cardClicked;
    activeCard.classList.remove("card-inactive");
    setFilter("all");
  } else {
  }

  updateDashboard();
};

const createTransaction = function (senderNum, recieverNum, value, date) {
  const senderCard = findCardFromNumber(senderNum);
  const recipientCard = findCardFromNumber(recieverNum);

  senderCard.transactionValues.push(Math.abs(value) * -1);
  senderCard.transactionDates.push(date);
  senderCard.transactionAccNumber.push(recieverNum);

  recipientCard.transactionValues.push(Math.abs(value));
  recipientCard.transactionDates.push(date);
  recipientCard.transactionAccNumber.push(senderNum);
};

const approveTransaction = function (senderNum, recieverNum, value, date) {};

const loanApply = function () {};

// INITIALISE
createUsernames();
reveal(loginMenu);
generateHistorical();

// GENERATING HISTORICAL MOVEMENTS
function generateHistorical() {
  for (const acc of accounts) {
    createTransaction(
      "0000",
      acc.current.accNumber,
      20,
      new Date(2021, 8, 1, 10, 35)
    );
    createTransaction(
      "0000",
      acc.business.accNumber,
      3500,
      new Date(2021, 8, 1, 10, 50)
    );
    createTransaction(
      acc.current.accNumber,
      "0000",
      -0.01,
      new Date(2021, 8, 1, 10, 36)
    );
    createTransaction(
      acc.business.accNumber,
      "0000",
      -0.01,
      new Date(2021, 8, 1, 10, 51)
    );
  }

  createTransaction("123456789", "987654321", 25, new Date(2021, 8, 3, 12, 36));
  createTransaction(
    "123123123",
    "007007007",
    100,
    new Date(2021, 8, 3, 15, 24)
  );
  createTransaction(
    "001002003",
    "123456789",
    37.5,
    new Date(2021, 8, 3, 15, 54)
  );

  createTransaction("987654321", "123123123", 365, new Date(2021, 8, 4, 9, 10));
  createTransaction(
    "007007007",
    "987987987",
    10.3,
    new Date(2021, 8, 4, 10, 23)
  );
  createTransaction(
    "987987987",
    "001002003",
    23.6,
    new Date(2021, 8, 4, 11, 56)
  );
  createTransaction(
    "123456789",
    "007007007",
    110,
    new Date(2021, 8, 4, 15, 32)
  );
  createTransaction("123123123", "987654321", 365, new Date(2021, 8, 4, 17, 0));

  createTransaction("001002003", "123456789", 125, new Date(2021, 8, 5, 9, 0));
  createTransaction(
    "001002003",
    "987654321",
    110,
    new Date(2021, 8, 5, 10, 47)
  );
  createTransaction(
    "001002003",
    "007007007",
    200,
    new Date(2021, 8, 5, 12, 30)
  );
  createTransaction(
    "123456789",
    "123123123",
    3.72,
    new Date(2021, 8, 5, 12, 49)
  );
  createTransaction("123456789", "987987987", 25, new Date(2021, 8, 5, 14, 36));

  createTransaction(
    "123123123",
    "987987987",
    2000,
    new Date(2021, 8, 6, 10, 42)
  );
  createTransaction(
    "001002003",
    "123123123",
    1204,
    new Date(2021, 8, 6, 11, 30)
  );
  createTransaction(
    "001002003",
    "987654321",
    1300,
    new Date(2021, 8, 6, 12, 12)
  );
  createTransaction(
    "987987987",
    "123456789",
    956,
    new Date(2021, 8, 6, 13, 55)
  );
}
// LOGIN SCREEN

loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  for (const acc of accounts) {
    if (
      loginUsername.value === acc.username &&
      loginPassword.value === acc.password
    ) {
      hide(loginMenu);
      activeAccount = acc;

      setTimeout(() => login(activeAccount), 1000);
      hide(invalidLogin);
    } else {
      reveal(invalidLogin);
    }
  }
});
//

showPIN.addEventListener("click", function () {
  setTimeout(() => (showPIN.innerHTML = pin), 300);

  showPIN.classList.add("reveal");

  setTimeout(() => {
    showPIN.classList.remove("reveal");
    showPIN.innerHTML = `SHOW PIN`;
  }, 4000);
});

showCVV.addEventListener("click", function () {
  setTimeout(() => (showCVV.innerHTML = cvv), 300);

  showCVV.classList.add("reveal");

  setTimeout(() => {
    showCVV.classList.remove("reveal");
    showCVV.innerHTML = `SHOW CVV`;
  }, 4000);
});

businessCard.addEventListener("click", () => {
  changeCard(businessCard);
});
currentCard.addEventListener("click", () => {
  changeCard(currentCard);
});

navHome.addEventListener("click", function () {
  navClear();
  navHome.classList.add("navEl-active");
  hide(sendWindow);
  hide(loanWindow);
});

navSend.addEventListener("click", function () {
  navClear();
  navSend.classList.add("navEl-active");
  hide(loanWindow);
  reveal(sendWindow);
});

sendWindow.addEventListener("click", function (event) {
  if (
    event.target.matches(".popUpWindow") &&
    !sendWindow.classList.contains("hidden")
  ) {
    hide(sendWindow);
    navClear();
    navHome.classList.add("navEl-active");
  }
});

sendButton.addEventListener("click", function (e) {
  e.preventDefault();
  const card = currentCardData();
  let isCard;

  const value = Number(sendPounds.value) + Number(sendPennies.value) / 100;

  const recipientCard = findCardFromNumber(sendRecipient.value);

  if (!recipientCard) {
    isCard = false;
  } else {
    isCard = true;
  }

  if (isCard && balanceNum >= value && value > 1) {
    if (sendPIN.value === card.pin) {
      createTransaction(
        card.accNumber,
        recipientCard.accNumber,
        value,
        new Date()
      );
      hide(sendWindow);
      updateDashboard(activeAccount);
    } else if (sendPIN.value !== card.pin) {
      sendInvalidText.textContent = "INVALID PIN";
      reveal(sendInvalidModal);
    }
  } else if (balanceNum <= value) {
    sendInvalidText.textContent = "NOT ENOUGH FUNDS";
    reveal(sendInvalidModal);
  } else if (value < 1) {
    sendInvalidText.textContent = "MINIMUM SEND: £1";
    reveal(sendInvalidModal);
  } else if (!isCard) {
    sendInvalidText.textContent = "ACCOUNT NOT FOUND";
    reveal(sendInvalidModal);
  }
});

navLoan.addEventListener("click", function () {
  navClear();
  navLoan.classList.add("navEl-active");
  hide(sendWindow);
  reveal(loanWindow);

  setInterval(function () {
    if (loanRequestPounds != "" || loanRequestPennies != "") {
      let totalNum =
        Number(loanRequestPounds.value) +
        Number(loanRequestPennies.value) / 100;

      loanMonthlyNum =
        totalNum > 1 ? Math.round((totalNum * 100) / 12) / 100 : 0;

      loanTotalNum = totalNum;
      loanRepayTotal.textContent = addCurSym(loanTotalNum);
      loanRepayMonth.textContent = addCurSym(loanMonthlyNum);
    }
  }, 1000);
});

loanWindow.addEventListener("click", function (event) {
  if (
    event.target.matches(".popUpWindow") &&
    !loanWindow.classList.contains("hidden")
  ) {
    hide(loanWindow);
    navClear();
    navHome.classList.add("navEl-active");
  }
});

loanConfirmButton.addEventListener("click", function (e) {
  e.preventDefault();

  const card = currentCardData();
  if (loanTotalNum > 1 && loanTotalNum <= loanAvailableNum) {
    if (loanConfirmPIN.value === card.pin) {
      createTransaction("0000", card.accNumber, loanTotalNum, new Date());

      hide(loanWindow);
      updateDashboard(activeAccount);
    } else if (loanConfirmPIN.value !== card.pin) {
      loanInvalidText.textContent = "INCORRECT PIN";
      reveal(loanInvalidModal);
    }
  } else if (loanTotalNum <= 1) {
    loanInvalidText.textContent = "LOAN MINIMUM: £1";
    reveal(loanInvalidModal);
  } else if (loanTotalNum > loanAvailableNum) {
    loanInvalidText.textContent = "LOAN REQUEST EXCEEDS AVAILABLE";
    reveal(loanInvalidModal);
  }
});

navLogout.addEventListener("click", function () {
  logout();
  navClear();
});

document.addEventListener("click", resetTimer);

cardHolder.addEventListener("scroll", function () {
  if (cardHolder.scrollLeft > 0 && cardHolder.scrollLeft < 500) {
    if (activeCard != currentCard) {
      changeCard(currentCard);
    }
  }
  if (cardHolder.scrollLeft > 500 && cardHolder.scrollLeft < 1000) {
    if (activeCard != businessCard) {
      changeCard(businessCard);
    }
  }
});

helpButton.addEventListener("click", function () {
  if (helpWindow.classList.contains("noDisplay")) {
    reveal(helpWindow);
    helpText.textContent = "X";
  } else {
    hide(helpWindow);
    helpText.textContent = "?";
  }
});

helpWindow.addEventListener("click", function (event) {
  if (
    event.target.matches(".fade") &&
    !event.target.matches(".modal") &&
    !helpWindow.classList.contains("hidden")
  ) {
    hide(helpWindow);
    helpText.textContent = "?";
  }
});

filterAll.addEventListener("click", function () {
  setFilter("all");
  updateDashboard(activeAccount);
});

filterDeposits.addEventListener("click", function () {
  setFilter("deposits");
  updateDashboard(activeAccount);
});

filterWithdrawals.addEventListener("click", function () {
  setFilter("withdrawals");
  updateDashboard(activeAccount);
});
