"use strict"

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let originalChange = change

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

  const changeGivenArray = []

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
    let changeGiven = 0
    while (hundredsBucket > 0) {
      if (change >= unitAmount["ONE HUNDRED"]) {
        change = change - unitAmount["ONE HUNDRED"]
        hundredsBucket = hundredsBucket - unitAmount["ONE HUNDRED"]
        changeGiven = changeGiven + unitAmount["ONE HUNDRED"]
      } else {
        break
      }
    }
    changeGivenArray.push([cid[8][0], changeGiven]);
  }
  if (change >= 20) {
    let changeGiven = 0
    while (twentiesBucket > 0) {
      if (change >= unitAmount.TWENTY) {
        change = change - unitAmount.TWENTY
        twentiesBucket = twentiesBucket - unitAmount.TWENTY
        changeGiven = changeGiven + unitAmount.TWENTY
      } else {
        break
      }
    }
    changeGivenArray.push([cid[7][0], changeGiven]);
  }
  if (change >= 10) {
    let changeGiven = 0
    while (tensBucket > 0) {
      if (change >= unitAmount.TEN) {
        change = change - unitAmount.TEN
        tensBucket = tensBucket - unitAmount.TEN
        changeGiven = changeGiven + unitAmount.TEN
      } else {
        break
      }
    }
    changeGivenArray.push([cid[6][0], changeGiven]);
  }
  if (change >= 5) {
    let changeGiven = 0
    while (fivesBucket > 0) {
      if (change >= unitAmount.FIVE) {
        change = change - unitAmount.FIVE
        fivesBucket = fivesBucket - unitAmount.FIVE
        changeGiven = changeGiven + unitAmount.FIVE
      } else {
        break
      }
    }
    changeGivenArray.push([cid[5][0], changeGiven]);
  }
  if (change >= 1) {
    let changeGiven = 0
    while (onesBucket > 0) {
      if (change >= unitAmount.ONE) {
        change = change - unitAmount.ONE
        onesBucket = onesBucket - unitAmount.ONE
        changeGiven = changeGiven + unitAmount.ONE
      } else {
        break
      }
    }
    changeGivenArray.push([cid[4][0], changeGiven]);
  }
  if (change >= 0.25) {
    let changeGiven = 0
    while (quartersBucket > 0) {
      if (change >= unitAmount.QUARTER) {
        change = change - unitAmount.QUARTER
        quartersBucket = quartersBucket - unitAmount.QUARTER
        changeGiven = changeGiven + unitAmount.QUARTER
      } else {
        break
      }
    }
    changeGivenArray.push([cid[3][0], changeGiven]);
  }
  if (change >= 0.10) {
    let changeGiven = 0
    while (dimesBucket > 0) {
      if (change >= unitAmount.DIME) {
        change = change - unitAmount.DIME
        dimesBucket = dimesBucket - unitAmount.DIME
        changeGiven = changeGiven + unitAmount.DIME
      } else {
        break
      }
    }
    changeGivenArray.push([cid[2][0], changeGiven]);
  }
  if (change >= 0.05) {
    let changeGiven = 0
    while (nickelsBucket > 0) {
      if (change >= unitAmount.NICKEL) {
        change = Math.round((change + Number.EPSILON) * 100) / 100
        change = change - unitAmount.NICKEL
        nickelsBucket = nickelsBucket - unitAmount.NICKEL
        changeGiven = changeGiven + unitAmount.NICKEL
      } else {
        break
      }
    }
    changeGivenArray.push([cid[1][0], changeGiven]);
  }
  if (change >= 0.01) {
    let changeGiven = 0
    while (penniesBucket > 0) {
      if (change >= unitAmount.PENNY) {
        change = Math.round((change + Number.EPSILON) * 100) / 100
        change = change - unitAmount.PENNY
        penniesBucket = penniesBucket - unitAmount.PENNY
        changeGiven = changeGiven + unitAmount.PENNY
        changeGiven = Math.round((changeGiven + Number.EPSILON) * 100) / 100
      } else {
        break
      }
    }
    changeGivenArray.push([cid[0][0], changeGiven]);
  }

  if (totalInDrawer < originalChange || change !== 0) {
    retStatusChange.set("status", "INSUFFICIENT_FUNDS")
  } else if (totalInDrawer === originalChange) {
    retStatusChange.set("status", "CLOSED")
    retStatusChange.set("change", cid)
  } else {
    retStatusChange.set("status", "OPEN")
    retStatusChange.set("change", changeGivenArray)
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
// let c = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
// console.log(c)
// {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]] }
let d = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
console.log(d)
// {status: "INSUFFICIENT_FUNDS", change: []}
// let e = checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// console.log(e)
// {status: "INSUFFICIENT_FUNDS", change: []}
// let f = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
// console.log(f)
// {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
