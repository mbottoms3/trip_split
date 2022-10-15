import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EXPENSE } from "../utils/mutations";

function ExpenseForm({ tripId, expenses, title, users }) {
  function reverseArr(input) {
    var ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }

  let newArray = reverseArr(expenses);

  const [cost, setCost] = useState();
  const [description, setDescription] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [expenseArray, setExpenseArray] = useState(newArray);

  useEffect(() => {
    let expensesWithNames = [];
    for (let expense of newArray) {
      const user = users.find((e) => e.email === expense.email);
      expensesWithNames.push({
        name: `${user.firstName} ${user.lastName}`,
        email: expense.email,
        amount: expense.amount,
        itemDescription: expense.itemDescription,
      });
    }
    setExpenseArray(expensesWithNames);
  }, []);

  console.log(newArray);

  console.log(expenseArray);
  // const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
  //   variables: { tripId: tripId },
  // });
  // const trip = data?.trip || {};

  //need to make sure we have an add_expense mutation in utils/mutations- look in MERN activity 16
  const [addExpense, { error }] = useMutation(ADD_EXPENSE);

  if (error) {
    console.log(JSON.stringify(error));
  }

  const handleSubmit = async (e) => {
    const inputName = users.find((user) => user.email === purchaser);
    const costNum = parseInt(cost);
    setExpenseArray([
      {
        __typename: "expensePaid",
        name: inputName.firstName,
        lastName: inputName.lastName,
        email: purchaser,
        itemDescription: description,
        amount: costNum,
      },
      ...expenseArray,
    ]);

    e.preventDefault();
    try {
      const { data } = await addExpense({
        variables: {
          tripId: tripId,
          itemDescription: description,
          amount: costNum,
          email: purchaser,
        },
      });

      setCost("");
      setDescription("");
      setPurchaser("");
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    return name === "cost"
      ? setCost(value)
      : name === "description"
      ? setDescription(value)
      : setPurchaser(value);
  };

  if (!expenses.length) {
    return <h3>No expenses paid for yet.</h3>;
  }

  return (
    <div className="w-100 one-trip">
      <div className="form p-3">
        <h3 className="my-3">Add a New Expense</h3>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Cost:
          </label>
          <input
            value={cost}
            className="form-control m-10"
            type="text"
            placeholder="150.00"
            name="cost"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            value={description}
            className="form-control"
            type="text"
            placeholder="Rental Car"
            name="description"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Purchaser's Username:
          </label>
          <input
            value={purchaser}
            type="email"
            className="form-control"
            placeholder="name@example.com"
            name="purchaser"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="col-auto d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-dark mb-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {/* feed starts here */}
      </div>
      <div className="p-3 feed">
        <ul className="list-group"></ul>
        <div>
          <h3 className="my-3">{title}</h3>
          {expenseArray &&
            expenseArray.map((expense) => (
              <div className="d-flex align-items-center justify-content-between">
                <li
                  key={Math.random()}
                  className="list-unstyled m-2 p-2 flex-fill"
                >
                  {expense.name} {expense.lastName} purchased{" "}
                  {expense.itemDescription} for ${expense.amount}{" "}
                </li>
                <div className="icon">
                  <i className="fa-solid fa-trash-can"></i>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ExpenseForm;
