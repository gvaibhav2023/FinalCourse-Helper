"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure correct import
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

const SignupPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Ensure username and password meet basic criteria
    if (username.length < 3 || password.length < 6) {
      setErrorMessage("Username must be at least 3 characters, and password at least 6.");
      return;
    }
  
    try {
      const response = await fetch("https://final-course-helper-b41a.vercel.app//api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const contentType = response.headers.get("Content-Type");
      let data;
  
      // Parse JSON or plain text based on response type
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }
  
      if (response.ok) {
        setSuccessMessage(data.message || "Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login"); // Redirect to login page
        }, 2000);
      } else {
        setErrorMessage(data.message || "Failed to create an account.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
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
          Sign Up
        </Typography>

        {errorMessage && (
          <Typography
            sx={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {errorMessage}
          </Typography>
        )}

        {successMessage && (
          <Typography
            sx={{ color: "green", textAlign: "center", marginBottom: "10px" }}
          >
            {successMessage}
          </Typography>
        )}

        <form onSubmit={handleSignup}>
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
            Sign Up
          </Button>
        </form>

        <Box sx={{ textAlign: "center", marginTop: "10px" }}>
          <Typography sx={{ color: "black" }}>
            Already have an account?{" "}
            <Link href="/login" sx={{ color: "#000", fontWeight: "bold" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
