// Global Variables
const numberButtons = document.querySelectorAll(`[data-number]`)
const operatorButtons = document.querySelectorAll(`[data-operator]`)
const equalsButton = document.querySelector(`[data-equals]`)
const allClearButton = document.querySelector(`[data-allClear]`)
const deleteButton = document.querySelector(`[data-delete]`)
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
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number) {
    if (this.justComputed) {
        this.currentOperand = '';
        this.justComputed = false;
    }
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
    this.currentOperand = Math.round(computation * 100000) / 100000;
    this.operator = undefined
    this.previousOperand = ''
    this.justComputed = true
}

updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    if (this.operator != null) {
        this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operator}`
    } else {
        this.previousOperandTextElement.innerText = ''
    }
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

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})