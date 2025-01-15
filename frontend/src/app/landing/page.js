"use client";

import { Box, Typography, Button, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login"; // Importing a login icon
import { useEffect, useState } from "react";

const CourseLandingPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://final-course-helper-b41a.vercel.app//api/courses"); // Replace with your backend URL
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "white",
        overflow: "hidden", // Prevents scrolling outside the content
        margin: 0, // Remove any margin
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "blue",
          color: "white",
          padding: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        <Typography variant="h7">Course Helper</Typography>
        <Link href="/login" passHref>
          <IconButton
            sx={{
              color: "white",
            }}
          >
            <LoginIcon />
          </IconButton>
        </Link>
      </Box>

      {/* Add Course Button */}
      <Box sx={{ textAlign: "center", margin: "20px" }}>
        <Link href="/course/new" passHref>
          <Button variant="contained" color="primary">
            Add Course
          </Button>
        </Link>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive layout
          gap: "30px",
          width: "80%",
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
          overflowY: "auto", // Allow scrolling only within the main content area
          flex: "1", // Ensures the content area takes the remaining space
        }}
      >
        {/* Dynamic Course Cards */}
        {courses.map((course) => (
          <Link href={`/course/${course.id}`} key={course.id} passHref>
            <Card
              sx={{
                cursor: "pointer",
                borderRadius: "8px",
                boxShadow: 3,
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={course.image_landing || "https://via.placeholder.com/300"}
                alt={course.name}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {course.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default CourseLandingPage;
