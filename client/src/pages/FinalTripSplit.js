import FinalSplit from "../components/FinalSplit";
import { useLocation } from "react-router-dom";

function FinalTripSplit() {
  const location = useLocation();
  const { totalArray } = location.state;
  console.log(totalArray);
  return (
    <div>
      {/* pass in the array of users in the trip into this function */}
      <FinalSplit totalArray={totalArray} />
    </div>
  );
}

export default FinalTripSplit;
