import { useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { ADD_EXPENSE } from "../utils/mutations";
import { createTotalArray, reverseArr } from "../utils/helpers.mjs";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { QUERY_SINGLE_TRIP } from "../utils/queries";
import { useLocation } from "react-router-dom";

function ExpenseForm({ tripId, expenses, title, users, chartData, tripData }) {
  //query to get updated expenses
  const [singleTripExpense] = useLazyQuery(QUERY_SINGLE_TRIP);

  //need to make sure we have an add_expense mutation in utils/mutations- look in MERN activity 16
  const [addExpense, { error }] = useMutation(ADD_EXPENSE);

  //getting current tripId
  let location = useLocation();
  let currentTrip = location.state;
  let currentTripId = currentTrip.tripId;

  const { data } = useQuery(QUERY_SINGLE_TRIP, {
    variables: { tripId: currentTrip.tripId },
  });

  //used to pass arrays to FinalSplit
  let tripExpenses = data.trip.expensesPaid;
  let tripUsers = data.trip.users;

  // barChart stuff ------------------------------------------------------------------------------
  let labels = [];
  let dataArr = [];
  let totalArray;

  totalArray = createTotalArray(data.trip.users, data.trip.expensesPaid);

  for (const userData of totalArray) {
    labels.push(userData.firstName);
    dataArr.push(userData.paid);
  }

  const initialLoadGraphData = {
    labels: labels,
    datasets: [
      {
        label: "Trip Expense Status by User",
        data: dataArr,
        backgroundColor: ["#3e2f34"],
        borderWidth: 1,
      },
    ],
  };

  // //end barchart ---------------------------------------------------------------------------------------

  let newArray = reverseArr(data.trip.expensesPaid);
  console.log(newArray);

  const [cost, setCost] = useState();
  const [description, setDescription] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [expenseArray, setExpenseArray] = useState(newArray);
  const [graphData, setGraphData] = useState(initialLoadGraphData);
  console.log(expenseArray);
  let expensesWithNames = [];

  //solution - have query send first and last names with each expense (basically attach entire user object to the expense)
  useEffect(() => {
    //moves through newArray and finds a matching user inside users array by email
    for (let expense of newArray) {
      const user = users.find((e) => e.email === expense.email);
      //once found, empty array gets the following object pushed to it
      expensesWithNames.push({
        name: `${user.firstName} ${user.lastName}`,
        email: expense.email,
        amount: expense.amount,
        itemDescription: expense.itemDescription,
      });
    }
    //expense array is set to this new array
    setExpenseArray(expensesWithNames);
  }, []);

  if (error) {
    console.log(JSON.stringify(error));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const results = await singleTrip({});

    try {
      //returns {tripId: "ID...."}
      let currentTrip = location.state;

      //turning cost into number
      const costNum = parseInt(cost);

      //adding the expense
      const { data } = await addExpense({
        variables: {
          tripId: currentTrip.tripId,
          itemDescription: description,
          amount: costNum,
          email: purchaser,
        },
      });
      //query db to find users and expenses
      let results = await singleTripExpense({
        variables: { tripId: currentTrip.tripId },
      });

      totalArray = createTotalArray(
        results.data.trip.users,
        results.data.trip.expensesPaid
      );

      tripExpenses = results.data.trip.expensesPaid;
      tripUsers = results.data.trip.users;

      //
      const inputName = users.find((user) => user.email === purchaser);
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

      const object = labels.findIndex((item) => item === inputName.firstName);
      dataArr[object] += costNum;
      setGraphData({
        labels: labels,
        datasets: [
          {
            label: "Trip Expense Status by User",
            data: dataArr,
            backgroundColor: ["#3e2f34"],
            borderWidth: 1,
          },
        ],
      });

      setCost("");
      setDescription("");
      setPurchaser("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    return name === "cost"
      ? setCost(value)
      : name === "description"
      ? setDescription(value)
      : setPurchaser(value);
  };

  const handleRemove = (e) => {
    console.log(e.currentTarget.parentElement.parentElement.children[0]);
  };

  return (
    <div className="d-flex">
      <div className="w-100 one-trip d-flex flex-column">
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
                    id={expense}
                    key={expense.itemDescription}
                    className="list-unstyled m-2 p-2 flex-fill"
                  >
                    {expense.name} {expense.lastName} purchased{" "}
                    {expense.itemDescription} for ${expense.amount}{" "}
                  </li>
                  <div className="icon">
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={handleRemove}
                    ></i>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* bar chart stuff */}
      <div className="col-8 p-3 d-flex flex-column align-items-center">
        <h3 className="my-3">Trip Expense Status by User</h3>
        <div className="bar-chart p-3">
          <Bar
            data={graphData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: false,
                },

                legend: {
                  display: false,
                  position: "bottom",
                },
              },
            }}
          />
        </div>
        <Link
          className="btn btn-dark final m-5"
          to="/finaltripsplit"
          state={{
            expenses: tripExpenses,
            users: tripUsers,
            tripId: currentTripId,
          }}
        >
          Final Trip $plit
        </Link>
      </div>
    </div>
  );
}

export default ExpenseForm;
