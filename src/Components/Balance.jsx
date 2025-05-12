import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

const Balance = ({ userData }) => {
  const [showBalance, setShowBalance] = useState("");

  return (
    <Box
      sx={{
        borderRadius: 5,
        bgcolor: "rgba(66, 66, 66, 1)",
        width: "80%",
        px: 2,
        py: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}>
      <Typography
        sx={{
          display: "inline",
        }}>
        {showBalance ? `NPR ${userData.walletBalance}` : "NPR XXXX.XX"}
      </Typography>
      <IconButton
        sx={{ color: "white" }}
        onClick={() => {
          setShowBalance(!showBalance);
        }}>
        {showBalance ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Box>
  );
};

export default Balance;
