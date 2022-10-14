const db = require("../config/connection");
const { User, Trip } = require("../models");

const userData = require("./userData.json");
const tripData = require("./tripData.json");

db.once("open", async () => {
  // clean database
  await Trip.deleteMany({});
  await User.deleteMany({});

  // bulk create each model
  const trips = await Trip.insertMany(tripData);
  const users = await User.insertMany(userData);

  for (newUser of users) {
    //adding users to trip
    let tempTrip = trips[Math.floor(Math.random() * trips.length)];
    tempTrip.users.push(newUser._id);
    await tempTrip.save();

    //adding trip to users
    const tempUser = users[Math.floor(Math.random() * users.length)];
    newUser.trips = tempTrip._id;
    await newUser.save();

    //assigning user Id to total paid objects --> will be in user order
    for (i = 0; i < tempTrip.totalPaid.length; i++) {
      tempTrip.totalPaid[i].user = users[i]._id;
      tempTrip.totalPaid[i].email = users[i].email;
    }

    //assigning user Id to expenses paid objects --> will be in user order
    for (i = 0; i < tempTrip.expensesPaid.length; i++) {
      tempTrip.expensesPaid[i].user = users[i]._id;
      tempTrip.expensesPaid[i].email = users[i].email;
      // console.log(users[i].email);
    }
  }

  console.log("all done!");
  process.exit(0);
});
