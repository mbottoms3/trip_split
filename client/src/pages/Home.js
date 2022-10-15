import React from "react";
import "./Home.css";
import MyTrips from "../pages/MyTrips";
import Auth from "../utils/auth";

const Home = () => {
  return (
    <div className="homepage my-5">
      {Auth.loggedIn() ? (
        <div>
          <MyTrips />
        </div>
      ) : (
        <div>
          <h5 className="text-center"> Login to view your trips </h5>
        </div>
      )}
    </div>
  );
};

export default Home;
