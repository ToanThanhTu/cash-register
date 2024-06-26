# Cash Register Application

## Overview

The Cash Register Application is a simple web-based tool designed to simulate the functionality of a cash register. It allows users to input the amount of cash provided by a customer and calculates the change due based on a fixed item price. The application also updates the cash available in the register after each transaction.

## Features

- **Item Price Display:** Shows the fixed price of the item.
- **Cash Input:** Allows the user to input the amount of cash provided by the customer.
- **Change Calculation:** Calculates the change due and updates the cash available in the register.
- **Status Display:** Displays the status of the transaction (INSUFFICIENT_FUNDS, CLOSED, OPEN).

## Technologies Used

- HTML
- CSS
- JavaScript

## Setup and Installation

1. Clone the Repository.
1. Navigate to the Project Directory: `cd cash-register-app`
1. Open the `index.html` File in Your Browser.

## Usage

1. **Open the Application:**  
Open the `index.html` file in your browser.

1. **View Item Price:**  
The item price is displayed on the screen.

1. **Enter Cash Amount:**  
Input the amount of cash provided by the customer in the input field and click the `Purchase` button.

1. **View Change Due:**  
The application will calculate and display the change due, along with the updated cash available in the register.

1. **Transaction Status:**  
The application will display the status of the transaction:
    - INSUFFICIENT_FUNDS: Not enough cash in the register to give the change.
    - CLOSED: Register is closed if the total cash in the drawer is less than the item price.
    - OPEN: Change has been provided successfully.

## Code Explanation

### HTML

The HTML file sets up the structure of the application, including the header, input fields, and display areas for the change due and cash in the register.

### CSS

The CSS file defines the styles for the application, including the layout, colors, and font styles.

### JavaScript

The JavaScript file contains the logic for the cash register application, including functions to:

- Calculate the change due.
- Update the cash available in the register.
- Display the transaction status.

## Functions

### getChange

The `getChange` function calculates the change due based on the cash provided and the item price. It iterates over the cash available in the register from the highest to the lowest denomination to provide the correct change. It also updates the cash in the register and displays the transaction status.

### processInput

The `processInput` function handles the input from the user, checks if the cash provided is sufficient, and calls the `getChange` function to calculate and display the change due.

### updateCashInDrawer

The `updateCashInDrawer` function updates the display of the cash available in the register after each transaction.

### updateChangeDue

The `updateChangeDue` function updates the display of the change due and the transaction status.

### reset

The `reset` function initializes the application, setting up the initial display and cash available in the register.