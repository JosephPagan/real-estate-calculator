console.log('This script is running')

const repairExpenses = document.getElementsByClassName('expense')
const majorCost = document.getElementsByClassName('majorCost')
const totalRepairCost = document.getElementById('totalRepairCost')
const totalCost = document.getElementById('totalCost')
const purchPrice = document.getElementById('purchasePrice')
const downPayment = document.getElementById('downPayment')
const loanAmt = document.getElementById('loanAmt')
const cashReq = document.getElementById('cashRequired')
const mortgage = document.getElementById('mortgage')
const mortgageTwo = document.getElementById('mortgageTwo')
const mortInsurance = document.getElementById('mortInsurance')

function calcCashReq() {
    cashReq.value = totalCost.value - loanAmt.value
}
function calcMortgage() {
    let interestRate = 6.5
    let numOfPayments = 30
    let monthlyPayment = ((interestRate / 100 / 12) * purchPrice.value) / (1 - ((1 + (interestRate / 100 / 12)) ** (-numOfPayments * 12)))
    mortgage.value = Math.round(monthlyPayment)
    mortgageTwo.value = Math.round(monthlyPayment)
}
function calcInsurance() {
    let amt = Number(loanAmt.value) * 0.01
    mortInsurance.value = amt
}
function calcCosts() {
    let sum = 0;
    for (x = 0; x < majorCost.length; x++) {
        sum+= Number(majorCost[x].value)
    }
    totalCost.value = sum

    calcCashReq()
    calcMortgage()
    calcInsurance()
}
function calcExpenses() {
    let sum = 0;
    for (x = 0; x < repairExpenses.length; x++) {
        sum+= Number(repairExpenses[x].value)
        // console.log(repairExpenses[x].value)
    }
    totalRepairCost.value = sum
    calcCosts()
}
function calcDownPaymentAndLoanAmt() {
    downPayment.value = Math.round(Number(purchPrice.value) * 0.035)
    loanAmt.value = Number(purchPrice.value) * 0.96
}

