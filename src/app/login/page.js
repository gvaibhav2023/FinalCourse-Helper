"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure correct import
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://finalcourse-helper.onrender.com//api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Try to parse JSON error message
        let errorData = { message: "Invalid login credentials." };
        try {
          errorData = await response.json();
        } catch (err) {
          console.error("Failed to parse error response as JSON:", err);
        }
        setErrorMessage(errorData.message);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Save JWT in localStorage
      router.push("/"); // Navigate to dashboard
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: 3,
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "black", textAlign: "center", marginBottom: "20px" }}
        >
          Login
        </Typography>

        {errorMessage && (
          <Typography
            sx={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "15px" }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "black" }} />}
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#333" },
              marginBottom: "15px",
            }}
          >
            Login
          </Button>
        </form>

        <Box sx={{ textAlign: "center", marginTop: "10px" }}>
          <Typography sx={{ color: "black" }}>
            Don't have an account?{" "}
            <Link href="/signup" sx={{ color: "#000", fontWeight: "bold" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
