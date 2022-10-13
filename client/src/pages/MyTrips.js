function MyTrips() {
  //const
  //const -- depending what we want the form to gather

  return (
    <div class="card" style="width:400px">
      {/* <img class="card-img-top" src="img_avatar1.png" alt="Card image"> */}
      <div class="card-body">
        <h4 class="card-title">Trip to Turks and Caicos</h4>
        <p class="card-text">
          Summary: Steve Vee paid $xxx amount. Mike Lew owes Rudy Jewels $xxx.
          Rudy Jewels owes Steve Vee $xxx
        </p>
        <a href="#" class="btn btn-primary">
          See Other Trips
        </a>
      </div>
    </div>
  );
}

export default MyTrips;
