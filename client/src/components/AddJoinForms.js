import { useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { ADD_TRIP, UPDATE_TRIP, UPDATE_USER } from "../utils/mutations";
// import { QUERY_USER } from "../utils/queries";
import { QUERY_TRIP } from "../utils/queries";
import Auth from "../utils/auth";

function AddJoinForms() {
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [existingName, setExistingName] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tripId, setTripId] = useState("");
  const [feedback1, setFeedback1] = useState("");
  const [feedback2, setFeedback2] = useState("");

  const [addTrip, { error }] = useMutation(ADD_TRIP);
  const [addUserToTrip, { error1 }] = useMutation(UPDATE_TRIP);
  const [getTripId, { loading, error2, data }] = useLazyQuery(QUERY_TRIP);
  const [addTripToUser, { error3 }] = useMutation(UPDATE_USER);

  // const { loading1, data1 } = useQuery(QUERY_USER);

  // if (error1 || error || error2 || error3) {
  //   console.log(JSON.stringify(error, error1, error2, error3));
  // }

  //takes three tries for this to work
  const handleSearchName = async () => {
    try {
      await getTripId({ variables: { name: existingName } });
      setTripId(data.findTripByName._id);
      console.log(tripId);
      if (!data) {
        console.log("Could not find your trip. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //adds a trip to the database with name and trip password
  //we need to also add this user to the trip users array - not sure how
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    newPassword === confirmPassword
      ? console.log("Passwords match")
      : setFeedback1("Passwords do not match");
    try {
      const { data } = addTrip({
        variables: { name: newName, password: newPassword },
      });
      setNewName("");
      setNewPassword("");
      setConfirmPassword("");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // !!!! NEED TO QUERY FOR TRIP BASED ON NAME AND PASSWORD, CONFIRM IT EXISTS, ADDUSERTOTRIP & ADDTRIPTOUSER BASED ON TRIP ID & JWT USER ID

  //adds a new user to a trip (update a trip method)
  const handleJoinSubmit = async (e) => {
    e.preventDefault();

    //finding existing trip
    await getTripId({
      variables: { name: existingName, password: existingPassword },
    });
    console.log(data.findTripByName._id); //returns trip id if exists

    //confirming the trip exists --> throw error message if no trip exists
    // if (data) {
    try {
      //returns decoded token --> {data: {email: ..., _id: ...}}
      const decodedToken = Auth.getProfile();

      await addUserToTrip({
        variables: {
          userId: decodedToken.data._id,
          tripId: data.findTripByName._id,
        },
      });
      // await addTripToUser({
      //   variables: { tripId: tripId, userId: "6348635d2001e622d695780a" },
      // });
      setExistingName("");
      setExistingPassword("");
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    // } else {
    //   alert("Trip does not exist. Please try again.");
    // }
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
            value={existingName}
            name="existingName"
            className="form-control m-10"
            type="text"
            placeholder="Breckenridge Camping Trip"
            onChange={handleJoinInputChange}
            // onMouseOut={handleMouseOut}
          ></input>
          {/* <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={handleSearchName}
          >
            Submit
          </button> */}
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword3" className="form-label">
            Trip Password:
          </label>
          <input
            name="existingPassword"
            value={existingPassword}
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
