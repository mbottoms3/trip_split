//This form will go on the login page and ask users for username and password
import { useState } from "react";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
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
      <div>
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
