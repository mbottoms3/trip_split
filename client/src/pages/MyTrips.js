import { QUERY_TRIPS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import TripCard from "../components/TripCard";

function MyTrips() {
  //const
  //const -- depending what we want the form to gather
  const { loading, data } = useQuery(QUERY_TRIPS);
  const trips = data?.trips || [];
  return (
    <div>{loading ? <div>Loading...</div> : <TripCard trips={trips} />}</div>
  );
}

export default MyTrips;
