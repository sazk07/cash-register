"use strict"

function checkCashRegister(price, cash, cid) {
  let change = cash - price;

  const unitAmount = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  }

  const retStatusChange = new Map()
  retStatusChange.set('change', [])

  const totalInDrawer = cid.reduce((previous, current) => {
    previous = previous + current[1]
    return previous
  }, 0)

  // if change > 99, deduct from one hundred array
  let changeGiven = 0
  while (changeGiven < change) {
    while (change > 99) {
      cid[8][1] = cid[8][1] - unitAmount["ONE HUNDRED"]
      changeGiven += unitAmount["ONE HUNDRED"]
      change = change - unitAmount["ONE HUNDRED"]
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }
  // if change from 20 to 99, deduct from twenty array
  while (changeGiven < change) {
    while (change >= 20) {
      cid[7][1] = cid[7][1] - unitAmount.TWENTY
      changeGiven += unitAmount.TWENTY
      change = change - unitAmount.TWENTY
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }
  // if change from 10 to 19, deduct from ten array
  while (changeGiven < change) {
    while (change >= 10) {
      cid[6][1] = cid[6][1] - unitAmount.TEN
      changeGiven += unitAmount.TEN
      change = change - unitAmount.TEN
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }
  // if change from 5 to 9, deduct from five array
  while (changeGiven < change) {
    while (change >= 5) {
      cid[5][1] = cid[5][1] - unitAmount.FIVE
      changeGiven += unitAmount.FIVE
      change = change - unitAmount.FIVE
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }
  // if change from 1 to 4, deduct from one array
  while (changeGiven < change) {
    while (change >= 1) {
      cid[4][1] = cid[4][1] - unitAmount.ONE
      changeGiven += unitAmount.ONE
      change = change - unitAmount.ONE
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }
  // if change from 0.25 to 0.99, deduct from quarter array
  while (changeGiven < change) {
    while (change >= 0.25) {
      cid[3][1] = cid[3][1] - unitAmount.QUARTER
      changeGiven += unitAmount.QUARTER
      change = change - unitAmount.QUARTER
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }
  // if change from 0.10 to 0.24, deduct from dime array
  while (changeGiven < change) {
    while (change >= 0.1) {
      cid[2][1] = cid[2][1] - unitAmount.DIME
      changeGiven += unitAmount.DIME
      change = change - unitAmount.DIME
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }
  // if change from 0.05 to 0.09, deduct from nickel array
  while (changeGiven < change) {
    while (change >= 0.05) {
      cid[1][1] = cid[1][1] - unitAmount.NICKEL
      changeGiven += unitAmount.NICKEL
      change = change - unitAmount.NICKEL
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }
  // if change from 0.01 to 0.04, deduct from penny array
  while (changeGiven < change) {
    while (change >= 0.01) {
      cid[0][1] = cid[0][1] - unitAmount.PENNY
      changeGiven += unitAmount.PENNY
      change = change - unitAmount.PENNY
    }
    const changeArr = retStatusChange.get("change")
    changeArr.push([changeGiven])
    retStatusChange.set("change", changeArr)
    changeGiven = 0
  }

  if (totalInDrawer < change || change !== 0) {
    retStatusChange.set("status", "INSUFFICIENT_FUNDS")
  } else if (totalInDrawer == change) {
    retStatusChange.set("status", "CLOSED")
    retStatusChange.set("change", cid)
  } else {
    retStatusChange.set("status", "OPEN")
  }
  const retObj = { status: retStatusChange.get("status"), change: retStatusChange.get("change") }
  return retObj;
}
// let b = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
// console.log(b)
// {status: "OPEN", change: [["QUARTER", 0.5]]}
let c = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
console.log(c)
// {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]] }
// let d = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// console.log(d)
// {status: "INSUFFICIENT_FUNDS", change: []}
// let e = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// console.log(e)
// {status: "INSUFFICIENT_FUNDS", change: []}
// let f = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// console.log(f)
// {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
