import { QUERY_USER_TRIPS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TripCard from "../components/TripCard";
import Auth from "../utils/auth";

function MyTrips() {
  //returns decoded token --> {data: {email: ..., _id: ...}}
  const userTripData = Auth.getProfile();
  console.log(userTripData);
  //query --> {user: { _id: ..., email: ..., trips: [{...}] }}
  const { loading, data } = useQuery(QUERY_USER_TRIPS, {
    variables: { email: userTripData.data.email },
  });
  const user = data?.user.trips || [];
  console.log(data);
  return (
    <div>{loading ? <div>Loading...</div> : <TripCard userTrips={user} />}</div>
  );
}

export default MyTrips;
