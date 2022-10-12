import React from "react";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg  navbar-light bg-light">
      <a class="navbar-brand" href="#">
        The places we shall go!
      </a>
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
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              My Trips
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Add/Join Trip
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Login
            </a>
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
