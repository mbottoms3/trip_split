import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import "./NavBar.css";

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  // console.log(Auth.loggedIn);
  return (
    <div id="navbar" className="w-100">
      <h1 className="p-3 text-center">Welcome to Trip $plit</h1>
      <nav className="navbar navbar-expand-lg  navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          expand="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse p-3" id="navbarNavDropdown">
          <ul className="navbar-nav d-flex justify-content-between w-100">
            <div className="d-flex">
              {Auth.loggedIn() ? (
                <Link className="btn btn-dark m-2" to={"/mytrips"}>
                  My Trips
                </Link>
              ) : (
                <>
                  {/* <h5 className="text-primary m-2 px-4">
                    Please login or create an account
                  </h5> */}
                </>
              )}
              <li className="nav-item">
                <Link className="btn btn-dark m-2" to={"/addjointrip"}>
                  Add/Join Trip
                </Link>
              </li>
            </div>
            <div className="d-flex">
              {Auth.loggedIn() ? (
                <li className="nav-item">
                  <a className="nav-link btn btn-info" onClick={logout}>
                    Logout
                  </a>
                </li>
              ) : (
                <>
                  <Link className="nav-link btn btn-light" to={"/login"}>
                    Login
                  </Link>

                  <Link
                    className="nav-link btn btn-light px-2 mx-2"
                    to={"/signup"}
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {/* <li className="nav-item">
                
            </li>
            <li className="nav-item">
              
            </li> */}
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
