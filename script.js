
const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

let firstNumber = null;
let selectedOperator = null;
let waitingForSecondNumber = false;


// Operator symbols
const operatorSymbols = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
};


// =========================
// Number Buttons
// =========================

numberButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const number = button.textContent;

        // After result, start new calculation
        if (waitingForSecondNumber && selectedOperator === null) {
            display.value = number;
            waitingForSecondNumber = false;
            return;
        }

        // Enter second number
        if (waitingForSecondNumber) {
            display.value = number;
            waitingForSecondNumber = false;
            return;
        }

        // Replace 0
        if (display.value === "0" || display.value === "Error") {
            display.value = number;
        } else {
            display.value += number;
        }
    });

});


// =========================
// Decimal Button
// =========================

decimalButton.addEventListener("click", () => {

    if (waitingForSecondNumber) {
        display.value = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if (!display.value.includes(".")) {
        display.value += ".";
    }

});


// =========================
// Operator Buttons
// =========================

operatorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const currentNumber = parseFloat(display.value);

        if (display.value === "Error") {
            return;
        }

        // Save first number
        firstNumber = currentNumber;

        // Save operator
        selectedOperator = button.dataset.operator;

        // Show operator
        display.value =
            firstNumber + " " + operatorSymbols[selectedOperator];

        waitingForSecondNumber = true;
    });

});


// =========================
// Equals Button
// =========================

equalsButton.addEventListener("click", () => {

    if (
        firstNumber === null ||
        selectedOperator === null ||
        waitingForSecondNumber
    ) {
        return;
    }

    const secondNumber = parseFloat(display.value);

    let result;

    switch (selectedOperator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                display.value = "Error";

                firstNumber = null;
                selectedOperator = null;
                waitingForSecondNumber = true;

                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    // Show result
    display.value = result;

    // Reset calculation
    firstNumber = null;
    selectedOperator = null;
    waitingForSecondNumber = false;
});


// =========================
// Clear Button
// =========================

clearButton.addEventListener("click", () => {

    display.value = "0";

    firstNumber = null;
    selectedOperator = null;
    waitingForSecondNumber = false;
});

