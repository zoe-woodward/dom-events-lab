// Selecting necessary elements using document.querySelector

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

//Setting variables and the initial values
let currentInput = '';
let firstOperand = null;
let operator = null;



buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText;

    if (event.target.classList.contains('number')) {
      // Appending the number to the current input
      currentInput += value;
      updateDisplay(currentInput);
    } else if (event.target.classList.contains('operator')) {
      if (value === 'C') {
        // Clear everything
        currentInput = '';
        firstOperand = null;
        operator = null;
        updateDisplay(''); // Clear the display
      } else if (value !== '=') {
        // operators (+, -, *, /)
        if (currentInput) {
          firstOperand = parseFloat(currentInput);
          //parseFloat read about via FreeCode Camp resources. Decimals not currently needed but allows for future potential
          operator = value;
          currentInput = '';
        }
      }
    } else if (event.target.classList.contains('equals')) {
      if (firstOperand !== null && operator && currentInput) {
        const secondOperand = parseFloat(currentInput);
        const result = calculate(firstOperand, secondOperand, operator);
        updateDisplay(result);


        // Resetting for the next calculation
        currentInput = '';
        firstOperand = result;
        operator = null;
      }
    }
  });
});

// Function to perform the calculation with the 'switch' statement using MDN doc resources seems a lot more efficient than doing if statements for each one

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

// Function to update the display with the required value
function updateDisplay(value) {
  display.textContent = value;
}
