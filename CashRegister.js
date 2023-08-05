function checkCashRegister(price, cash, cid) {
  const currency = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    "ONE HUNDRED": 10000,
  };

  let output = {
    status: "",
    change: [],
  };

  var changeDue = (cash - price) * 100;
  const changeDueCheck = changeDue;

  let cidSum = 0;

  // CHANGE DUE = changeDue --- 50, 96.74 ...
  for (let i = cid.length - 1; i >= 0; i--) {
    let elem = cid[i]; // ["ONE HUNDRED", 100]
    let curr = elem[0]; // "ONE HUNDRED"
    let currSum = elem[1] * 100; // 10000
    cidSum += currSum; // SUM OF ALL CID DENOMINATION
    let amount = 0;

    // IS THERE ENOUGH CHANGE & IF CASH STILL AVAIL IN REGISTER FOR DENOM
    while (changeDue >= currency[curr] && currSum > 0) {
      amount += currency[curr];
      changeDue -= currency[curr];
      currSum -= currency[curr];
    }
    if (amount !== 0) {
      output.change.push([curr, amount / 100]);
    }
  }

  // STATUS CHECK
  if (changeDue > 0) {
    output.status = "INSUFFICIENT_FUNDS"; // ISSUFFICIENT CHANGE TO ISSUE
    output.change = [];
  } else if (changeDue === 0 && changeDueCheck === cidSum) {
    output.status = "CLOSED"; // EMPTIED; GAVE TO CUSTOMER
    output.change = cid;
  } else {
    output.status = "OPEN"; // HAS CHANGE REMAINING
  }
  return output;
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
); //OPEN

console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
); // OPEN

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
); // CLOSED

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
); // INSUFFICIENT
