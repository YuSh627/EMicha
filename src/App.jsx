import React from "react";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TransactionHistory from "./pages/TransactionHistory";
import SendMoney from "./pages/SendMoney";
import ElectricBill from "./pages/ElectricBill";
import ProtectedRoute from "./Components/ProtectedRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transactionHistory" element={<TransactionHistory />} />
        <Route path="/sendMoney" element={<SendMoney />} />
        <Route path="/electricBill" element={<ElectricBill />} />
      </Routes>
    </Router>
  );
};

export default App;
