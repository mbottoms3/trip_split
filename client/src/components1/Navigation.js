function Navigation() {
  return (
    <div>
      <div className="mb-3 d-flex">
        <label htmlFor="cost" className="form-label">
          Cost:
        </label>
        <input
          className="form-control m-10"
          type="text"
          placeholder="150.00"
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Rental Car"
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Purchaser's Username:
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        ></input>
      </div>
    </div>
  );
}

export default Navigation;
