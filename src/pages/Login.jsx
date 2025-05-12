import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: "",
    password: "",
  });
  const [showpassword, setShowpassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password) localStorage.setItem("number", formData.number);

    try {
      const response = await axios.post(
        "https://springjava-production-e579.up.railway.app/login",
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        alert("Login successfull");
      } else {
        alert("Login failed");
      }
      setFormData({ number: "", password: "" });
      navigate("/");
    } catch (error) {
      alert("error occured");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper elevation={3} sx={{ px: 3, py: 2 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ my: 2, fontWeight: "bold" }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            required
            sx={{ my: 1 }}
            type="text"
            name="number"
            label="Phone number"
            onChange={handleChange}
            value={formData.number}
          />
          <TextField
            fullWidth
            required
            sx={{ my: 1 }}
            type={showpassword ? "text" : "password"}
            name="password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowpassword(!showpassword)}>
                    {showpassword ? <Visibility /> : <VisibilityOff />}{" "}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", my: 1, justifyContent: "center" }}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </Box>

        <Typography align="center" sx={{ my: 1 }}>
          Don't have an Account?{" "}
          <Link to="/register" style={{ textDecoration: "none" }}>
            {" "}
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
