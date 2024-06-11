let price = 3.99;
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

const currencyUnits = [
  {
    name: "PENNY", value: 0.01
  },
  {
    name: "NICKEL", value: 0.05
  },
  {
    name: "DIME", value: 0.1
  },
  {
    name: "QUARTER", value: 0.25
  },
  {
    name: "ONE", value: 1
  },
  {
    name: "FIVE", value: 5
  },
  {
    name: "TEN", value: 10
  },
  {
    name: "TWENTY", value: 20
  },
  {
    name: "ONE HUNDRED", value: 100
  },
]

const changeDue = document.getElementById("change-due");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.querySelector(".price-screen");
const cashInDrawer = document.getElementById("register-cash");

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

const reset = () => {
  cashInput.value = "";
  priceScreen.textContent = `$${price}`;

  cid.forEach((row) => {
    cashInDrawer.innerHTML += `<p>${getCIDName(row[0])}: $${row[1]}</p>`;
  });
}

reset();

const updateChangeDue = () => {

}

const getChange = () => {
  let totalCashInDrawer = cid.reduce((acc, row) => acc + row[1]);
  console.log("total:", totalCashInDrawer);

  cid.forEach((row) => {
    if (row[1]) {}
  });
}

const processInput = () => {
  if (cashInput.value < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cashInput.value === price) {
    alert("No change due - customer paid with exact cash");
    return;
  }
}