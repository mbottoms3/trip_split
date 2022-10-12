import { useState } from "react";

function AddJoinForms() {
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [existingName, setExistingName] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback1, setFeedback1] = useState("");
  const [feedback2, setFeedback2] = useState("");

  const handleAddSubmit = (e) => {
    e.preventDefault();
    newPassword === confirmPassword
      ? console.log("Passwords match")
      : setFeedback1("Passwords do not match");
    console.log(newName, newPassword);
    setNewName("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    console.log(existingName, existingPassword);
    setExistingName("");
    setExistingPassword("");
  };

  const handleAddInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    return name === "newName"
      ? setNewName(value)
      : name === "newPassword"
      ? setNewPassword(value)
      : setConfirmPassword(value);
  };

  const handleJoinInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    return name === "existingName"
      ? setExistingName(value)
      : setExistingPassword(value);
  };

  return (
    <div className="d-flex">
      <div className="w-50 m-3">
        <h3>Add a New Trip</h3>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Trip Name:
          </label>
          <input
            value={newName}
            name="newName"
            className="form-control m-10"
            type="text"
            placeholder="Nick's Bachelor Party"
            onChange={handleAddInputChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword1" className="form-label">
            Create a Trip Password:
          </label>
          <input
            value={newPassword}
            name="newPassword"
            type="password"
            className="form-control"
            id="inputPassword1"
            placeholder="Password"
            onChange={handleAddInputChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword2" className="form-label">
            Confirm Trip Password:
          </label>
          <input
            name="confirmPassword"
            value={confirmPassword}
            type="password"
            className="form-control"
            id="inputPassword2"
            placeholder="Password"
            onChange={handleAddInputChange}
          ></input>
        </div>
        <div className="col-auto d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={handleAddSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="w-50 m-3">
        <h3>Join an Existing Trip</h3>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Trip Name:
          </label>
          <input
            name={existingName}
            className="form-control m-10"
            type="text"
            placeholder="Breckenridge Camping Trip"
            onChange={handleJoinInputChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword3" className="form-label">
            Trip Password:
          </label>
          <input
            name={existingPassword}
            type="password"
            className="form-control"
            id="inputPassword3"
            placeholder="Password"
            onChange={handleJoinInputChange}
          ></input>
        </div>
        <div className="col-auto d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={handleJoinSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddJoinForms;
