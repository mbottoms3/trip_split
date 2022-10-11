function AddJoinForms() {
  return (
    <div className="d-flex">
      <div className="w-50 m-3">
        <h3>Add a New Trip</h3>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Trip Name:
          </label>
          <input
            className="form-control m-10"
            type="text"
            placeholder="Nick's Bachelor Party"
          ></input>
        </div>
        <div className="mb-3">
          <label for="inputPassword3" class="form-label">
            Create a Trip Password:
          </label>
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            placeholder="Password"
          ></input>
        </div>
        <div className="mb-3">
          <label for="inputPassword3" class="form-label">
            Confirm Trip Password:
          </label>
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            placeholder="Password"
          ></input>
        </div>
      </div>
      <div className="w-50 m-3">
        <h3>Join an Existing Trip</h3>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Trip Name:
          </label>
          <input
            className="form-control m-10"
            type="text"
            placeholder="Breckenridge Camping Trip"
          ></input>
        </div>
        <div className="mb-3">
          <label for="inputPassword3" class="form-label">
            Trip Password:
          </label>
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            placeholder="Password"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default AddJoinForms;
