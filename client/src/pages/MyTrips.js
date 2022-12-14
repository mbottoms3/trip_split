import { QUERY_USER_TRIPS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TripCard from "../components/TripCard";
import Auth from "../utils/auth";

function MyTrips() {
  //returns decoded token --> {data: {email: ..., _id: ...}}
  const userTripData = Auth.getProfile();

  //query --> {user: { _id: ..., email: ..., trips: [{...}] }}
  const { loading, data } = useQuery(QUERY_USER_TRIPS, {
    variables: { email: userTripData.data.email },
  });
  const user = data?.user.trips || [];

  return (
    <div>
      <h3 className="mx-3 my-4">My Trips:</h3>
      {loading ? (
        <div className="m-3">Loading...</div>
      ) : (
        <TripCard userTrips={user} />
      )}
    </div>
  );
}

export default MyTrips;
