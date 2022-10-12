import { useEffect } from "react";

//inside One trip page, Feed will be called and data.expenses (array of objects) will be passed in as a prop
function Feed(props) {
  if (!props.expenses.length) {
    return <h3>No expenses paid for yet.</h3>;
  }

  return (
    <div>
      <h3>Trip Feed:</h3>
      {props.expenses.map((expense) => {
        <li className="list-group-item">
          {expense.purchaser} purchased {expense.description} for $
          {expense.cost}
        </li>;
      })}
    </div>
  );
}

export default Feed;
