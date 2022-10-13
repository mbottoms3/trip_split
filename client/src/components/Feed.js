import { useEffect } from "react";

//inside One trip page, Feed will be called and data.expenses (array of objects) will be passed in as a prop
function Feed({ expenses, title }) {
  console.log(expenses);
  if (!expenses.length) {
    return <h3>No expenses paid for yet.</h3>;
  }

  return (
    <div>
      <h3 className="my-3">{title}</h3>
      {expenses &&
        expenses.map((expense) => (
          <div>
            <li key={expense.itemDescription} className="list-group-item">
              Someone purchased {expense.itemDescription} for ${expense.amount}
            </li>
          </div>
        ))}
    </div>
  );
}

export default Feed;
