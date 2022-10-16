export function createTotalArray(users, expenses) {
  const finalArray = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i].email;

    console.log(users);

    const firstName = users[i].firstName;
    const lastName = users[i].lastName;

    // console.log(user);
    let paid = expenses.reduce((total, object) => {
      if (object.email === user) {
        total += object.amount;
        return total;
      } else {
        return total;
      }
    }, 0);
    const item = { firstName, lastName, paid };
    console.log(paid);
    finalArray.push(item);
  }
  console.log(finalArray);

  return finalArray;
}

export function split(array) {
  const output = [];
  //adds up all amounts paid and divides by the number of users on the trip
  const evenSplitAmount =
    array.reduce(function (total, object) {
      total += object.paid;

      return total;
    }, 0) / array.length;

  //change original array.paid to difference between amount paid and amount each person SHOULD pay if it was even
  array.map((object) => {
    return (object.paid = object.paid - evenSplitAmount);
  });

  const negativePaid = array.filter(function (currentValue) {
    return currentValue.paid <= 0;
  });

  const positivePaid = array.filter(function (currentValue) {
    return currentValue.paid > 0;
  });

  //owed most - least
  let positivePaidDescend = positivePaid.sort(
    (a, b) => parseFloat(b.paid) - parseFloat(a.paid)
  );

  //owe most - least --> will be most neg to least neg so the largest absolute value will be first
  let negativePaidDescend = negativePaid.sort(
    (a, b) => parseFloat(a.paid) - parseFloat(b.paid)
  );

  //declaring variable to store transaction remainder
  let positiveRemainder;
  let negativeRemainder;

  //making first money owed in array to absolute value
  let negOwed = Math.abs(negativePaidDescend[0].paid).toFixed(20); //returns a string

  //turning the absolute value to a number
  let negAbsoluteOwed = parseFloat(negOwed);

  //first user needing money
  let firstPosUser = positivePaidDescend[0].paid;

  while (negativePaidDescend.length !== 0 && positivePaidDescend.length !== 0) {
    // gathering remainder after transaction --> prevents any user from going below zero
    if (negAbsoluteOwed > firstPosUser) {
      negativeRemainder = negAbsoluteOwed - firstPosUser;
      //pushing rendered transaction to output array
      output.push({
        owedFrom: `${negativePaidDescend[0].firstName} ${negativePaidDescend[0].lastName}`,
        owedTo: `${positivePaidDescend[0].firstName} ${positivePaidDescend[0].lastName}`,
        amount: `$${firstPosUser.toFixed(2)}`,
      });
      //replacing what neg person owes with their remainder
      negAbsoluteOwed = negativeRemainder;
      //removing user once they reach zero
      positivePaidDescend.shift();

      //this is to prevent an error --> rounding the numbers can sometimes cause less than one cent to be leftover after all valid transactions
      if (positivePaidDescend.length === 0) {
        negAbsoluteOwed = 0;
        firstPosUser = 0;
      } else {
        //getting positive user amount from new array
        firstPosUser = positivePaidDescend[0].paid;
      }
    }

    if (firstPosUser > negAbsoluteOwed) {
      positiveRemainder = firstPosUser - negAbsoluteOwed;
      //pushing rendered transaction to output array
      output.push({
        owedFrom: `${negativePaidDescend[0].firstName} ${negativePaidDescend[0].lastName}`,
        owedTo: `${positivePaidDescend[0].firstName} ${positivePaidDescend[0].lastName}`,
        amount: `$${negAbsoluteOwed.toFixed(2)}`,
      });

      //replacing what the pos user is owed with the remainder
      firstPosUser = positiveRemainder;
      //removing neg user once they reach zero
      negativePaidDescend.shift();

      //this is to prevent an error --> rounding the numbers can sometimes cause less than one cent to be leftover after all valid transactions
      if (negativePaidDescend.length === 0) {
        negAbsoluteOwed = 0;
        firstPosUser = 0;
      } else {
        //making first money owed in new array to absolute value
        negOwed = Math.abs(negativePaidDescend[0].paid).toFixed(20);
        //turning the absolute value into a number
        negAbsoluteOwed = parseFloat(negOwed);
      }
    }

    if (firstPosUser === negAbsoluteOwed) {
      output.push({
        owedFrom: `${negativePaidDescend[0].firstName} ${negativePaidDescend[0].lastName}`,
        owedTo: `${positivePaidDescend[0].firstName} ${positivePaidDescend[0].lastName}`,
        amount: `$${negAbsoluteOwed.toFixed(2)}`,
      });

      //removing neg user once they reach zero
      negativePaidDescend.shift();
      positivePaidDescend.shift();
    }
  }
  return output;
}
