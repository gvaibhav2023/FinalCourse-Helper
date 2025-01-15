"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddCoursePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    course_Code: "",
    credits: "",
    description: "",
    image_Landing: "",
    image_Details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://final-course-helper-b41a.vercel.app/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Course added successfully!");
        // Optionally redirect to the landing page
        window.location.href = "/landing";
      } else {
        const errorData = await response.json();
        alert(`Failed to add course: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px",color:"black" }}>
        Add New Course
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
          gap: "20px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <TextField
          label="Course Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Course Code"
          name="course_Code"
          value={formData.course_Code}
          onChange={handleChange}
          required
        />
        <TextField
          label="Credits"
          name="credits"
          value={formData.credits}
          onChange={handleChange}
          required
          type="number"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          multiline
          rows={4}
        />
        <TextField
          label="Image Landing URL"
          name="image_Landing"
          value={formData.image_Landing}
          onChange={handleChange}
          required
        />
        <TextField
          label="Image Details URL"
          name="image_Details"
          value={formData.image_Details}
          onChange={handleChange}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddCoursePage;
