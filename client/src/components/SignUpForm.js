//This form will go on the sign up page and ask users for name, email (username), create password and confirm password
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUserPassword === confirmPassword) {
      console.log("Passwords match");
      setFeedback("Passwords match");
      try {
        const { data } = await addUser({
          variables: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: newUserPassword,
          },
        });
        Auth.login(data.addUser.token);
      } catch (error) {
        console.error(error);
      }

      setEmail("");
      setFirstName("");
      setLastName("");
      setNewUserPassword("");
      setConfirmPassword("");
    } else {
      setFeedback("Passwords do not match");
    }
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    return name === "email"
      ? setEmail(value)
      : name === "firstName"
      ? setFirstName(value)
      : name === "lastName"
      ? setLastName(value)
      : name === "newUserPassword"
      ? setNewUserPassword(value)
      : setConfirmPassword(value);
  };

  return (
    <div className="w-25">
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          value={email}
          className="form-control m-10"
          type="email"
          placeholder="example@example.com"
          name="email"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name:
        </label>
        <input
          value={firstName}
          name="firstName"
          className="form-control m-10"
          type="text"
          placeholder="First Name"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name:
        </label>
        <input
          value={lastName}
          name="lastName"
          className="form-control m-10"
          type="text"
          placeholder="Last Name"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="newUserPassword" className="form-label">
          Create a Password:
        </label>
        <input
          value={newUserPassword}
          name="newUserPassword"
          type="password"
          className="form-control"
          id="newUserPassword"
          placeholder="Password"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="confirm" className="form-label">
          Confirm Your Password:
        </label>
        <input
          value={confirmPassword}
          name="confirmPassword"
          type="password"
          className="form-control"
          id="confirm"
          placeholder="Confirm Password"
          onChange={handleInputChange}
        ></input>
        <p className="py-3">{feedback}</p>
      </div>
      <div className="col-auto d-flex justify-content-end">
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

export default SignUpForm;
