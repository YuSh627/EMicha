import { Box, Grid, IconButton, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import HistoryIcon from "@mui/icons-material/History";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const [anchoropen, setAnchoropen] = useState(null);
  const [generateQR, setGenerateQR] = useState(null);
  const navigate = useNavigate();
  const addMoney = async (e) => {
    setAnchoropen(e.currentTarget);
    try {
      const number = localStorage.getItem("number");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://springjava-production-e579.up.railway.app/api/qr/generate/ ${number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );
      console.log(response.data);

      const generatedQrimage = `data:image/png;base64,${btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`;
      setGenerateQR(generatedQrimage);
    } catch (e) {
      console.error("Error fetching QR code:", e);
    }
  };

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
        justifyContent: "center",
        gap: 2,
      }}>
      <Grid sx={{ width: "40rem" }} container spacing={4}>
        <Grid item size={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <IconButton onClick={addMoney} size="large">
              <AddCardIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
            <Typography>Add Money</Typography>
            <Popover
              anchorEl={anchoropen}
              open={Boolean(anchoropen)}
              anchorOrigin={{
                horizontal: "right",
                vertical: "center,",
              }}
              transformOrigin={{
                horizontal: "right",
                vertical: "center",
              }}
              onClose={() => setAnchoropen(null)}
              PaperProps={{
                sx: {
                  p: 4,
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                },
              }}
              BackdropProps={{
                invisible: false,
                sx: { bgcolor: "rgba(0, 0, 0, 0.5)" },
              }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}>
                <Typography variant="h3" fontWeight="bolder" color="white">
                  Qr code
                </Typography>
                <img
                  src={generateQR}
                  alt="QRImage"
                  height="300rem"
                  width="300rem"
                />
              </Box>
            </Popover>
          </Box>
        </Grid>
        <Grid item size={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <IconButton size="large">
              <HistoryIcon
                fontSize="large"
                onClick={() => navigate("/transactionHistory")}
                sx={{ color: "white" }}
              />
            </IconButton>
            <Typography>Transaction</Typography>
          </Box>
        </Grid>
        <Grid item size={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <IconButton size="large" onClick={() => navigate("/sendMoney")}>
              <SendAndArchiveIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
            <Typography>Send Money</Typography>
          </Box>
        </Grid>
        <Grid item size={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <IconButton size="large">
              <SendAndArchiveIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
            <Typography>Electric Bill</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
