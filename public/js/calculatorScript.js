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
const totalIncome = document.getElementById('totalIncome')
const vacExp = document.getElementById('vacancyExp')
const repSavExp = document.getElementById('repairSavingExpense')
const propManExp = document.getElementById('propManageSav')
const taxSavExp = document.getElementById('taxSaving')
const monthlyExpenses = document.getElementsByClassName('monthExp')
const monthExpTotal = document.getElementById('totalMonthExp')
const cashFlow = document.getElementById('cashFlow')
const annualCashFlow = document.getElementById('annCashFlow')
const coCrio = document.getElementById('cocrio')
const expValue = document.getElementById('expValue')

const app1 = document.getElementById('app1')
const app2 = document.getElementById('app2')
const app3 = document.getElementById('app3')
const app4 = document.getElementById('app4')
const app5 = document.getElementById('app5')

const returnOnInvestment = document.getElementById('roi')

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
    let amt = (Number(loanAmt.value) * 0.01) / 12
    mortInsurance.value = Math.round(amt)
}

function calcTaxes() {
    let amt = (Number(purchPrice.value) * 0.0169) / 12
    taxSavExp.value = Math.round(amt)
}

function calcSavings() {
    let amt = totalIncome.value * 0.05
    let propertyManageAmt = totalIncome.value * 0.11
    vacExp.value = amt
    repSavExp.value = amt
    propManExp.value = propertyManageAmt
}

function calcMonthExp() {
    let sum = 0;
    for (x = 0; x < monthlyExpenses.length; x++) {
        sum+= Number(monthlyExpenses[x].value)
    }
    monthExpTotal.value = Math.round(sum)
}

function amortizeFiveYear() {
    let principal = Number(purchPrice.value)
    let mort = Number(mortgage.value)
    
    for (x = 0; x < 48; x++) {
        let monthlyInterest = principal * 0.065 / 12
        let principalPayment = mort - monthlyInterest
        principal-= principalPayment
    }
    return principal
}

function calcRIO(salePrice) {
    console.log(salePrice)
    let realtorFees = Math.round(salePrice * 0.06)
    let closingCosts = 5000
    let sellingRepairs = 5000
    let salesExpenses = realtorFees + closingCosts + sellingRepairs
    let loanPayoff = amortizeFiveYear()
    let totalInvestedCap = Number(cashReq.value)
    let profit = salePrice - salesExpenses - loanPayoff - totalInvestedCap
    let cashflow = (totalIncome.value - monthExpTotal.value) * 12
    let totalProfit = profit + cashflow
    let roi = (totalProfit / totalInvestedCap) / 5
    return `${Math.round(roi * 100)} %`
}

function calcAppreciation() {
    let price = Number(purchPrice.value) + Number(totalRepairCost.value)
    let y1 = price + (price * 0.02)
    let y2 = y1 + (y1 * 0.02)
    let y3 = y2 + (y2 * 0.02)
    let y4 = y3 + (y3 * 0.02)
    let y5 = y4 + (y4 * 0.02)

    app1.innerText = `$ ${Math.round(y1)}`
    app2.innerText = `$ ${Math.round(y2)}`
    app3.innerText = `$ ${Math.round(y3)}`
    app4.innerText = `$ ${Math.round(y4)}`
    app5.innerText = `$ ${Math.round(y5)}`


    returnOnInvestment.innerText = calcRIO(y5)
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
    calcTaxes()
    calcMonthExp()
}

function calcRepairs() {
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
    loanAmt.value = Number(purchPrice.value) * 0.965
}

function evalProperty() {
    let sum = Number(totalIncome.value) - Number(monthExpTotal.value)
    cashFlow.innerText = `$ ${sum}`
    annualCashFlow.innerText = `$ ${sum * 12}`
    console.log(sum * 12)

    let cashOnCashRet = ((sum * 12) / Number(cashReq.value)) * 100

    coCrio.innerText = `${Math.round(cashOnCashRet * 100) / 100} %`

    amortizeFiveYear()
    calcAppreciation()
}

