import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Box, CircularProgress } from "@mui/material";
import Features from "../Components/Features";
import Balance from "../Components/Balance";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const number = localStorage.getItem("number");
        const response = await axios.get(
          "https://springjava-production-e579.up.railway.app/api/wallet/userWallet",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              number: number,
            },
          }
        );
        localStorage.setItem("id", response.data.userId);
        setUserData(response.data);
      } catch (error) {
        alert("errrorrrr");
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "black",
        minHeight: "100vh",
        color: "#fff",
      }}>
      {userData ? (
        <Box>
          <Navbar userData={userData} />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            }}>
            <Balance userData={userData} />
            <Features />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100dvh",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
