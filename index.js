"use strict"

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  const originalChange = change

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

  const changeToBeGivenArray = []

  // using Maps instead of Objects, although later on I cast the Map's (final) values to an object
  // but until the values are not final, I am using Maps to hold their values
  const retStatusChange = new Map()
  retStatusChange.set('change', [])

  const totalInDrawer = cid.reduce((previous, current) => {
    previous = previous + current[1]
    return previous
  }, 0)

  let [
    [penniesBucketName, penniesBucket],
    [nickelsBucketName, nickelsBucket],
    [dimesBucketName, dimesBucket],
    [quartersBucketName, quartersBucket],
    [onesBucketName, onesBucket],
    [fivesBucketName, fivesBucket],
    [tensBucketName, tensBucket],
    [twentiesBucketName, twentiesBucket],
    [hundredsBucketName, hundredsBucket]
  ] = [...cid]

  // returns an array consisting of name and the amount added to change to be given
  function payTheChange(bucket, denomination, bucketName) {
    let changeToBeGiven = 0
    while (bucket > 0) {
      if (change >= denomination) {
        // deduct the denomination note amount from the change
        change = change - denomination
        change = Math.round((change + Number.EPSILON) * 100) / 100
        // deduct from the cash register
        bucket = bucket - denomination
        // add the amount taken out of the register to the change to be given
        changeToBeGiven = changeToBeGiven + denomination
      } else {
        // step out of the loop when register is empty and proceed to next register
        break
      }
    }
    return changeToBeGivenArray.push([bucketName, changeToBeGiven]);
  }

  change >= unitAmount["ONE HUNDRED"] && ( payTheChange(hundredsBucket, unitAmount["ONE HUNDRED"], hundredsBucketName) )
  change >= unitAmount.TWENTY && ( payTheChange(twentiesBucket, unitAmount.TWENTY, twentiesBucketName) )
  change >= unitAmount.TEN && ( payTheChange(tensBucket, unitAmount.TEN, tensBucketName) )
  change >= unitAmount.FIVE && ( payTheChange(fivesBucket, unitAmount.FIVE, fivesBucketName) )
  change >= unitAmount.ONE && ( payTheChange(onesBucket, unitAmount.ONE, onesBucketName) )
  change >= unitAmount.QUARTER && ( payTheChange(quartersBucket, unitAmount.QUARTER, quartersBucketName) )
  change >= unitAmount.DIME && ( payTheChange(dimesBucket, unitAmount.DIME, dimesBucketName) )
  change >= unitAmount.NICKEL && ( payTheChange(nickelsBucket, unitAmount.NICKEL, nickelsBucketName) )
  change >= unitAmount.PENNY && ( payTheChange(penniesBucket, unitAmount.PENNY, penniesBucketName) )

  switch (true) {
    case (totalInDrawer < originalChange || change !== 0):
      retStatusChange.set("status", "INSUFFICIENT_FUNDS")
      break;
    case (totalInDrawer === originalChange):
      retStatusChange.set("status", "CLOSED")
      retStatusChange.set("change", cid)
      break;
    default:
      retStatusChange.set("status", "OPEN")
      retStatusChange.set("change", changeToBeGivenArray)
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
