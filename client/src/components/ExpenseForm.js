import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXPENSE } from "./mutations";

function ExpenseForm() {
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [purchaser, setPurchaser] = useState("");

  //need to make sure we have an add_expense mutation in utils/mutations- look in MERN activity 16
  const [addExpense, { error }] = useMutation(ADD_EXPENSE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addExpense({
        variables: { cost, description, purchaser },
      });
      setCost("");
      setDescription("");
      setPurchaser("");
      console.log(data);
    } catch (err) {
      console.error(err);
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

  return (
    <div className="w-25">
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
          className="btn btn-primary mb-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <ul className="list-group"></ul>
    </div>
  );
}

export default ExpenseForm;
