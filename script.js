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
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
        this.compute()
    }
    this.operator = operator
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute() {
    let computation
    let previous = parseFloat(this.previousOperand)
    let current = parseFloat(this.currentOperand)
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operator) {
        case '+':
            computation = previous + current
            break
        case '-':
            computation = previous - current
            break
        case 'x':
            computation = previous * current
            break
        case '÷':
            computation = previous / current
            break
        default :
            return
    }
    this.currentOperand = computation
    this.operator = undefined
    this.previousOperand = ''
}

updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
}


}

// Call a New Calculator

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Button Calls
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})