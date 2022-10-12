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
    const tempTrip = trips[Math.floor(Math.random() * trips.length)];
    tempTrip.users.push(newUser._id);
    await tempTrip.save();

    const tempUser = users[Math.floor(Math.random() * users.length)];
    newUser.trips = tempTrip._id;
    await newUser.save();
    console.log(tempUser);
  }
  console.log("all done!");
  process.exit(0);
});
