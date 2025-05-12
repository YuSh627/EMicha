import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography,
  Paper,
  Container,
  TextField,
  Box,
  Select,
  Button,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    number: "",
    password: "",
    mpin: "",
    role: "USER",
  });

  const [showpassword, setShowpassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://springjava-production-e579.up.railway.app/register",
        formData
      );
      if (response.status === 200) {
        alert("Registeration successfull");
      } else {
        alert("Registration failed");
      }
      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        number: "",
        password: "",
        mpin: "",
        role: "USER",
      });
    } catch (error) {
      alert("An error has occured");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper elevation={3} sx={{ py: 2, px: 3, maxWidth: "30rem" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ my: 2, fontWeight: "bold" }}>
          {" "}
          Register
        </Typography>
        <Box component="form" onSubmit={submitChanges}>
          <TextField
            fullWidth
            label="User Name"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            sx={{ my: 1 }}
          />

          <TextField
            fullWidth
            label="First name"
            type="text"
            name="firstname"
            required
            value={formData.firstname}
            onChange={handleChange}
            sx={{ my: 1 }}
          />

          <TextField
            fullWidth
            label="Last Name"
            type="text"
            required
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            sx={{ my: 1 }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="number"
            type="text"
            required
            value={formData.number}
            onChange={handleChange}
            sx={{ my: 1 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showpassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            sx={{ my: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowpassword(!showpassword)}>
                    {showpassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="M-Pin"
            type="text"
            name="mpin"
            required
            fullWidth
            sx={{ my: 1 }}
            value={formData.mpin}
            onChange={handleChange}
          />
          <Select
            fullWidth
            name="role"
            value={formData.role}
            onChange={handleChange}
            sx={{ my: 1 }}>
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </Select>
          <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ alignSelf: "center" }}>
              Submit
            </Button>
          </Box>
        </Box>

        <Typography align="center" sx={{ my: 1 }}>
          Already have an Account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
