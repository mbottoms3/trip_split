import logo from "./logo.svg";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ExpenseForm from "./components/ExpenseForm";
import AddJoinForms from "./components/AddJoinForms";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      {/* <Header /> */}
      <Navbar />
      <ExpenseForm />
      <AddJoinForms />
      <Feed />
      <Footer />
    </div>
  );
}

export default App;
