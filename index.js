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

  // using Maps instead of Objects, although later on I cast the Map's (final) values to an object
  // but until the values are not final, I am using Maps to hold their values
  const retStatusChange = new Map()
  retStatusChange.set('change', [])

  const totalInDrawer = cid.reduce((previous, current) => {
    previous = previous + current[1]
    return previous
  }, 0)

  let hundredsBucket = cid[8][1]
  let twentiesBucket = cid[7][1]
  let tensBucket = cid[6][1]
  let fivesBucket = cid[5][1]
  let onesBucket = cid[4][1]
  let quartersBucket = cid[3][1]
  let dimesBucket = cid[2][1]
  let nickelsBucket = cid[1][1]
  let penniesBucket = cid[0][1]

  if (change > 99) {
    while (hundredsBucket > 0) {
      if (change >= unitAmount["ONE HUNDRED"]) {
        change = change - unitAmount["ONE HUNDRED"]
        hundredsBucket = hundredsBucket - unitAmount["ONE HUNDRED"]
      } else {
        break
      }
    }
  }
  if (change >= 20) {
    while (twentiesBucket > 0) {
      if (change >= unitAmount.TWENTY) {
        change = change - unitAmount.TWENTY
        twentiesBucket = twentiesBucket - unitAmount.TWENTY
      } else {
        break
      }
    }
  }
  if (change >= 10) {
    while (tensBucket > 0) {
      if (change >= unitAmount.TEN) {
        change = change - unitAmount.TEN
        tensBucket = tensBucket - unitAmount.TEN
      } else {
        break
      }
    }
  }
  if (change >= 5) {
    while (fivesBucket > 0) {
      if (change >= unitAmount.FIVE) {
        change = change - unitAmount.FIVE
        fivesBucket = fivesBucket - unitAmount.FIVE
      } else {
        break
      }
    }
  }
  if (change >= 1) {
    while (onesBucket > 0) {
      if (change >= unitAmount.ONE) {
        change = change - unitAmount.ONE
        onesBucket = onesBucket - unitAmount.ONE
      } else {
        break
      }
    }
  }
  if (change >= 0.25) {
    while (quartersBucket > 0) {
      if (change >= unitAmount.QUARTER) {
        change = change - unitAmount.QUARTER
        quartersBucket = quartersBucket - unitAmount.QUARTER
      } else {
        break
      }
    }
  }
  if (change >= 0.10) {
    while (dimesBucket > 0) {
      if (change >= unitAmount.DIME) {
        change = change - unitAmount.DIME
        dimesBucket = dimesBucket - unitAmount.DIME
      } else {
        break
      }
    }
  }
  if (change >= 0.05) {
    while (nickelsBucket > 0) {
      if (change >= unitAmount.NICKEL) {
        change = change - unitAmount.NICKEL
        nickelsBucket = nickelsBucket - unitAmount.NICKEL
      } else {
        break
      }
    }
  }
  if (change >= 0.01) {
    while (penniesBucket > 0) {
      if (change >= unitAmount.PENNY) {
        change = Math.round((change + Number.EPSILON) * 100) / 100
        change = change - unitAmount.PENNY
        penniesBucket = penniesBucket - unitAmount.PENNY
      } else {
        break
      }
    }
  }

  if (totalInDrawer < change || change !== 0) {
    retStatusChange.set("status", "INSUFFICIENT_FUNDS")
  } else if (totalInDrawer == change) {
    retStatusChange.set("status", "CLOSED")
    retStatusChange.set("change", cid)
  } else {
    retStatusChange.set("status", "OPEN")
  }

  const retObj = {
    status: retStatusChange.get("status"),
    change: retStatusChange.get("change")
  }
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
