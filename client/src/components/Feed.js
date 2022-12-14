import { useEffect } from "react";

//inside One trip page, Feed will be called and data.expenses (array of objects) will be passed in as a prop
function Feed({ expenses, title }) {
  // console.log(expenses);
  if (!expenses.length) {
    return <h3>No expenses paid for yet.</h3>;
  }

  function reverseArr(input) {
    var ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }
  const newArray = reverseArr(expenses);
  console.log(newArray);

  return (
    <div>
      <h3 className="my-3">{title}</h3>
      {newArray &&
        newArray.map((expense) => (
          <div>
            <li key={Math.random()} className="list-group-item">
              Someone purchased {expense.itemDescription} for ${expense.amount}
            </li>
          </div>
        ))}
    </div>
  );
}

export default Feed;
