import { ArrowBack } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturesHeading = ({ heading }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(176, 78, 109, 255)",
        p: 1,
      }}>
      <Toolbar style={{ padding: "0" }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack sx={{ color: "white" }} fontSize="medium" />
        </IconButton>
        <Typography variant="h5" fontWeight={"bolder"} marginLeft={3}>
          {heading}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default FeaturesHeading;
