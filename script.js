// Global Variables
const numberButtons = document.querySelectorAll(`[data-number]`)
const operatorButtons = document.querySelectorAll(`[data-operator]`)
const equalsButton = document.querySelector(`[data-equals]`)
const allClearButton = document.querySelector(`[data-allClear]`)
const currentOperandTextElement = document.querySelector(`[data-currentOperand]`)
const previousOperandTextElement = document.querySelector(`[data-previousOperand]`)

// Calculator Class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    }

clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operator = undefined
}

delete() {

}

appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operator) {
    
}

compute() {

}

updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
}


}

// Call a New Calculator

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})