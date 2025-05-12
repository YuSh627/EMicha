import { Box, Chip, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Balance from "../Components/Balance";
import FeaturesHeading from "../Components/FeaturesHeading";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const TransactionHistory = () => {
  const [userData, setUserData] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateGroups, setDateGroups] = useState({});
  const [tabLabels, setTabLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `https://springjava-production-e579.up.railway.app/api/transactions/${id} `,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              duration: "",
              startDate: "",
              endDate: "",
            },
          }
        );

        const processedTransactions = response.data.map((transaction) => {
          const date = new Date(transaction.timestamp);

          // Format date as "May 9, 2025"
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          // Format time as "05:58 AM"
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return {
            ...transaction,
            formattedDate,
            formattedTime,
            dateObj: date,
          };
        });

        organizeByDate(processedTransactions);
      } catch (error) {
        alert("Error in the server");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchuserData = async () => {
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

    fetchuserData();
  }, []);

  // Organize transactions by date
  const organizeByDate = (transactions) => {
    // Create date for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Group transactions
    const groups = {
      Today: [],
      Yesterday: [],
      Older: [],
    };

    transactions.forEach((transaction) => {
      const transDate = new Date(transaction.dateObj);
      transDate.setHours(0, 0, 0, 0);

      if (transDate.getTime() === today.getTime()) {
        groups["Today"].push(transaction);
      } else if (transDate.getTime() === yesterday.getTime()) {
        groups["Yesterday"].push(transaction);
      } else {
        groups["Older"].push(transaction);
      }
    });

    // Only show tabs with transactions
    const availableTabs = Object.keys(groups).filter(
      (key) => groups[key].length > 0
    );

    setDateGroups(groups);
    setTabLabels(availableTabs);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Get transactions for current tab
  const getCurrentTransactions = () => {
    if (tabLabels.length === 0) return [];
    const transactions = dateGroups[tabLabels[selectedTab]] || [];

    // Sort transactions by dateObj in descending order (most recent first)
    return transactions.sort((a, b) => b.dateObj - a.dateObj);
  };
  return (
    <Box
      sx={{
        bgcolor: "black",
        minHeight: "100vh",
        color: "#fff",
      }}>
      <FeaturesHeading heading={"Trasaction History"} />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}>
        <Balance userData={userData} />

        {/* Date tabs */}
        {tabLabels.length > 0 && (
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              width: "90%",
              "& .MuiTab-root": {
                color: "#aaa",
                "&.Mui-selected": {
                  color: "white",
                  fontWeight: "bold",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "rgba(176, 78, 109, 255)",
              },
            }}>
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        )}

        {/* Transaction list */}
        {getCurrentTransactions().map((th) => (
          <Box
            key={th.id}
            sx={{
              borderRadius: 5,
              bgcolor: "rgba(66, 66, 66, 1)",
              width: "80%",
              px: 4,
              py: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "center",
              }}>
              <Typography
                sx={{ display: "inline-flex", alignItems: "center" }}
                fontWeight={"bolder"}>
                {th.receiverName}
              </Typography>
              <Typography
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                }}>
                Number: {th.phoneNumber}
              </Typography>
              <Typography
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                }}>
                Amount: {""}
                <Typography
                  component="span"
                  sx={{
                    color: th.transactionRole === "Sent" ? "red" : "lightgreen",
                    display: "inline-flex",
                    alignItems: "center",
                  }}>
                  {th.transactionRole === "Sent" ? (
                    <ArrowDropDown />
                  ) : (
                    <ArrowDropUp />
                  )}
                  {th.amount}
                </Typography>
              </Typography>
              <Typography sx={{ display: "inline-flex", alignItems: "center" }}>
                Time: {th.formattedTime}
              </Typography>
              <Typography sx={{ display: "inline-flex", alignItems: "center" }}>
                Date: {th.formattedDate}
              </Typography>
            </Box>

            <Chip
              label={th.status}
              variant="contained"
              sx={{
                fontWeight: "bold",
                bgcolor: th.status === "SUCCESS" ? "lightgreen" : "red",
              }}
            />
          </Box>
        ))}

        {/* No transactions message */}
        {getCurrentTransactions().length === 0 && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No transactions found
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TransactionHistory;
