import logo from "./logo.svg";
import "./App.css";
import Header from "./components1/Header";
import Footer from "./components1/Footer";
import Navigation from "./components1/Navigation";
import ExpenseForm from "./components1/ExpenseForm";
import AddJoinForms from "./components1/AddJoinForms";

function App() {
  return (
    <div className="container">
      {/* <Hea?der /> */}
      <AddJoinForms />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
