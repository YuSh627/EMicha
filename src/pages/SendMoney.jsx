import { Box, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import FeaturesHeading from "../Components/FeaturesHeading";

const SendMoney = () => {
  const [formData, setFormData] = useState({
    receiverNumber: "",
    amount: "",
    mpin: "",
  });

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const number = localStorage.getItem("number");

      const response = await axios.post(
        "https://springjava-production-e579.up.railway.app/api/wallet/transfer",
        {},
        {
          params: { ...formData, senderNumber: number },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAlertMessage("Transfer sucessful");
        setAlert(true);
      }
      setFormData({ receiverNumber: "", amount: "", mpin: "" });
    } catch (error) {
      setAlertMessage(
        error.response?.data?.message || "Transfer failed. Please try again."
      );
      setAlert(true);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "black",
        minHeight: "100vh",
        color: "#fff",
      }}>
      <FeaturesHeading heading={"Send Money"} />{" "}
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 80px)",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          sx={{
            p: 3,
            width: "450px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: "white",
          }}
          component="form"
          onSubmit={handleSend}>
          <TextField
            fullWidth
            label="Phone Number"
            onChange={handleChange}
            name="receiverNumber"
            type="text"
            value={formData.receiverNumber}
            required
          />
          <TextField
            fullWidth
            label="Amount"
            onChange={handleChange}
            name="amount"
            type="number"
            value={formData.amount}
            required
          />
          <TextField
            fullWidth
            label="MPin"
            onChange={handleChange}
            type="text"
            name="mpin"
            value={formData.mpin}
            required
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ bgcolor: "rgba(176, 78, 109, 255)", fontWeight: "bolder" }}>
            Send
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={alert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={1000}
        onClose={() => setAlert(false)}
        message={alertMessage}
      />
    </Box>
  );
};

export default SendMoney;
