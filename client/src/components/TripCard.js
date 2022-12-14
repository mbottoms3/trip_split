import { Link } from "react-router-dom";

function TripCard({ userTrips }) {
  return (
    <div className="m-3 d-flex">
      {" "}
      {userTrips &&
        userTrips.map((trip) => (
          <div key={trip._id} className="card mx-3">
            {/* <img class="card-img-top" src="img_avatar1.png" alt="Card image"> */}
            <div className="card-body">
              <h4 className="card-title">{trip.name}</h4>
              <Link
                className="btn btn-dark"
                to={"/onetrip"}
                state={{ tripId: trip._id }}
              >
                View Trip Summary
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TripCard;
