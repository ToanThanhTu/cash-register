const changeDue = document.getElementById("change-due");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.querySelector(".price-screen");
const cashInDrawer = document.getElementById("register-cash");

let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100,
}

const statuses = {
  "insufficient": "Status: INSUFFICIENT_FUNDS",
  "closed": "Status: CLOSED",
  "open": "Status: OPEN"
}

const getCIDName = (name) => {
  switch (name) {
    case "PENNY":
      return "Pennies";
    case "NICKEL":
      return "Nickels";
    case "DIME":
      return "Dimes";
    case "QUARTER":
      return "Quarters";
    case "ONE":
      return "Ones";
    case "FIVE":
      return "Fives";
    case "TEN":
      return "Tens";
    case "TWENTY":
      return "Twenties";
    case "ONE HUNDRED":
      return "Hundreds";
    default:
      return "";
  };
}

const updateCashInDrawer = () => {
  cashInDrawer.innerHTML = "";

  cashInDrawer.innerHTML += `<p><strong>Change in drawer:</strong></p>`;
  cid.forEach((row) => {
    cashInDrawer.innerHTML += `<p>${getCIDName(row[0])}: $${row[1]}</p>`;
  });
}

const reset = () => {
  cashInput.value = "";
  priceScreen.textContent = `$${price}`;

  updateCashInDrawer();
}

reset();

const updateChangeDue = (array, status) => {
  changeDue.innerHTML = "";
  changeDue.innerHTML += status;

  if (status === statuses["open"] || status === statuses["closed"]) {
    array.forEach((row) => {
      changeDue.innerHTML += `<p>${row[0]}: $${row[1]}</p>`;
    });
  }

  updateCashInDrawer();
}

const getChange = () => {
  let totalCashInDrawer = Number(cid.reduce((acc, row) => acc + row[1], 0).toFixed(2));

  let statusText = "";
  let totalChange = 0;
  let changes = [];
  let changeNeeded = Number((cashInput.value - price).toFixed(2));

  if (totalCashInDrawer < changeNeeded) {
    statusText = statuses["insufficient"];
  } else {
    for (let i = cid.length - 1; i >= 0; i--) {
      const currentUnitValue = Number(currencyUnits[cid[i][0]].toFixed(2));
      let currentUnitTotalChange = 0;

      while (changeNeeded >= currentUnitValue && cid[i][1] >= currentUnitValue) {
        totalChange = Number((totalChange + currentUnitValue).toFixed(2));
        changeNeeded = Number((changeNeeded - currentUnitValue).toFixed(2));
        cid[i][1] = Number((cid[i][1] - currentUnitValue).toFixed(2));
        currentUnitTotalChange = Number((currentUnitTotalChange + currentUnitValue).toFixed(2));
      }

      if (currentUnitTotalChange) {
        const currentChange = [cid[i][0], currentUnitTotalChange];
        changes.push(currentChange);
        console.log("changes pushed: ", changes);
      }
    }
  }

  totalCashInDrawer = cid.reduce((acc, row) => acc + row[1], 0).toFixed(2);

  if (changeNeeded > 0) {
    statusText = statuses["insufficient"];
  } else if (totalCashInDrawer < price) {
    statusText = statuses["closed"];
  } else {
    statusText = statuses["open"];
  }

  updateChangeDue(changes, statusText);
}

const processInput = () => {
  if (Number(cashInput.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (Number(cashInput.value) === price) {
    updateChangeDue([], "No change due - customer paid with exact cash");
    return;
  }

  getChange();
}

purchaseBtn.addEventListener("click", processInput);