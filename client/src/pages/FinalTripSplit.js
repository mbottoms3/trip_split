import FinalSplit from "../components/FinalSplit";
import { useLocation } from "react-router-dom";

function FinalTripSplit() {
  const location = useLocation();
  const { expenses, users, tripId } = location.state;
  
  return (
    <div>
      {/* pass in the array of users in the trip into this function */}
      <FinalSplit expenses={expenses} users={users} tripId={tripId} />
    </div>
  );
}

export default FinalTripSplit;
