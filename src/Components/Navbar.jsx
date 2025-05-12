import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
// import { stringToColor } from "../utils/exports/Function";
import { getInitials } from "../utils/exports/Function";

const Navbar = ({ userData }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      alert("no token found");
    }
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(176, 78, 109, 255)",
        py: 1.5,
      }}>
      <Toolbar>
        <Box
          flexGrow="1"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              p: 0.5,
              bgcolor: "white",
              fontSize: "20px",
              fontWeight: "bolder",
              color: "rgba(176, 78, 109, 255)",
              "&.MuiAvatar-root": {
                border: "none",
              },
            }}>
            {getInitials(userData.userName || "Anonymous")}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {userData.userName || "Anonymous"}
            </Typography>
            <Typography variant="h7">
              {userData.userPhoneNumber || "Anonymous"}
            </Typography>
          </Box>
        </Box>
        <Button
          sx={{
            bgcolor: "white",
            color: "rgba(176, 78, 109, 255)",
            fontWeight: "bolder",
          }}
          variant="contained"
          onClick={handleClick}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
