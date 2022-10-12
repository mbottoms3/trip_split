import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg  navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link className="nav-link" to={"/mytrips"}>
              My Trips
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to={"/addjointrip"}>
              Add/Join Trip
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to={"/login"}>
              Login
            </Link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
