//takes in a user array and an expenses paid array and outputs one array of totalsPaid

//start with array of expenses paid
//set username = _typename for now
//Count the number of unique usernames, create
//That's the number of times we filter through array
//for loop, each new array is called newArrayi

const users = ["michaela", "nick", "sally"];
const expenses = [
  { username: "michaela", itemDescription: "waterbottles", amount: 15 },
  { username: "nick", itemDescription: "waterbottles", amount: 15 },
  { username: "nick", itemDescription: "waterbottles", amount: 15 },
  { username: "sally", itemDescription: "waterbottles", amount: 15 },
  { username: "michaela", itemDescription: "waterbottles", amount: 15 },
  { username: "michaela", itemDescription: "waterbottles", amount: 15 },
];

function createTotalArray(users, expenses) {
  const finalArray = [];
  for (i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(users.length);
    let paid = expenses.reduce((total, object) => {
      if (object.username === user) {
        console.log(object);
        total += object.amount;
        return total;
      } else {
        return total;
      }
    }, 0);
    const item = { user, paid };
    finalArray.push(item);
  }
  return finalArray;
}

split(createTotalArray(users, expenses));

function split(array) {
  //adds up all amounts paid and divides by the number of users on the trip
  const evenSplitAmount =
    array.reduce(function (total, object) {
      total += object.paid;
      return total;
    }, 0) / array.length;

  //change original array.paid to difference between amount paid and amount each person SHOULD pay if it was even
  array.map((object) => {
    object.paid = object.paid - evenSplitAmount;
  });

  const negativePaid = array.filter(function (currentValue) {
    return currentValue.paid <= 0;
  });
  console.log(negativePaid);
  const positivePaid = array.filter(function (currentValue) {
    return currentValue.paid > 0;
  });
  console.log(positivePaid);

  //need to sort these arrays

  let output = [];
  let p = 0; //positive index
  let n = 0;
  function paymentOrganization(output) {
    //negative index
    if (n < negativePaid.length && p < positivePaid.length) {
      if (Math.abs(negativePaid[n].paid) < Math.abs(positivePaid[p].paid)) {
        const amountToPay = negativePaid[n].paid;
        output.push({
          owedFrom: negativePaid[n].user,
          owedTo: positivePaid[p].user,
          amount: `$${Math.abs(amountToPay).toFixed(2)}`,
        });
        //add to negative person's paid
        negativePaid[n].paid += amountToPay;
        //subtract from positive person's paid
        positivePaid[p].paid -= amountToPay;
        //move negative person index
        n++;
        //run function again with changed arrays
        paymentOrganization(output);
      } else {
        const amountToPay = positivePaid[p].paid;
        //if negative person owes more than positive person needs
        output.push({
          owedFrom: negativePaid[n].user,
          owedTo: positivePaid[p].user,
          amount: `$${Math.abs(amountToPay).toFixed(2)}`,
        });
        //add to negative person's paid
        negativePaid[n].paid += amountToPay;
        //subtract from positive person's paid
        positivePaid[p].paid -= amountToPay;
        //move positive person index
        p++;
        paymentOrganization(output);
      }
    } else {
      console.log(output);
      return output;
    }
  }

  paymentOrganization(output);
}
