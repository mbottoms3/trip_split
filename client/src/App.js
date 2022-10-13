import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import logo from "./logo.svg";
import "./App.css";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MyTrips from "./pages/MyTrips";
import OneTrip from "./pages/OneTrip";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FinalTripSplit from "./pages/FinalTripSplit";
import AddJoinTrip from "./pages/AddJoinTrip";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = newApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          {/* <Header /> */}
          <Navbar />
          <Routes>
            <Route path="/mytrips" element={<MyTrips />} />
            <Route path="/onetrip" element={<OneTrip />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/finaltripsplit" element={<FinalTripSplit />} />
            <Route path="/addjointrip" element={<AddJoinTrip />} />
          </Routes>

          {/* <Footer /> */}
        </div>
      </Router>
      //{" "}
      <div className="container">
        // {/* <Header /> */}
        {/* // <Navbar />
        // <ExpenseForm />
        // <AddJoinForms />
        // <Feed />
        // <Footer />
        //{" "} */}
      </div>
    </ApolloProvider>
  );
}

export default App;

// My trips, one trip, login, sign up, final trip split, add/join page
