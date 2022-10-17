import FinalSplit from "../components/FinalSplit";
import { useLocation } from "react-router-dom";

function FinalTripSplit() {
  const location = useLocation();
  const { expenses, users } = location.state;

  console.log(location.state);

  console.log(expenses, users);
  return (
    <div>
      {/* pass in the array of users in the trip into this function */}
      <FinalSplit expenses={expenses} users={users} />
    </div>
  );
}

export default FinalTripSplit;
