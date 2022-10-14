//This form will go on the login page and ask users for username and password
import { useState } from "react";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { email: email, password: password },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }
    setEmail("");
    setPassword("");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    return name === "email" ? setEmail(value) : setPassword(value);
  };
  return (
    <div className="w-25">
      <h3>Login</h3>
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
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          value={password}
          className="form-control"
          type="text"
          placeholder="password"
          name="password"
          onChange={handleInputChange}
        ></input>
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

export default LoginForm;
