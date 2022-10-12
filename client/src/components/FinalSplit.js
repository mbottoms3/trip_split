//This component will have a list of final transactions for users once the finalsplit button is clicked
function FinalSplit() {
  return (
    // need to run the algorithm
    // with output from algorithm, map over and render list items based on output
    <div className="w-50 mx-auto">
      <h3 className="p-2 m-2">Final Trip $plit:</h3>
      <div className="d-flex flex-column align-items-center">
        <ul className="list-group m-3 d-flex justify-content-center">
          <li className="list-group-item fs-3">
            Someone owes someone <span className="text-success">$100</span>.
          </li>
        </ul>
        <ul className="list-group m-3">
          <li className="list-group-item fs-3">
            Someone owes someone <span className="text-success">$300</span>.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FinalSplit;
