const jwt = require("jsonwebtoken");

//to access the JWT secret - .env file (made the same as activities)
require("dotenv").config();

const secret = process.env.SECRET;

// ?? When do we want the token to expire? - maybe 2h?

//const expiration = "";

// ?? What do we want for payload? - no sensitive data :) -- email, name, _id??

// module.exports = {
//   signToken: function ({}) {
//     const payload = {};
//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };
