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

  // const Tobj = tripData.totalPaid[0];
  // Tobj.assign(Tobj, userData[0].firstName);
  // console.log(Tobj);
  let tempTripGlobal;

  for (newUser of users) {
    let tempTrip = trips[Math.floor(Math.random() * trips.length)];
    tempTrip.users.push(newUser._id);
    await tempTrip.save();

    const tempUser = users[Math.floor(Math.random() * users.length)];
    newUser.trips = tempTrip._id;
    await newUser.save();
    // console.log(tempTrip);

    // totalObj.forEach((object) => console.log(object));
    // console.log(
    //   totalObj.map((object) => {
    //     return { ...object, user: newUser._id };
    //   })
    // );
    // console.log(tempUser._id);

    const totalObj = tempTrip.totalPaid;
    const amount0 = totalObj;
    const item0 = Object.assign(amount0[0], { user: newUser._id });
    await tempTrip.save();

    console.log(item0);
    tempTripGlobal = tempTrip;
  }

  // const totalObj = tempTripGlobal.totalPaid;
  // const amount0 = totalObj[0];
  // const item0 = Object.assign(amount0, { user: newUser._id });
  // await tempTripGlobal.save();
  // console.log(item0);

  console.log("all done!");
  process.exit(0);
});
