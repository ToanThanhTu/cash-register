// Get references to DOM elements
const changeDue = document.getElementById("change-due");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.querySelector(".price-screen");
const cashInDrawer = document.getElementById("register-cash");

// Set the price of the item
let price = 3.26;

// Cash in Drawer (cid) array representing the cash available in the register
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

// Currency unit values (denominations)
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

// Status messages
const statuses = {
  "insufficient": "Status: INSUFFICIENT_FUNDS",
  "closed": "Status: CLOSED",
  "open": "Status: OPEN"
}

// Function to get the display name for each currency unit
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

// Function to update the display of cash in the register
const updateCashInDrawer = () => {
  cashInDrawer.innerHTML = ""; // reset the display before updating

  cashInDrawer.innerHTML += `<p><strong>Change in drawer:</strong></p>`;
  cid.forEach((row) => {
    cashInDrawer.innerHTML += `<p>${getCIDName(row[0])}: $${row[1]}</p>`;
  });
}

// Function to reset the input and update the initial display
const reset = () => {
  cashInput.value = "";
  priceScreen.textContent = `$${price}`;

  updateCashInDrawer();
}

// Initial reset call to setup the UI
reset();

// Function to update the change due display
const updateChangeDue = (array, status) => {
  changeDue.innerHTML = ""; // reset the change due display before adding new content
  changeDue.innerHTML += status;

  if (status === statuses["open"] || status === statuses["closed"]) {
    array.forEach((row) => {
      changeDue.innerHTML += `<p>${row[0]}: $${row[1]}</p>`;
    });
  }

  updateCashInDrawer();
}

// Function to calculate and get the change to be returned to the customer
const getChange = () => {
  // Calculate the total cash available in the drawer
  let totalCashInDrawer = Number(cid.reduce((acc, row) => acc + row[1], 0).toFixed(2));

  // Initialize variables for status, total change, changes array and change needed
  let statusText = "";
  let totalChange = 0;
  let changes = [];
  let changeNeeded = Number((cashInput.value - price).toFixed(2));

  // Check if there's insufficient cash in the drawer
  if (totalCashInDrawer < changeNeeded) {
    statusText = statuses["insufficient"];
  } else {
    // Iterate over the cash in drawer from highest to lowest denomination
    for (let i = cid.length - 1; i >= 0; i--) {
      const currentUnitValue = Number(currencyUnits[cid[i][0]].toFixed(2));
      let currentUnitTotalChange = 0;

      // While there's still change needed and the current denomination is available in the drawer
      while (changeNeeded >= currentUnitValue && cid[i][1] >= currentUnitValue) {
        // Add the current denomination to the total change 
        totalChange = Number((totalChange + currentUnitValue).toFixed(2));

        // Subtract the current denomination from the change needed
        changeNeeded = Number((changeNeeded - currentUnitValue).toFixed(2));

        // Subtract the current denomination from the cash in the drawer
        cid[i][1] = Number((cid[i][1] - currentUnitValue).toFixed(2));

        // Add the current denomination to the total change for this unit
        currentUnitTotalChange = Number((currentUnitTotalChange + currentUnitValue).toFixed(2));
      }

      // If any change was made with the current denomination, add it to the changes array
      if (currentUnitTotalChange) {
        const currentChange = [cid[i][0], currentUnitTotalChange];
        changes.push(currentChange);
        console.log("changes pushed: ", changes);
      }
    }
  }

  // Recalculate the total cash in the drawer after making change
  totalCashInDrawer = cid.reduce((acc, row) => acc + row[1], 0).toFixed(2);

  // Determine the final status based on the remaining cash and change needed
  if (changeNeeded > 0) {
    statusText = statuses["insufficient"];
  } else if (totalCashInDrawer < price) {
    statusText = statuses["closed"];
  } else {
    statusText = statuses["open"];
  }

  // Update the change due display with the calculated changes and status
  updateChangeDue(changes, statusText);
}

// Function to process the input and calculate the change
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