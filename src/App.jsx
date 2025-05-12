import React from "react";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TransactionHistory from "./pages/TransactionHistory";
import SendMoney from "./pages/SendMoney";
import ElectricBill from "./pages/ElectricBill";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactionHistory" element={<TransactionHistory />} />
        <Route path="/sendMoney" element={<SendMoney />} />
        <Route path="/elecrricBill" element={<ElectricBill />} />
      </Routes>
    </Router>
  );
};

export default App;
